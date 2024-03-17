import { View, Text,SafeAreaView,StyleSheet,Image,useColorScheme} from 'react-native'
import React,{useEffect} from 'react'
import { url } from '../../utils/store'
import { icon,icon_light } from '../../utils/images'
import { useDispatch,useSelector } from '../redux/store';

const Startup = ({navigation} : {navigation : any}) => {
    const isDarkMode = useColorScheme() === "dark";
    const token = useSelector((state :any) => {return state.auth.token})
    useEffect(()=>{
        fetch(`${url}api/user/isLoggedIn`,{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify({token})})
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.success){
              navigation.replace("Home");
            } else {
                navigation.replace("Login");
            }
        })
        .catch(err=>{
            console.log("Error occ here:",err.message); 
        })
    },[]);
  return (
    <SafeAreaView style={[styles.container,{backgroundColor : isDarkMode ? "rgb(35,47,55)" : "white",
}]}>
        <Image source={isDarkMode ? icon : icon_light} style={styles.img}/>
        <Text style={{fontSize : 50,color : isDarkMode ? "white" : "black"}}>
            ChatApp
        </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container : {
        width : "100%",
        height : "100%",
        justifyContent : "center",
        alignItems :"center",
        rowGap : 20
    },
    img : {
        // borderRadius : 100,
        height : 100,
        width : 100,
        backgroundColor : 'transparent'
    },

})

export default Startup