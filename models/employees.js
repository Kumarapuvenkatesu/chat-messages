const mogoose = require('mongoose');
const bcrypt = require('bcryptjs');
const employeesRegistrationSchema = new mogoose.Schema({
    name:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true
    },
     isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
    // role:{
    //     type:String,
    //     default:"admin"
    // }
});
module.exports = mogoose.model("employees", employeesRegistrationSchema);