import { View, Text, TouchableOpacity,StyleSheet, useColorScheme } from 'react-native'
import React,{useCallback, useContext, useEffect, useState} from 'react'
import { FlatList } from 'react-native'
import EmptyChat from './EmptyChat'
import SingleChatBox from './SingleChatBox'
import {navContext} from "../../utils/store"
import { HomeSubStyles } from '../../utils/Styles'
import {token,url} from "../../utils/store"
import { useDispatch,useSelector } from '../redux/store'
import { setActive } from '../redux/slices/active'
import { setChatList, setUnread, updateLastMsg } from '../redux/slices/list'
import { pushChat } from '../redux/slices/chat'
import { socket,connectSocket } from '../../utils/socket'


const HomeSubPages = ({contains} : {contains : String}) => {
    const activeChat = useSelector((state : any) => {return state.active.active});
    // const token = useSelector((state : any)=> {return state.auth.token})
    const [req,setReq] = useState(null);
    
    const dispatch = useDispatch();
    const isDarkMode = useColorScheme() === "dark";
    const navigation = useContext(navContext);
    const [isLoading,setLoading] = useState(true);
    const data : any = useSelector((state : any) => {return state.list.list});
    const styles = HomeSubStyles(isDarkMode);
    useEffect(()=>{
        console.log("bruh");
        fetch(`${url}api/chat/get-chats`,{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify({token})})
        .then(res => {
            return res.json();
        })
        .then(data => {
            // console.log(data);
            data.chats = data?.chats?.sort(function(a : any,b : any){
                return Date.parse(b.sentOn) - Date.parse(a.sentOn);
            })
            var result = data.chats;
            if(contains !== ""){
                // console.log("Cont:",contains);
                result = data.chats.filter((obj : any)=>{
                    return obj.user.name.toLowerCase().includes(contains.toLowerCase());
                })
            }
            // console.log("res:",result)
            dispatch(setChatList(result));
            setLoading(false);
        })
        .catch(err=>{
            console.log("Error occ here :",err.message);
            // console.error(err);
            setLoading(true)
        })
    },[])
    useEffect(()=>{
        var filtered_chats = data;
        if(contains !== ""){
            // console.log("Cont:",contains);
            filtered_chats = data.chats.filter((obj : any)=>{
                return obj.user.name.toLowerCase().includes(contains.toLowerCase());
            })
        }
        // console.log(result)
        dispatch(setChatList(filtered_chats));
        setLoading(false);
    },[contains]);
    
    // useEffect(()=>{
    //     if(socket){
    //         socket.on("new_message",async (socketData : any) => {
    //             console.log("page socket")
    //             dispatch(updateLastMsg(socketData.lastMess));
    //             if (!activeChat || (activeChat.toString() !== socketData.id.toString())){
    //                 dispatch(setUnread({id : socketData.id,value : true}));
    //             }else{
    //                 console.log("internal case 2" , (activeChat.toString() !== socketData.id.toString()))
    //                 dispatch(setUnread({id : socketData.id,value : false}));
    //                 dispatch(pushChat(socketData.newChat));
    //             }   
    //         });
    //     }    
    // },[socket])
  
    useEffect(()=>{
        fetch(`${url}api/user/isLoggedIn`,{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify({token})})
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.success){
                setReq(data.reqUserId);
                connectSocket(data.reqUserId);
                if(socket){
                    socket.on("new_message",async (socketData : any) => {
                        console.log("page socket")
                        dispatch(updateLastMsg(socketData.lastMess));
                        dispatch(setUnread({id : socketData.id,value : true}));
                    });
                }
            }
            else{
                // navigation.navigate("Login");
            }
        })
        .catch(err=>{
            console.log("Error occ :",err.message); 
        })
        return () => {
            socket.off("new_message")
        }
    },[activeChat])
      
  return (
    <View style={styles.container}>
        {isLoading && <EmptyChat/>}
        {
          !isLoading && 
          <FlatList
            data={data}
            renderItem={({item}) => {
                const dataItem = {
                    image : item.user.dp,
                    name : item.user.name,
                    tick : item.read ? item.read : null,
                    lastMess : item.lastMess ? (item.lastMess) : "",
                    time : item.sentOn,
                    messName : item.messName
                }
                return(
                    <TouchableOpacity onPress={()=>{
                        dispatch(setActive(item._id))
                        navigation.navigate("SingleChat");
                        // console.log(item);
                    }}>
                        <SingleChatBox props = {dataItem} />
                    </TouchableOpacity>
                );
            }}
            keyExtractor={item => item._id}
          />
        }
    </View>
  )
}

export default HomeSubPages;