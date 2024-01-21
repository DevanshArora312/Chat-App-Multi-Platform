import React from 'react'
import pfp from "/pfp.png"
import "../utils/globalCss.css"
import { IoCheckmarkDoneOutline,IoCheckmark  } from "react-icons/io5";
import { getTime } from '../utils/store';

function SingleChatBox({props,activeChat}) {
    const image = !props.image ? pfp : props.image;
    var timeStr = "";
    if(props && props.time){
        timeStr = getTime(props.time);
    }
  return (
    <div className={`flex w-full gap-x-3 justify-center items-center rounded-lg px-2 py-3 ${(props.id === activeChat) ? "bg-blue-600" : "bg-gray-500/20"} `}>
        <img className='w-[45px] h-[45px] rounded-full' src={image} />
        <div className='w-full flex-col flex'>
            <div className='w-full flex justify-between items-center'>
                <p className='text-white text-[20px] font-semibold'>
                    {props.name ? props.name : "Username"}
                </p>
                <p className='text-[15px]' title={timeStr.length > 13 ? timeStr : null}>
                    {timeStr.length > 13 ? timeStr.slice(0,7)+"..." : timeStr}
                </p>
            </div>
            <div className='flex w-full justify-between items-center'>
                <div className='flex gap-x-1'>
                    <p className='flex justify-center items-center'>
                        {(props.tick !== null && props.tick !== undefined) ? (props.tick ? <IoCheckmarkDoneOutline className='text-white/60' /> : <IoCheckmark  className='text-white/60' />) : null }
                    </p>
                    <p>
                        {props.messName ? props.messName+" : " : null }
                    </p>
                    <p>
                        {props.lastMess}
                    </p>
                </div>
                {props.unread && <div className=' bg-green-600 w-[10px] h-[10px] text-black rounded-full '/>}
            </div>
        </div>
    </div>
  )
}

export default SingleChatBox