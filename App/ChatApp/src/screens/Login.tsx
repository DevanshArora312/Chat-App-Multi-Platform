import { View, Text, StyleSheet,SafeAreaView,Image,TextInput,TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'
import { icon } from '../../utils/images'
import { url } from '../../utils/store'
import {useDispatch,useSelector} from "react-redux";
import { setToken } from '../redux/slices/auth';

const Login = ({navigation} : {navigation : any}) => {
  const token = useSelector((state : any) => state.auth.token);
  const [formData,setFormData] = useState({email : "" , password : "" });
  const [isClicked,setisClicked] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (field : string ,text : string) => {
    setFormData (prev => {
      return {
        ...prev,
        [field] : text
      }
    })
  }
  const handleSubmit = () => {
      if (formData['email'] == '' || formData['password'] == '') {

      } 
      
      setisClicked(true);
      fetch(`${url}api/user/login`,{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify(formData)})
      .then(res => (res.json()))
      .then(resData => {
          if(resData.success){
              dispatch(setToken(resData.token));
              navigation.replace("Home");
          } else{
              setTimeout(()=>{
                  setisClicked(false);
              },2500);
          }
      })
      .catch(err => {
          console.error(err);
          setisClicked(false);
      })
  }
  useEffect(()=>{
    fetch(`${url}api/user/isLoggedIn`,{method:"POST",headers:{"Content-Type" : "application/json"},body:JSON.stringify({token})})
    .then(res => {
        return res.json();
    })
    .then(data => {
        if (data.success){
          navigation.replace("Home");
        }
    })
    .catch(err=>{
        console.log("Error occ :",err.message); 
    })
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoCont}>
        <View>
          <Image source={icon} style={styles.img} />
        </View>
        <View >
          <Text style={styles.logoText}>
            ChatApp Login
          </Text>
        </View>
      </View>
      <View style={styles.form}>
        <TextInput style={styles.inputField} placeholder='Email' placeholderTextColor={"black"} onChangeText={text => handleChange("email",text)} value={formData.email} />
        <TextInput style={styles.inputField} placeholder='Password' placeholderTextColor={"black"} onChangeText={text => handleChange("password",text)} value={formData.password} />
        <TouchableOpacity style={styles.formButton} onPress={handleSubmit} disabled={isClicked}> 
          <Text style={{fontSize :20}}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.changeScreen}>
        <Text style={{fontSize : 20}}>
          Don't have an Account?
        </Text>
        <TouchableOpacity onPress={() => navigation.replace("Signup")} disabled={isClicked}>
          <Text style={{fontSize : 20,color: "lightgreen",textDecorationLine :"underline"}}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    img : {
      // borderRadius : 100,
      height : 100,
      width : 100,
      backgroundColor : 'transparent'
    },
    container : {
        width : "100%",
        height : "100%",
        backgroundColor : "black",
        display:"flex",
        alignItems:"center",
        justifyContent :"center"
    },
    logoCont : {
      width : "100%",
      backgroundColor : "black",
      display:"flex",
      flexDirection : "column",
      alignItems:"center",
      justifyContent :"center",
      color : "black",
      rowGap : 20
    },
    form : {
      marginVertical : 20,
      width : "100%",
      padding : 5,
      rowGap : 20,
      display : "flex",
      justifyContent : "center",
      alignItems : 'center'
    },
    logoText : {
      justifyContent : "center",
      alignItems : "center",
      display :"flex",
      flexDirection : "row",
      width : "100%",
      fontSize : 50,
      color :"white"
    },
    inputField : {
      backgroundColor : "white",
      borderRadius : 25,
      width : "90%",
      height : 50,
      fontSize : 20,
      color : "black",
      padding : 10,
      borderWidth : 1,
      borderColor : "grey",
      shadowColor : "grey",
      shadowOffset : {width : 0, height : 0},
      shadowRadius : 10,
      shadowOpacity : 100
    } ,
    formButton : {
      backgroundColor : "purple",
      borderRadius : 25,
      width : "80%",
      height : 50,
      fontSize : 20,
      color : "white",
      padding : 10,
      display : "flex",
      justifyContent :"center",
      alignItems :"center",
      marginTop : 20
    },
    changeScreen : {
      width : "100%",
      padding : 10,
      flexDirection : "row",
      justifyContent : 'center',
      alignItems : "center",
      columnGap : 10
    }
})

export default Login