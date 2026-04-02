const messagecontroller=require("../controllers/messagesControler");
const express=require('express');
const router=express.Router();

router.post('/add-message',messagecontroller.addMessage);
router.get('/get-messages',messagecontroller.getAllMessages);
module.exports=router;