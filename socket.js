import conversationModel from "./models/conversation.model.js"
import messagesModel from "./models/messages.model.js"
export default function handleSocket(io){
    io.on('connection', (socket) =>{
        socket.on('join-room', async (id)=>{
            try{
                const temp = await conversationModel.findOne({room:`${id.emp}_${id.dev}`})
                if(!temp){
                    const newConv = new conversationModel({
                        room:`${id.emp}_${id.dev}`,
                        devId:`${id.dev}`,
                        empId:`${id.emp}`
                    })
                    console.log("new room created")
                    newConv.save()
                }
                socket.join(`${id.emp}_${id.dev}`)
                console.log(`${socket.id} joined the room`)
            }
            catch(err){
                console.log(err)
            }
        })

        socket.on('message', async (data)=>{
            try{
                const conv = await conversationModel.findOne({room:`${data.id.emp}_${data.id.dev}`})
                
                if(conv){
                    const newMessage = new messagesModel({
                        conversationId: conv.room,
                        sentBy: data.by,
                        message: data.msg
                    })
                    await newMessage.save()
                    io.to(conv.room).emit('message',{msg: newMessage.message, by: newMessage.sentBy})
                }
            }
            catch(err){
                console.log(err)
            }
        })

        socket.on('disconnect', (id)=>{
            if(id){
                
                socket.leave(id);
                console.log(`${socket.id} left the room`)
            }

        })
    })
}