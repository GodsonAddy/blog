const mongoose = require('mongoose');


const { Schema, model } = mongoose;

const UsersSchema = new Schema({
  
    first_name:{
      type: String,
      required: true
    },   
    last_name:{
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true,
      unique: true
    }
  },{timestamps: true}
);



UsersSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    first_name: this.first_name,
    last_name: this.last_name,

  };
};


const Users = model("user", UsersSchema);
module.exports =  Users;