import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import {url} from "../utils/store"
import SingleChatBox from './SingleChatBox';
import { useSelector,useDispatch } from 'react-redux';
import {setChatList} from '../redux/slices/list'
import {setActive} from '../redux/slices/active'
import  "../utils/globalCss.css"
function ChatList() {
    const token = useSelector(state => {return state.auth.token});
    const activeChat = useSelector(state => {return state.active.active});
    const data = useSelector((state) => {return state.list.list});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading,setLoading] = useState(true);
    const [contains,setContains] = useState("");
    const handleChange = (e) =>{ 
        setContains(e.target.value)
    }

    useEffect(()=>{
        fetch(`${url}api/chat/get-chats`,{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify({token})})
        .then(res => {
            return res.json();
        })
        .then(data => {
            
            data.chats = data.chats.sort(function(a ,b){
                return Date.parse(b.sentOn) - Date.parse(a.sentOn);
            })
            
            var result = data.chats;
            if(contains.trim() !== ""){
                result = data.chats.filter((obj)=>{
                    return obj.user.name.toLowerCase().includes(contains.toLowerCase());
                })
            }
            // console.log(result)
            dispatch(setChatList(result));
            setLoading(false);
        })
        .catch(err=>{
            console.log("Error occ :",err.message);
            setLoading(true)
        })
    },[contains]);
    
    
  return (
    <div className='flex flex-col gap-y-5'>
        <h1 className='text-[30px]'>
            Chats
        </h1>
        <input className='rounded-full bg-white/20 text-white/70 w-full px-[10px] py-1 focus:outline-none' placeholder='Search..' onChange={handleChange} />
        <div className="h-[1px] w-[100%] bg-gray-100 opacity-50" />
        <p className='text-white/60'>
            All Chats
        </p>
        <div className='flex flex-col gap-y-7 overflow-y-auto scroll'>
            {
                isLoading ? "Loading" :
                data.map((item,index)=>{
                    const nameClipped = item.user.name.length < 15 ? item.user.name : item.user.name.slice(0,9) + "..."; 
                    const contentClipped = item.lastMess.length < 13 ? item.lastMess : item.lastMess.slice(0,10) + "..."; 
                    const dataItem = {
                        image : item.user.dp,
                        name : nameClipped,
                        tick : item.read,
                        lastMess : contentClipped,
                        time : item.sentOn,
                        messName : item.messName,
                        id : item._id,
                        unread : item.unread
                    }
                    return(
                        <button className='btnChat easeInOut duration-500 focus:outline-none ' key={index} onClick={()=>{dispatch(setActive(item._id)); console.log("clicked",item._id,"and", activeChat)}}>
                            <SingleChatBox props={dataItem} activeChat={activeChat}/>
                        </button>
                    );
                })
            }
        </div>
    </div>
  )
}

export default ChatList