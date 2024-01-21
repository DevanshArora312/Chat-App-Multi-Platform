import { View, Text, TouchableOpacity, SafeAreaView, useColorScheme, TextInput,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/Fontisto"
import Icon2 from "react-native-vector-icons/SimpleLineIcons"
import HomeSubPages from '../components/HomeSubPages'
import { navContext, url } from '../../utils/store';
import { stylesHeaderFunc } from '../../utils/Styles';
import AddChat from '../components/AddChat'
import { SearchBar } from 'react-native-screens'


const Home = ({navigation} : {navigation : any}) => {
    const {width} = Dimensions.get('window');
    const isDarkMode = useColorScheme() === "dark";
    const stylesHeader = stylesHeaderFunc(isDarkMode);
    const [chatDis,setChatDis] = useState(true);
    const [search,setSearch] = useState(false);
    const [sText,setSText] = useState("");
    const changeScreen = () => {
        setChatDis(!chatDis);
    }
    useEffect(()=>{
      setSText("");
    },[search]);
    
    
  return (
    <navContext.Provider value={navigation}>
        <SafeAreaView style={{width:"100%",height : "100%",flexShrink:0,backgroundColor:"#3e4c54"}}>
          <SafeAreaView style={stylesHeader.safeContainer}>
              <View style={stylesHeader.headContainer}>
                <View style={stylesHeader.titleContainer}>
                    <Text style={stylesHeader.headText}>
                        ChatApp
                    </Text>
                    <View style={stylesHeader.iconBox}>
                        <TouchableOpacity onPress={()=>setSearch(!search)}>
                          <Icon name ={"search"} size={25} color={"white"} style={{paddingBottom:0}} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Icon2 name={"logout"} size={25} color={"white"} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={stylesHeader.btnContainer}>    
                    <TouchableOpacity style={[stylesHeader.btnStyles,chatDis ? stylesHeader.activeBox : null]} disabled={chatDis} onPress={changeScreen}>
                        <Text style={[stylesHeader.btnText , chatDis ? stylesHeader.active : stylesHeader.inactive]}>Chats</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[stylesHeader.btnStyles,!chatDis ? stylesHeader.activeBox : null]} disabled={!chatDis} onPress={changeScreen}>
                        <Text style={[stylesHeader.btnText,!chatDis ? stylesHeader.active : stylesHeader.inactive]}>Add Chat</Text>
                    </TouchableOpacity>
                </View>
              </View>
          </SafeAreaView>
          <View style={{height:"15%"}}/>
          <View>
            {chatDis  ? <HomeSubPages contains={sText}/> : <AddChat/>} 
          </View>
          {search && 
            <View style={{position:"absolute",top:0,left:0,width:width,padding:5,flexDirection:"row",backgroundColor:isDarkMode ? "rgb(38,55,66)" : "rgb(7,94,85)",alignItems:"center",justifyContent:"center"}}>
              <TextInput style={{backgroundColor : "white",width:"90%",color:"black",padding:10,borderRadius:15}} placeholder='Search' placeholderTextColor={"black"} onChangeText={text=>setSText(text)} />
              <TouchableOpacity onPress={()=>setSearch(!search)} style={{borderRadius:100,backgroundColor:"black",alignItems:"center",justifyContent:"center",width:40,height:40}}>
                <Text style={{color:"white"}}>X</Text>
              </TouchableOpacity>
            </View>
          }
        </SafeAreaView>
    </navContext.Provider>
  )
}

export default Home