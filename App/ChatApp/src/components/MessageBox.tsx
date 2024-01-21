import { View, Text, StyleSheet, Image, ImageSourcePropType, useColorScheme } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Ionicons"
import { MessageStyles } from '../../utils/Styles';

type propType = {
    content : String,
    read : boolean,
    sentBy : String,
    sentOn : String,
    type : String,
    reqUserId : String,
    img : ImageSourcePropType | undefined
};
 
const MessageBox = ({props} : {props : propType}) => {
    const isDarkMode = useColorScheme() === "dark"
    const styles = MessageStyles(isDarkMode);
    const styleClass = props.reqUserId === props.sentBy ? styles.right : styles.left
  return (
    <View style={styles.messCont}>
      <View style={[styles.messBox,styleClass]}>
        {
            props.type === "text" ?  <Text style={{color:isDarkMode ? "white" : "black",fontSize:20}}>{props.content} </Text> 
            : <Image source={props.img} />
        }
       
        <View style={{display:"flex",flexDirection :"row",alignItems:"flex-end",justifyContent:"flex-end"}}>
            {
                !props.read ? <Icon name={"checkmark"} size ={18} color={isDarkMode ? "white" : "grey"} /> : <Icon name={"checkmark-done"} size ={18} color={"blue"} />
            }
            <Text style={{color :"grey",fontSize:13}}>{props.sentOn}</Text>
        </View>
      </View>
    </View>
  )
}


export default MessageBox