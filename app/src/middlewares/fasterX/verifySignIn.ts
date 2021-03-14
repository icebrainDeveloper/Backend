import * as jwt from "jsonwebtoken";
import {authToken} from "../../config/auth.config";
import {db} from "../../models/fasterX";
import {decryptToken} from '../../lib/fasterX/account.lib';
import parseBearerToken from 'parse-bearer-token'
const User = db.user;
const Role = db.role;

function verifyToken (req, res, next)  {

  const token = parseBearerToken(req)

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }else{
  jwt.verify(decryptToken(token), authToken.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    req.email = decoded.email;
    next();
  });
  }
};

function isAdmin  (req, res, next)  {
  User.findOne({email:req.email},(err,user)=>{
    if (err) {
        res.status(500).json({ message: err });
        return;
    }

    let roles=user["roles"];

    Role.find(
        {
          _id: { $in: roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).json({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
              let role=roles[i];
            if (role["name"] === "admin") {
              next();
              return;
            }
          }
  
          res.status(403).json({ message: "Require Admin Role!" });
          return;
        }
      );

  });
   

   
  
};

function isUser (req, res, next)  {
  User.findOne({email: req.email},(err,user)=>{
    if (err) {
        res.status(500).json({ message: err });
        return;
      }
       let roles=user["roles"];
       Role.find(
        {
          _id: { $in: roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).json({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
              let role=roles[i];
            if (role["name"] === "user") {
              next();
              return;
            }
          }
  
          res.status(403).json({ message: "Require User Role!" });
          return;
        }
      );
  });
};

export const authJwt = {
  verifyToken,
  isAdmin,
  isUser
}