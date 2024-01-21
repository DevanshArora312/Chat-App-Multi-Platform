import React from "react";
import HomeSideBar from "../components/HomeSideBar";
import image from "/icon.png"

const Home = () => {
    const prop = {
        chatState :false,
        addState :false,
        settingState :false, 
    }
    return ( 
        <div className="flex w-screen h-screen">
            <div className="side text-white min-w-[70px] bg-[rgb(41,48,59)] h-full p-3 flex flex-col">
                <HomeSideBar props={prop}/>
            </div>
            <div id="chats" className="text-white bg-[#171a21] h-full p-5 flex flex-col min-w-[100px]">
                
            </div>
            <div id="chatArea" className="text-black bg-[rgb(41,48,59)] h-full w-full flex-col flex items-center justify-center gap-y-2">
                <img src={image} className="bg-transparent w-[100px] h-[100px]"  />
                <h1 className="text-white/60 text-[30px]">
                    ChatApp for Web
                </h1>
                <p className="text-white/60">
                    Send and recieve messages without keeping your phone online.
                </p>
                <p className="text-white/60">
                    Use ChatApp on mobile, web and desktop at once!
                </p>
            </div>
        </div>
        );
}
 
export default Home;