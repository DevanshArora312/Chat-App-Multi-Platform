import { View, Text,StyleSheet, TextInput, TouchableOpacity, useColorScheme, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { navContext } from '../../utils/store'
import { AddChatStyles } from '../../utils/Styles'
import { url } from '../../utils/store'
import { useDispatch,useSelector } from "react-redux";
import { pfp } from '../../utils/images'
import Icon from "react-native-vector-icons/AntDesign"

const AddChat = () => {
    const [invalid,setInvalid] = useState<any>(null);
    const navigation = useContext(navContext);
    const token = useSelector((state : any) => state.auth.token)
    const [user2,setInpUser] = useState("");
    const [user,setUser] = useState<any>(null)
    const [success,setSuccess] = useState(false);
    const isDarkMode = useColorScheme() === "dark";
    const styles = AddChatStyles(isDarkMode);
    
    const handleGet = ()=>{
      fetch(`${url}api/user/get-user`,{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify({token,user2})})
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
      fetch(`${url}api/chat/add-chat`,{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify({token,user2})})
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
  const handleClear = () => {
    setInpUser("");
    setInvalid(null)
    setSuccess(false)
    setUser(null)
  }
  
    // console.log(user2)
  return (
    <View style={styles.container}>
      <View style={styles.inputCont}>
        <TextInput style={styles.input} value={user2} onChangeText={text => setInpUser(text)}/>
      </View>
      <View style={[styles.inputCont,{columnGap : 25}]}>
        <TouchableOpacity style={styles.btn} onPress={handleGet}>
            <Text style={{color:"white",fontSize : 20}}>
                Get User!
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor : isDarkMode ? "rgb(7, 94, 84)" : "rgb(7,94,85)",padding : 10,borderRadius : 12,alignItems : "center"}} onPress={handleClear}>
            <Text style={{color:"white",fontSize : 20}}>
              <Icon name='close' size={20}/>
            </Text>
        </TouchableOpacity>
        
      </View>
      {
        user ? 
          <View style={{width:"100%",justifyContent:"center",alignItems:"center",marginVertical : 20,rowGap : 30,marginTop:40}}>
            <View style={{width:"100%",justifyContent:"center",alignItems:"center",flexDirection:"row",columnGap:15}}>
              <Image style={{height : 70,width : 70,backgroundColor : 'transparent',borderRadius:100}} source={user.dp ? user.dp : pfp} />
              <Text style={{fontSize:35}}>
                {user.name}
              </Text>
            </View>
            <TouchableOpacity onPress={handleAdd} style={styles.btn} >
              <Text style={{color:"white",fontSize : 20}}>
                Add Chat!
              </Text>
            </TouchableOpacity>
          </View>
        : invalid ? <View style={{width:"100%",justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:17,color:"red"}} >{invalid.message}</Text></View> :
        <View/>
      }
    </View>
  )
}
export default AddChat