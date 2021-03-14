import * as mongoose from 'mongoose';

export const Role = mongoose.model(
    "FasterXRole",
    new mongoose.Schema({
      name: {type:String,required:true}
    })
  );
 