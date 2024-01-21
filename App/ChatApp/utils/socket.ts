import { io } from "socket.io-client";

let socket : any;

const connectSocket = (user_id : any) =>{
    socket= io("http://localhost:3002", {
        query : {user_id},
    });
    
};

export {socket,connectSocket};