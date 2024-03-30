import Conversation from './models/conversation.model'
const rooms = {};

export default function handleSocket(io){
    io.on('connection', (socket) =>{
        socket.on('join-room', (id)=>{
            conversation
        })

        socket.on('message', (id)=>{
            
        })
    })
}