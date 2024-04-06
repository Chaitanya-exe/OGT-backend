import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res) =>{
    try{
        const temp = await Conversation.findOne({room:{$eq:`${req.body.empUsername}_${req.body.devUsername}`}});
        if(temp){
            return res.status(400).json({error: "conversation already exists"});
        }
        else{
            const newConv = new Conversation({
                room: `${req.body.empUsername}_${req.body.devUsername}`,
                devId: req.body.devUsername,
                empId: req.body.empUsername
            });

            await newConv.save();
            return res.status(201).send("conversation created!!!");
        }  
    }
    catch(err){
        return res.status(501).json({error: err});
    }
}

export const getConversation = async (req, res)=>{
    try{
        const oneConv = await Conversation.findOne({room:{$eq: req.params.id}});
        if(oneConv){
            return res.status(200).send(oneConv);
        }
        else{
            return res.status(404).json({error: "conversaion does not exists"});
        }
    }
    catch(err){
        return res.status(500).json({error: err});
    }
}

export const deleteConversation = async (req, res)=>{
    try{
        await Conversation.findOneAndDelete({id:{$eq: req.params.id}});
        res.status(200).send("Conversation deleted");
    }
    catch(err){
        return res.status(500).json({error: err});
    }
}   