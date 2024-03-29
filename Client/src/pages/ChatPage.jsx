import React, { useState } from "react";
import HomeSideBar from "../components/HomeSideBar";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import { connectSocket,socket } from "../utils/socket";
import { useEffect } from "react";
import { url } from "../utils/store";
import { useSelector,useDispatch } from 'react-redux';
import {setUnread, updateLastMsg} from '../redux/slices/list'
import {loadChat,pushChat} from '../redux/slices/chat'
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
    const navigate = useNavigate();
    const token = useSelector(state => {return state.auth.token});
    const prop = {
        chatState :true,
        addState :false,
        settingState :false, 
    }
    const dispatch = useDispatch()
    const activeChat = useSelector(state => {return state.active.active});
    const [reqId,setReq] = useState(null);
    

    useEffect(()=>{
        fetch(`${url}api/user/isLoggedIn`,{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify({token})})
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.success){
                setReq(data.reqUserId);
                window.onload = connectSocket(data.reqUserId);
                if(socket){
                    socket.on("new_message",async socketData => {
                        dispatch(updateLastMsg(socketData.lastMess));
                        const chatId = socketData.id;
                        if ( activeChat === null || activeChat !== chatId){
                            dispatch(setUnread({id : socketData.id,value : true}));
                        }else{
                            dispatch(setUnread({id : chatId,value : false}));
                            dispatch(pushChat(socketData.newChat));
                        }   
                    });
                }
            }
            else{
                alert("Login Auth failiure!");
                navigate("/login");
            }
        })
        .catch(err=>{
            console.log("Error occ :",err.message);
            // alert("yeh wala",err.message)
        })
        return() =>{
            socket.off("new_message")
        }
    },[activeChat])
            
    return ( 
        <div className="flex w-screen h-screen">
            <div className="side text-white min-w-[70px] bg-[rgb(41,48,59)] h-full p-3 flex flex-col">
                <HomeSideBar props={prop}/>
            </div>
            <div id="chats" className="bg-[#171a21] h-full p-5 min-w-[290px]">
                <ChatList/>
            </div>
            <div id="chatArea" className="text-black w-full h-full">
                {activeChat ? <ChatWindow/> : <div className='bg-[rgb(41,48,59)] h-full w-full'/>}
            </div>
        </div>
        );
}
 
export default ChatPage;