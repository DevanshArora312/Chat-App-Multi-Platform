import React from 'react'
import { IoCheckmarkDoneOutline,IoCheckmark  } from "react-icons/io5";
import { getTime } from '../utils/store';

function Messages({props}) {
    const style1 = props.reqUserId !== props.sentBy ? "bg-[#171a21]": "bg-blue-500" ;
    const style2 = props.reqUserId !== props.sentBy ? "justify-start": "justify-end" ;
    var timeStr = "";
    if(props && props.sentOn){
        timeStr = getTime(props.sentOn);
    }
  return (
    <div className={`w-full h-auto flex my-2 ${style2}`}>
        <div className={`${style1} p-4 flex flex-col text-white rounded-2xl max-w-[70%]`}>
            <div>
                {props.content}
            </div>
            <div className='text-[10px] flex gap-x-1  items-center'>
                {(props.read !== null) ? (props.read ? <IoCheckmarkDoneOutline size={15} className='text-white/60' /> : <IoCheckmark size={15} className='text-white/60' />) : null }
                <p className='text-white/60'>{timeStr}</p>
            </div>
        </div>
    </div>
  )
}

export default Messages