import { io } from "socket.io-client";
import { url } from "./store";

let socket;

const connectSocket = (user_id) =>{
    socket= io(url, {
        query : {user_id},
    });
    
};

export {socket,connectSocket};