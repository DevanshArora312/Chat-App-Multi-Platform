import { View, Text,StyleSheet, TextInput, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useContext, useState } from 'react'
import { navContext } from '../../utils/store'
import { AddChatStyles } from '../../utils/Styles'
import { token } from '../../utils/store'
const AddChat = () => {
    const navigation = useContext(navContext);
    const [user2,setUser] = useState("");
    const isDarkMode = useColorScheme() === "dark";
    const styles = AddChatStyles(isDarkMode);
    const submitHandler = () =>{
        console.log(user2);
        fetch("http://192.168.29.165:3002/api/chat/add-chat",{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify({token,user2})})
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            if (data.success){
                navigation.navigate("Home");
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    // console.log(user2)
  return (
    <View style={styles.container}>
      <View style={styles.inputCont}>
        <TextInput style={styles.input} onChangeText={text => setUser(text)}/>
      </View>
      <View style={styles.inputCont}>
        <TouchableOpacity style={styles.btn} onPress={submitHandler}>
            <Text style={{color:"white",fontSize : 20}}>
                Add Chat
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default AddChat