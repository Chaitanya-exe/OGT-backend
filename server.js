import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import userRouter from "./routers/users.router.js";
import projectsRouter from "./routers/projects.router.js";
import reviewsRouter from "./routers/reviews.router.js";
import conversationRouter from "./routers/conversation.route.js";
import messagesRouter from "./routers/messages.route.js";

dotenv.config();
mongoose.set("strictQuery", true);
const app = express();
const server = http.createServer(app);
const io = new Server(server)
const dbConnect = async () =>{
    try{
        await mongoose.connect(process.env.URI);
        console.log("Connected to the database.");
    }
    catch(err){
        console.log(`There was an error ${err}`);
    }
}

await dbConnect();

app.use((req, res, next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api/users", userRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/messages", messagesRouter);

io.on("connection",(socket)=>{
    console.log(socket.id);
})

app.listen(5000,()=>{
    console.log("Server listening on port:5000");
});

export default io;