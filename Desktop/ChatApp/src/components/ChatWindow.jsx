import React,{useState,useEffect} from 'react'
import {url} from "../utils/store";
import pfp from "/pfp.png";
import { IoSend,IoLinkOutline,IoCloseOutline,IoSearchOutline,IoCallOutline,IoVideocamOutline } from "react-icons/io5";
import { BsEmojiLaughing } from "react-icons/bs";
import Messages from './Messages';
import "../utils/globalCss.css";
import { socket } from '../utils/socket';
import { useSelector,useDispatch } from 'react-redux';
import {setUnread, updateLastMsg} from '../redux/slices/list'
import {loadChat,pushChat} from '../redux/slices/chat'
import {setActive} from '../redux/slices/active'

function ChatWindow() {
    const dispatch = useDispatch();
    const activeChat = useSelector(state => {return state.active.active});
    const [isLoading,setLoading] = useState(true);
    const data = useSelector(state => {return state.chat.chat});
    const [input,setInput] = useState("");
    const token = useSelector(state => {return state.auth.token});
    
    // useEffect(()=>{
    //     window.onbeforeunload = dispatch(setActive(null));
    // },[])
    const changeHandler = (e) => {
        setInput(e.target.value);
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        if(input.trim() == "") return;
        const ob = {
            token,
            content : input,
            type:"text",
            sentOn:Date.now(),
            id : activeChat
        }
        try{
            const newChat = {
                content : ob.content,
                type : ob.type,
                sentOn : ob.sentOn,
                sentBy : data.reqUserId,
                read : false
            }
            const userTemp = data.reqUserId !== data.user2 ? data.user2 : data.user1;
            dispatch(pushChat(newChat));
            dispatch(updateLastMsg({read : false,type : "text",message :  newChat.content,id : activeChat,messName : "You",sentOn :newChat.sentOn}));
            const socketData = {
                newChat,
                user2 : userTemp,
                chatId : activeChat,
                newLastMess : {
                    read : false,
                    type : "text",
                    message : newChat.content,
                    id : activeChat,
                    messName : data.lastMessName,
                    sentOn : newChat.sentOn
                }
            };
            socket.emit("message_sent" , socketData);
            setInput("");
        } catch (err){
            alert("error aagya vancho!!!!")
        }
    }
   
    useEffect(()=>{
        fetch(`${url}api/chat/get-chat/${activeChat}`,{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify({token})})
        .then(res => {
            return res.json();
        })
        .then(dataGot => {
            dispatch(loadChat(null));
            if(dataGot.chats.messages && dataGot.chats.messages.length !== 0) dataGot.chats.messages = dataGot.chats.messages.reverse();
            dispatch(loadChat(dataGot.chats));
            dispatch(setUnread({id:activeChat,value : false}))
            setLoading(false);
        })
        .catch(err=>{
            window.alert("Error occ :",err.message);
            console.error(err);
            setLoading(true)
        })  
    },[activeChat]);
  return (
    <div className='bg-[rgb(41,48,59)] h-full w-full flex flex-col'>
        <div id="chatHeader" className='flex w-full px-6 items-center justify-between bg-transparent/10 py-3 shadow-black/20 shadow h-[70px]'>
            <div className='flex items-center gap-x-2'>
                <div className='relative -z-1 '>
                    <div className={`rounded-full h-[10px] w-[10px] absolute bottom-[0.5px] right-[0.5px] ${data?.status==="online" ? "bg-green-600" : 'bg-red-600' }`}/>
                    <img className='w-[35px] h-[35px] rounded-full ' src={data?.dp ? data.dp : pfp} />
                </div>
                <div className='flex flex-col justify-center '>
                    <p className='font-semibold text-white text-[25px]'>
                        {!isLoading && data.name}
                    </p>
                    <p className='text-white text-[15px]'>
                        {!isLoading && data.status}
                    </p>
                </div>    
            </div>
            <div className='text-white/60 gap-x-7 flex items-center text-[25px]'> 
                <IoCallOutline/>
                <IoVideocamOutline/>
                <IoSearchOutline/>
                <button onClick={()=>{
                    dispatch(setActive(null));
                    dispatch(loadChat({}));
                }}>
                    <IoCloseOutline/>
                </button>
            </div>
        </div>
        <div id='chatWindow' className='flex flex-col-reverse py-3 px-6 bg-transparent overflow-y-auto h-[calc(100%-140px)] '>
            {
                !isLoading && data.messages.map((item,index)=>{
                    const prop = {
                        content : item.content,
                        type : item.type,
                        sentOn : item.sentOn,
                        reqUserId : data.reqUserId,
                        sentBy : item.sentBy,
                        read : item.read,
                    };

                    return(
                        <Messages props = {prop} key={index} />
                    );
                })
            }
        </div>
        <form className='flex w-full px-6 items-center justify-center gap-x-4 bg-transparent/10 shadow-black/20 shadow h-[70px]' onSubmit={submitHandler}>
            <div className='p-2 w-[40px] bg-white/5 flex items-center justify-center text-white h-[40px] rounded-sm'>
                <BsEmojiLaughing/>
            </div>
            <input className='bg-white/10 h-[40px] w-[40px] focus:outline-none rounded-lg text-white/50 px-3 py-1' placeholder='Enter a message..' value={input} onChange={changeHandler} />
            <div className='p-2 bg-white/5 flex items-center justify-center text-white h-[40px] w-[40px] rounded-sm'>
                <IoLinkOutline/>
            </div>
            <button type='submit' className='p-2 bg-blue-500 flex items-center justify-center text-white h-[40px] w-[40px] rounded-sm focus:outline-none' >
                <IoSend/>
            </button>
        </form>
    </div>
  )
}

export default ChatWindow