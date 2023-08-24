import Messages from "../models/messages.model.js";

export const createMessage = async(req, res)=>{
    try{
        const newMessage = new Messages({
            conversationId: req.params.id,
            sentBy: req.useranme,
            messsage: req.body.message
        })
        await newMessage.save();
        return res.status(201).send("Message Created.");
    }
    catch(err){
        return res.status(500).json({error: err});
    }
}

export const getMessages = async (req, res)=>{
    try{
        const get = await Messages.find({conversationId: {$eq: req.params.id}});
        return res.status(200).send(get)
    }
    catch(err){
        return res.status(500).json({error:err});
    }
}