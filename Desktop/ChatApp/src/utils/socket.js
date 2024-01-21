import { io } from "socket.io-client";

let socket;

const connectSocket = (user_id) =>{
    socket= io("http://localhost:3002", {
        query : {user_id},
    });
    
};

export {socket,connectSocket};