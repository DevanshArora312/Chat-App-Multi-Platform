import { io } from "socket.io-client";

let socket : any;

const connectSocket = (user_id : any) =>{
    socket= io("ws://192.168.29.165:3002", {
        query : {user_id},
    });
    
};

export {socket,connectSocket};