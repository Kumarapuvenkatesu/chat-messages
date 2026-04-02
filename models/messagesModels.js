const mongoose=require('mongoose');
const { ref } = require('node:process');
const messageSchema=new mongoose.Schema({
    message:{
text:{
    type:String,required:true
},
employees:Array,
sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"employees",
    required:true,
}

    }
},{timestamps:true});
module.exports=mongoose.model("messages",messageSchema);