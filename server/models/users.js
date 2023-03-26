const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    ID:{
        type:String,
        // required:true,
    },
    type:{
        type:String,
        // required:true,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
        required:true,       
    }
  });

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;