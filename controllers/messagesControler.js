const messagesdetails=require ("../models/messagesModels");

exports.addMessage=async(req,res)=>{
    try {
        const {message,to,from}=req.body;
        const data=await messagesdetails.create({
            message:{text:message,employees:[to,from]},
            sender:from,
        });
        if(data) return res.json({msg:"Message added successfully"});
        return res.json({msg:"Failed to add message to the database"});
        
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

exports.getAllMessages=async(req,res)=>{
    try {
        const {from,to}=req.body;
        const messages=await messagesdetails.find({
            message:{
                employees:{
                    $all:[from,to],
                },
            },
        }).sort({updatedAt:1});
        // res.json({messages});
        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        res.json(projectedMessages);
        
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}