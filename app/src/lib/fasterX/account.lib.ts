import {db} from "../../models/fasterX";
var bcrypt = require("bcryptjs");
import {authToken} from "../../config/auth.config";
var jwt = require("jsonwebtoken");

const ROLES = db.ROLES;
const User = db.user;


        function checkEmail(email){
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(String(email));
        }
        
    
        function checkNames(name){
           const regex=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
           return regex.test(String(name));
        }
    
        function checkPassword(password){
            const regex=/^(?=.*[!@#$%^&*-])(?=.*[0-9])(?=.*[A-Z])(?=.*?[a-z]).{8,40}$/;
            return regex.test(String(password));
        }
    
        function checkAge(birthdate){
            let response;
                var now = new Date().getTime();
                var birth=new Date(birthdate).getTime();
                var Difference_In_Time = now - birth;
                var Difference_In_Days=Difference_In_Time/ (1000 * 3600 * 24);
    
                if(Difference_In_Days/365 > 13){
                    response=true;
                }
                else{
                   response=false;
                }
         return response;
        }
    
        function isValid(user){
            var error_array=[];
            if(  checkEmail(user["email"])
                && checkNames(user["lastName"])
                && checkNames(user["firstName"])
                && checkAge(user["birthDate"])
                && checkPassword(user["password"])
            ){
                return true;
            }else{
                if(!checkEmail(user["email"])){
                error_array.push("email not valid");
                }
                if(!checkNames(user["lastName"])){
                    error_array.push("lastName not valid");
                }
                if(!checkNames(user["firstName"])){
                    error_array.push("firstName not valid");
                }
                if(!checkAge(user["birthDate"])){
                    error_array.push("birthDate not valid");
                }
                if(!checkPassword(user["password"])){
                    error_array.push("password not valid");
                }
                console.log(error_array)
                return error_array;
            }
        }

  
      export  async function hashPassword(password){

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;    
    }
    

    function strRandom(o) {
        var a = 10,
            b = 'abcdefghijklmnopqrstuvwxyz',
            c = '',
            d = 0,
            e = ''+b;
        if (o) {
          if (o.startsWithLowerCase) {
            c = b[Math.floor(Math.random() * b.length)];
            d = 1;
          }
          if (o.length) {
            a = o.length;
          }
          if (o.includeUpperCase) {
            e += b.toUpperCase();
          }
          if (o.includeNumbers) {
            e += '1234567890';
          }
        }
        for (; d < a; d++) {
          c += e[Math.floor(Math.random() * e.length)];
        }
        return c;
      }

    function secret() {
      let random=  Math.floor(Math.random() * Math.floor(9));
      let letters =[];

      for (let i=0;i<8;i++){
       let str_r= strRandom({
            includeUpperCase: true,
            includeNumbers: true,
            length: 5,
            startsWithLowerCase: true
          });
          letters.push(str_r);
      }

      return letters[random];
    }

    export function generateToken(user){

        let payload={
            email: user.email,
            name: user.lastName+user.firstName,
            birthDate: user.birthDate
          }
        var token = jwt.sign(payload, authToken.secret, {
            expiresIn: authToken.expires
          });
          return token+secret();
    }

    export function decryptToken(token){
      return token.slice(0,token.length-5)
    }

     