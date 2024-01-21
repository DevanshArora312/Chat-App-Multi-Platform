import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, useColorScheme  } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/Fontisto"
import Icon2 from "react-native-vector-icons/Entypo"
import {stylesHeaderFunc} from "../../utils/Styles" 
const Header = () => {
    const isDarkMode = useColorScheme() === "dark";
    const stylesHeader = stylesHeaderFunc(isDarkMode);
    const [chatDis,setChatDis] = useState(true);
    const [addDis,setAddDis] = useState(false);
  return (
    <SafeAreaView style={stylesHeader.safeContainer}>
        <View style={stylesHeader.headContainer}>
            <View style={stylesHeader.titleContainer}>
                <Text style={stylesHeader.headText}>
                    ChatApp
                </Text>
                <View style={stylesHeader.iconBox}>
                    <Icon name ={"search"} size={25} color={"white"} style={{paddingBottom:0}} />
                    <Icon2 name={"dots-three-vertical"} size={25} color={"white"} />
                </View>
            </View>
            <View style={stylesHeader.btnContainer}>
                
                <TouchableOpacity style={[stylesHeader.btnStyles,stylesHeader.activeBox]} disabled={chatDis} >
                    <Text style={[stylesHeader.active,stylesHeader.btnText]}>Chats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={stylesHeader.btnStyles} disabled={addDis}>
                    <Text style={[stylesHeader.btnText,stylesHeader.inactive]}>Add Chat</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    </SafeAreaView>
  )
}



export default Header