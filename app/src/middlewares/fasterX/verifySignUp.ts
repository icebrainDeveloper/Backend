import {db} from "../../models/fasterX";
const ROLES = db.ROLES;
const User = db.user;

function checkDuplicateEmail (req, res, next) {

    // Email
    User.findOne({
      email: req.body.email
    },(err,user)=>{
        if (err) {
            res.status(500).json({ message: err });
            return;
          }
          if (user) {
            res.status(400).json({ message: "Failed! Email is already in use!" });
            return;
          }
          next();
    });
 
}

function checkRolesExisted  (req, res, next)  {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).json({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

export const verifySignUp = {
  checkDuplicateEmail,
  checkRolesExisted
};
