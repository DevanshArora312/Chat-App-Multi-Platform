import {React, useEffect, useState,useRef} from 'react';
import background from '../assets/background.png';
import {Form, Link ,useNavigate} from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import ButtonLoader from '../components/buttonLoader';
import NavBar from '../sections/NavBar';
import ButtonError from '../components/buttonError';
import { url } from '../utils/store';
import { setToken } from '../redux/slices/auth';
import { useDispatch,useSelector } from 'react-redux';
import axios from "axios";

const SignupPage = () => {
    const token = useSelector(state => {return state.auth.token});
    const [formData, setFormData] = useState({name:"",email:"", password:"",dp:""});
    const [isClicked,setisClicked] = useState(false);
    const [emptyError,setEmptyError] = useState(true);
    const [err,setErr] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        if (formData['email'] == '' || formData['password'] == '' || formData['name'] == '') {
            setEmptyError(true);
        } 
        else {
            setEmptyError(false);
        }
        setisClicked(true);
        const fd = new FormData();
        fd.append('dp',formData.dp);
        fd.append('name',formData.name);
        fd.append('email',formData.email);
        fd.append('password',formData.password);
        axios.post(`${url}api/user/signup`,fd)
        .then(data => {
            const resData = data.data;
            if(resData.success){
                window.localStorage.setItem("token",resData.token);
                dispatch(setToken(resData.token));
                navigate("/home");
            } else{
                setErr(resData.message);
                setTimeout(()=>{
                    setErr(null);
                    alert(resData.message);
                    setisClicked(false);
                },2500);
            }
        })
        .catch(error => {
            const err = error.response.data;
            // window.alert(err.message);
            setisClicked(false);
        })
    }
    const changeHandler = (event)=>{
        setFormData((prev)=>{
            return {
                ...prev,
                [event.target.name] : event.target.value
            }
        })
    }
    useEffect(()=>{
        fetch(`${url}api/user/isLoggedin`,{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify({token})})
        .then(res => {
            return res.json();
        })
        .then(resData => {
            if(resData.success && resData.message === "user is logged in!"){
                navigate("/home")
            }
        })
        .catch(err=>{
            alert(err.message);
        })
    },[])
    return ( 
        <div className='relative w-screen h-screen'>
            <div
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    filter: 'brightness(0.2)',
                }}
                className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center"
            >
            </div>
            
            <div className='absolute flex justify-center items-center inset-0'>
                <div className='w-[25%] min-w-[500px] aspect-[9/10] bg-white/10 rounded-md flex flex-col items-center justify-center gap-4 max-sm:min-w-[250px] max-md:p-5'>
                    <p className='text-white text-center text-[1.25rem]'>WELCOME </p>
                    <form onSubmit={submitHandler} className='flex flex-col items-center justify-center gap-4 p-5'>
                        <div className='w-full'>
                            <input className='rounded-md w-full h-10 bg-white focus:outline-none text-black px-2 ' name="name" id="name" type='text' placeholder='Username' onChange={changeHandler}></input>
                        </div>
                        <div className='w-full'>
                            <input className='rounded-md w-full h-10 bg-white focus:outline-none text-black px-2 ' name="email" id="email" type='email' placeholder='Email' onChange={changeHandler}></input>
                        </div>
                        <div className='w-full'>
                            <input className='rounded-md w-full h-10 bg-white focus:outline-none text-black px-2' name="password" id="password" type='password' placeholder='Password' onChange={changeHandler}></input>
                        </div>
                        <div className='w-full'>
                            <input type='file' ref={fileRef} className='rounded-md w-full h-10 bg-white focus:outline-none text-black px-2' name="dp" id="dp" onChange={()=>{
                                setFormData(prev =>{
                                    return{
                                        ...prev,
                                        dp : fileRef.current.files[0]
                                    }
                                })
                            }}/>
                        </div>
                        <div className='w-full'>
                        {(isClicked && emptyError) ? <ButtonError text = {"CREATE ACCOUNT"}/> : <button className='default w-full focus:outline-none' disabled={isClicked}>
                                {!isClicked && `CREATE ACCOUNT`}
                                {isClicked && <ButtonLoader/>}
                            </button>}
                        </div>
                        {
                            err && 
                            <div id="errDiv" className='text-red-500 text-[20px] flex items-center justify-center w-full capitalise'>
                                {err}
                            </div>
                        }
                        <div className='w-full flex justify-between items-center'>
                            <div className='w-[45%] h-[2px] bg-black'></div>
                            <div>OR</div>
                            <div className='w-[45%] h-[2px] bg-black'></div>
                        </div>
                        <div className='w-full'>
                            <button className='default w-full flex items-center justify-center gap-8 max-sm:text-xs' id='Google_Button'>
                                    <FcGoogle style={{fontSize:'2rem'}} /> SIGN UP WITH GOOGLE
                            </button>
                        </div>
                        <div className='w-full flex justify-center items-center gap-2 max-sm:text-xs'>
                            <div>ALREADY HAVE AN ACCOUNT?</div>
                            <Link to='/login' className='text-[#646cff] text-bold hover:opacity-75'>Login Here</Link>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
