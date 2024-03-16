const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/database"); 
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
      credentials: false
    }
});
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {userModel} = require("./models/users");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const addMessage = require("./controllers/chatSocketController");

app.use(express.json());
app.use(cors());
app.use(fileUpload());
 
app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);



dbConnect();

io.on("connection",async socket => {
    const userId = socket.handshake.query['user_id'];
    const socketId = socket.id;
    const u = await userModel.findById(userId);
    console.log(`Socket on with id : ${socketId} with user id : ${userId} and name : ${u?.name}`);
    if (Boolean(userId)){
        await userModel.findByIdAndUpdate(userId, {status : "online",socket_id : socketId});
    }
    if (socketId){
        socket.on("message_sent",async data=>{
            const socket_id_user_2 = await userModel.findById(data.user2);
            await addMessage(data);
            io.to(socket_id_user_2.socket_id).emit("new_message",{newChat : data.newChat, id : data.chatId,lastMess : data.newLastMess});
            io.to(socket_id_user_2.socket_id).emit("new_message_add",{newChat : data.newChat, id : data.chatId,lastMess : data.newLastMess});
        });
        
        socket.on("end", async userId => {
            if (Boolean(userId)){
                await userModel.findByIdAndUpdate(userId, {status : "offline",socket_id : ""});
                // io.to(Id2).emit("status_update",)
            }   
    
            console.log("Closing connection!",u?.name,"and",socket?.id);
            socket.disconnect(0);
        });
    }
    
});

app.get("/",(req,res) => {
    res.send("works");
})
server.listen(process.env.PORT, () => {
    console.log("Server started at port",process.env.PORT);
})