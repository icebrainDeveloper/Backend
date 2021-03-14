import {db} from "../../models/fasterX";
const Role = db.role;


   export function initRoles () {

    Role.collection.estimatedDocumentCount((err,count)=>{
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }

          console.log("added 'admin' to roles collection");
        });
      }
    })
    }