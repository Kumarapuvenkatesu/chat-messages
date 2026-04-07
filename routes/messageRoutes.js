const messagecontroller=require("../controllers/messagesControler");
const express=require('express');
const router=express.Router();

router.post('/add-message',messagecontroller.addMessage);
router.post('/get-messages',messagecontroller.getAllMessages);
module.exports=router;