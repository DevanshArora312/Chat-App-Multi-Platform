import React, { useEffect, useState } from 'react'
import pfp from "/pfp.png"
import { url } from '../utils/store';
import { useSelector,useDispatch } from 'react-redux';
import {addChat} from '../redux/slices/list'

function AddChat({setAdd}) {
    const dispatch = useDispatch();
    const [user,setUser] = useState(null);
    const [text,setText] = useState(null);
    const [result,setResult] = useState(null);
    const [invalid,setInvalid] = useState(null);
    const token = useSelector(state => {return state.auth.token});

    const handleGet = ()=>{
        fetch(`${url}api/user/get-user`,{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify({token,user2 : text})})
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (!data.user){
                setInvalid(data);
            }
            setUser(data.user);
        })
        .catch(err=>{
            console.log("Error occ :",err.message);
            console.error(err);
        })
    }
    const handleAdd = () => {
        fetch(`${url}api/chat/add-chat`,{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify({token,user2 : text})})
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            // setResult(data);
            dispatch(addChat(data.chat))
        })
        .catch(err=>{
            console.log("Error occ :",err.message);
            console.error(err);
        })
    }
  return (
    <>
        <div className='absolute flex justify-center items-center w-screen h-screen top-0 left-0 bg-black/40 z-1'>
            <div className='w-[50%] flex flex-col h-auto z-2 rounded-lg bg-[rgb(41,48,59)] justify-between p-4 gap-y-5 border-4 border-solid'>
                <div className='flex h-[10%] text-white justify-between px-2'>
                    <div/>
                    <h1>
                        Add a new Chat!
                    </h1>
                    <button className='text-white' onClick={()=>{setAdd(false)}}>
                        Close
                    </button>
                </div>
                <div className='flex flex-col gap-y-7 h-auto w-full items-center'>
                    <input className='w-[50%] px-3 py-1 bg-white/20 text-white/60 rounded-lg focus:outline-none' placeholder='Search email...' onChange={(e)=>setText(e.target.value)} required={true} />
                    <button className='bg-blue-500 p-2 rounded-lg focus:outline-none hover:pointer active:scale-90 easeInOut duration-200' onClick={handleGet}>
                        Find User!
                    </button>
                </div>
                {
                    user ? 
                    <div className='flex-col flex items-center justify-between gap-y-10'>
                        <div className='flex items-center'>
                            <img src={user.dp ? user.dp : pfp } alt="dp" className='h-[20px] w-[20px] rounded-full'/>
                            <p className='text-white text-[25px]' >{user.name}</p>
                        </div>
                        <button className='bg-blue-500 p-2 rounded-lg focus:outline-none hover:pointer active:scale-90 easeInOut duration-200' onClick={handleAdd}>
                            Add Chat!
                        </button>
                        {result && <div className={`text-[25px] ${result.success ? 'text-green-500' : 'text-red-600'}`}>{result.message}</div>}
                    </div>
                    : invalid ? <div className='text-[25px] flex text-red-600 w-full justify-center'>{invalid.message}</div> : <div/>
                }
            </div>
        </div>
    </>
  )
}

export default AddChat