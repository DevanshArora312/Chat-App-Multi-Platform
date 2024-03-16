import { Keyboard,View, Text, ImageSourcePropType, SafeAreaView, StyleSheet, Image, useColorScheme, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, FlatList } from 'react-native'
import React,{useState,useEffect, useContext, useCallback} from 'react'
import Icon from "react-native-vector-icons/AntDesign"
import {pfp,darkBg,lightBg} from "../../utils/images"
import Icon2 from "react-native-vector-icons/Entypo"
import Icon3 from "react-native-vector-icons/Ionicons"
import { SingleChatStyles } from '../../utils/Styles'
import MessageBox from '../components/MessageBox'
import {url,token} from "../../utils/store"
import { useDispatch,useSelector } from '../redux/store';
import { loadChat, pushChat } from '../redux/slices/chat'
import { setUnread, updateLastMsg } from '../redux/slices/list'
import { socket } from '../../utils/socket'
import { setActive } from '../redux/slices/active'
type messageType = {
    _id : String,
    content : String,
    read : String,
    sentBy : String,
    sentOn : String,
    type : String,
    img : ImageSourcePropType | undefined
}
type chatType = {
    _id : String,
    messName : String,
    reqUserId : String,
    user : {
        dp : ImageSourcePropType ,
        name : String
    },
    messages : messageType[]
}
// const SingleChat = ({chat,navigation} : {chat : chatType, navigation : any}) : JSX.Element => {

const SingleChat = ({navigation} : {navigation : any}) : JSX.Element => {
    const dispatch = useDispatch();
    // const token = useSelector((state :any) => {return state.auth.token})
    const [isLoading,setLoading] = useState(true);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const activeChat = useSelector((state : any) => {return state.active.active});
    const chat = useSelector((state : any)=> {return state.chat.chat});
    const [input,setInput] = useState("");


    useEffect(()=>{
        if(socket){
            // console.log("sock34",socket)
            socket.on("new_message",async (socketData : any) => {
                console.log("page socket")
                dispatch(updateLastMsg(socketData.lastMess));
                if (!activeChat || (activeChat.toString() !== socketData.id.toString())){
                    dispatch(setUnread({id : socketData.id,value : true}));
                }else{
                    console.log("internal case 2" , (activeChat.toString() !== socketData.id.toString()))
                    dispatch(setUnread({id : socketData.id,value : false}));
                    dispatch(pushChat(socketData.newChat));
                }   
            });
        } 
        return () => {
            if(socket){
                socket.off("new_message")
                // socket.emit("end")
            }
        }
    },[socket])
  
    useEffect(()=>{
        // console.log(token)
        fetch(`${url}api/chat/get-chat/${activeChat}`,{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify({token : token})})
        .then(res => {
            return res.json();
        })
        .then(dataGot => {
            // console.log("datagot",dataGot)
            if(dataGot.chats.messages && dataGot.chats.messages.length !== 0) dataGot.chats.messages = dataGot.chats.messages.reverse();
            console.log("boii")
            dispatch(loadChat(dataGot.chats));
            dispatch(setUnread({id:activeChat,value : false}))
            setLoading(false);
        })
        .catch(err=>{
            console.log("yeh",err);
            setLoading(true)
        })  
    },[activeChat]);
                
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setKeyboardVisible(true); // or some other action
        }
        );
        const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboardVisible(false); // or some other action
        }
        );

        return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
        };
    }, [isKeyboardVisible]);

    const submitHandler = (e : any)=>{
        e.preventDefault()
        if(input.trim() == "") return;
        const ob = {
            token,
            content : input,
            type:"text",
            sentOn:Date.now(),
            id : activeChat
        }
        const newChat = {
            content : ob.content,
            type : ob.type,
            sentOn : ob.sentOn,
            sentBy : chat.reqUserId,
            read : false
        }
        const userTemp = chat.reqUserId !== chat.user2 ? chat.user2 : chat.user1;
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
                messName : chat.lastMessName,
                sentOn : newChat.sentOn
            }
        };
        try{
            socket.emit("message_sent" , socketData);
            console.log("yaha agya")
        } catch(err : any){
            console.log("spcket err:",err.message)
        }
        console.log("hue", {read : false,type : "text",message :  newChat.content,id : activeChat,messName : "You",sentOn :newChat.sentOn})
        setInput("");
    }
   
    
    const isDarkMode = useColorScheme() === "dark";
    const bgImg : ImageSourcePropType = isDarkMode ? darkBg : lightBg;
    const styles = SingleChatStyles(isDarkMode,isKeyboardVisible);
    // console.log(input);
  return (
    <SafeAreaView>
        {chat && <ImageBackground source={bgImg} resizeMode="cover" style={styles.bg}>
            <View style={styles.headContainer} >
                <View style={styles.cont1}>
                    <TouchableOpacity onPress={() => {navigation.goBack();dispatch(setActive(null))}}>
                        <Icon name={"arrowleft"} color={"white"} size={27}/>
                    </TouchableOpacity>
                    <Image source={(chat && chat.user && chat.dp) ? chat.dp : pfp} style={styles.img}/>
                    <Text style={styles.headTxt}>
                        {chat.name}
                    </Text>
                </View>
                <TouchableOpacity>
                    <Icon2 name={"dots-three-vertical"} size={25} color={"white"} />
                </TouchableOpacity>
            </View>
            <View style={styles.chatArea}>
                {
                    <FlatList
                        data = {chat.messages}
                        inverted={true}
                        renderItem={({item}) => {
                            const prop = {
                                reqUserId : chat.reqUserId,
                                content : item.content,
                                type : item.type,
                                sentOn : item.sentOn,
                                sentBy : item.sentBy,
                                read : item.read,
                                img : item.img
                            }
                            return (
                                <MessageBox props={prop} key={item._id}/>
                            )
                        }}
                        keyExtractor={item => item._id}
                    />
                }
            </View>
            <View style={styles.inpCont}>
                <TextInput style={styles.inp} placeholder='Message' placeholderTextColor={isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.7)"} onChangeText={text => setInput(text)} value={input}/>
                <TouchableOpacity style={styles.sendBtn} onPress={submitHandler}>
                    <Icon3 name={"send"} color={"white"}  size={20}/>
                </TouchableOpacity>
            </View>
        </ImageBackground>}
    </SafeAreaView>
  )
}
export default SingleChat