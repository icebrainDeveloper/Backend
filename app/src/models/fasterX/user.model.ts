import * as mongoose from 'mongoose';

export const User = mongoose.model(
    "FasterXUser",
    new mongoose.Schema({
        lastName : { type:String ,required:true },
        firstName : { type:String, required:true },
        email : { type:String, required:true },
        birthDate : { type:String, required:true },
        password : { type:String , required:true },
        position : { type:String, required:true },
        creationDate : { type:Date, required:true },
        lastUpdate : { type:Date, required:true },
        roles : [
            { type: mongoose.Schema.Types.ObjectId, ref:"FasterXRole"}
        ]
    })
)

