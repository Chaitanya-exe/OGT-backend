import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res) =>{
    try{
        const temp = await Conversation.findOne({id:{$eq:`${req.body.devId}_${req.body.empId}`}});
        if(temp){
            return res.status(400).json({error: "conversation already exists"});
        }
        else{
            const newConv = new Conversation({
                id: `${req.body.devId}_${req.body.empId}`,
                devId: req.body.devId,
                empId: req.body.empId
            });
            await newConv.save();
            res.status(201).send("conversation created!!!");
        }  
    }
    catch(err){
        return res.status(501).json({error: err});
    }
}

export const getConversation = async (req, res)=>{
    try{
        const oneConv = await Conversation.findOne({id:{$eq: req.params.id}});
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