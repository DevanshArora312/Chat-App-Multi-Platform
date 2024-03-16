import { io } from "socket.io-client";
import { url } from "./store";

let socket : any;

const connectSocket = (user_id : any) =>{
    socket= io(url, {
        query : {user_id},
    });
    
};

export {socket,connectSocket};