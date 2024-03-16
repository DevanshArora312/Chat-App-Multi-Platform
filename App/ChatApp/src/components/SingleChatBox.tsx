import { View, Text, Image, ImageSourcePropType,StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Ionicons"
import {pfp} from "../../utils/images"
import {singleChatBoxStyles} from "../../utils/Styles"
import { getTime } from '../../utils/store'
type chatItem = {
    image : ImageSourcePropType,
    name : String,
    tick : Boolean,
    lastMess : String,
    time : String,
    messName : String
}

const SingleChatBox = ({props} : {props : chatItem}) => {
    // const image = !props.image ? pfp : props.image;
    const image = pfp;
    const isDarkMode = useColorScheme() === "dark";
    const styles = singleChatBoxStyles(isDarkMode); 
    return (
        <View style={styles.container}>
        <Image source={image} style={styles.img}/>
        <View style={styles.textBox}>
            <View style={styles.nameBox}>
                <Text style={styles.name}>
                    {props.name ? props.name : "Username"}
                </Text>
                <Text style={styles.message}>
                    {props.time ? getTime(props.time) : ""}
                </Text>
            </View>
            <View style={styles.messageBox}>
                {
                    (props.tick !== null) && (!props.tick ? <Icon name={"checkmark"} size ={20} color={isDarkMode ? "white" : "grey"} /> : <Icon name={"checkmark-done"} size ={20} color={"blue"} />)
                }
                <Text style={styles.message}>
                    {props.messName ? props.messName+" :" : null }
                </Text>
                <Text style={styles.message}>
                    {props.lastMess}
                </Text>
            </View>
        </View>
        </View>
    )
}



export default SingleChatBox