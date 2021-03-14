import {authToken} from "../config/auth.config";
import {db} from "../models/fasterX";
import {hashPassword , generateToken} from '../lib/fasterX/account.lib'
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


function respond(code,err, result, res) { 
  if (err) return res.send({status : code, statusCode : "error", message: err });
  return res.send({status:200, statusCode:"success", message: "User was registered successfully!" });
}

async function save(user,res){
  user.save(async (err,result)=>{
    respond(500,err,result,res)
});
}

export async function signup (req, res,next) {
   let current = new Date().toISOString();
    let password= await hashPassword(req.body.password);
    const newUser = new User({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        birthDate:req.body.birthDate,
        email: req.body.email,
        position: req.body.position,
        creationDate: current,
        lastUpdate: current,
        password: password
    });
    
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
       async (err, roles) => {
          if (err) {
            return res.status(500).json({ message: err });
          }
          newUser["roles"] = roles.map(role => role._id);
          await save(newUser,res);
        }
      );
    } else {
      Role.findOne({ name: "user" }, async (err, role) => {
        if (err) {
         return res.status(500).json({ message: err });
        }
        newUser["roles"] = [role._id];
        await save(newUser,res);});
    }
};

export  function signin (req, res)  {
 User.findOne({
    email: req.body.email
  },async (err,user)=>{

    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).json({ message: "User Not found." });
    }else{
        
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user["password"]
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!"
      });
    }else{

     
      let token= generateToken(user);
        var authorities = [];
        let roles= user["roles"]
        for (let role in roles) {
          let roleName= await Role.findById({_id: roles[role]});
          console.log("role ",roleName["name"]);
          authorities.push("ROLE_" +roleName["name"].toUpperCase());
        }
        res.status(200).json({
          email: user["email"],
          roles: authorities,
          accessToken: 'Bearer '+token
        });
    }
    }
 
    });
};
