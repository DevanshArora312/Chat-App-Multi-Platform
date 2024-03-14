import { useState,useEffect } from "react";
import { IoPerson } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline,IoAddOutline,IoCallOutline,IoSettingsOutline,IoExitOutline } from "react-icons/io5";
import {useNavigate} from "react-router-dom"
import AddChat from "./AddChat";
import { socket } from "../utils/socket";
import {  url } from "../utils/store";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../redux/slices/active";
import { setToken } from "../redux/slices/auth";

const HomeSideBar = ({props}) => {
    const [chat,setChat] = useState(props.chatState);
    const [add,setAdd] = useState(props.addState);
    const [setting,setSetting] = useState(props.settingState);
    const styling = `bg-blue-500 `;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [reqId,setReq] = useState(null);
    const token = useSelector(state => {return state.auth.token});

    const logout = () => {
        window.localStorage.removeItem("token");
        dispatch(setActive(null))
        dispatch(setToken(null))
        navigate("/login");
    }
    return (  
        <div className="w-full h-full flex flex-col items-center justify-between pb-5">
            <div className="w-full h-auto flex flex-col gap-y-5 items-center">
                {add ? <AddChat setAdd={setAdd}/> : null}
                <button className="bg-blue-500 rounded-lg p-2 m-3" onClick={()=>{navigate('/');if(socket)socket.emit("end",reqId)}}>
                    <IoPerson className="text-white text-[20px]"/>
                </button>
                <div className="h-[1px] w-[100%] bg-gray-100 opacity-50" />
                <button className={`focus:outline-none m-3 rounded-lg p-2 ${chat? styling : "bg-transparent"}`} onClick={()=>{setAdd(false);setSetting(false);setChat(true);navigate("/chats")}}>  
                    <IoChatbubbleEllipsesOutline className="text-white text-[23px]"/>
                </button>
                <button className={`focus:outline-none m-3 rounded-lg p-2 ${add? styling : "bg-transparent"}`} onClick={()=>{setAdd(true)}}> 
                    <IoAddOutline className="text-white text-[27px]"/>
                    
                </button>
                <button className={`focus:outline-none m-3 rounded-lg p-2`} name="calls" onClick={null}> 
                    <IoCallOutline className="text-white text-[20px]"/>
                </button>
                <div className="h-[1px] w-[100%] bg-gray-100 opacity-50" />
                <button className={`focus:outline-none m-3 rounded-lg p-2 ${setting? styling : "bg-transparent"}`} onClick={()=>{setAdd(false);setSetting(true);setChat(false)}} > 
                    <IoSettingsOutline className="text-white text-[20px]"/>
                </button> 
            </div>
            <div className="flex items-center justify-center w-full h-auto">
                <button onClick={logout}>
                    <IoExitOutline className="text-white text-[20px]"/>
                </button>
            </div>
        </div> 
    );
}
 
export default HomeSideBar;