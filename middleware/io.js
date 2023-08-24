import app from "../server.js";
import { Socket } from "socket.io";

const io = new Socket(app);

io.on("connection",(socket)=>{
    socket.on("data",(res)=>{
        console.log(socket.id);
    })
});