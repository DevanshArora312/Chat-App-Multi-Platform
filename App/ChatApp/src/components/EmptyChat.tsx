import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'

const EmptyChat = () => {
    const isDarkMode = useColorScheme() === "dark"
    const styles = StyleSheet.create({
        container : {
            backgroundColor : "transparent",
            width:"auto",
            height : "auto",
            display : "flex",
            flexDirection : "row",
            columnGap : 15,
            alignItems:"center",
            padding : 15,
            paddingVertical : 25
        },
        image : {
            backgroundColor : isDarkMode ? "grey" : "rgb(154,154,154)",
            borderRadius : 100,
            height : 40,
            width : 40
        },
        textBox : {
            display : "flex",
            flexDirection : "column",
            rowGap : 7,
            width : '100%',
            height:"auto"
        },
        text : {
            backgroundColor : isDarkMode ? "grey" : "rgb(154,154,154)",
            borderRadius : 20,
            height : 13,
            
        }
    })
    
  return (
    <View >
        <View style={styles.container}>
            <View style={styles.image}/>
            <View style={styles.textBox}>
                <View style={[styles.text,{width : "50%"}]}/>
                <View style={[styles.text,{width : "70%"}]}/>
            </View>
        </View>
        <View style={styles.container}>
            <View style={styles.image}/>
            <View style={styles.textBox}>
                <View style={[styles.text,{width : "50%"}]}/>
                <View style={[styles.text,{width : "70%"}]}/>
            </View>
        </View>
        <View style={styles.container}>
            <View style={styles.image}/>
            <View style={styles.textBox}>
                <View style={[styles.text,{width : "50%"}]}/>
                <View style={[styles.text,{width : "70%"}]}/>
            </View>
        </View>
        <View style={styles.container}>
            <View style={styles.image}/>
            <View style={styles.textBox}>
                <View style={[styles.text,{width : "50%"}]}/>
                <View style={[styles.text,{width : "70%"}]}/>
            </View>
        </View>
        <View style={styles.container}>
            <View style={styles.image}/>
            <View style={styles.textBox}>
                <View style={[styles.text,{width : "50%"}]}/>
                <View style={[styles.text,{width : "70%"}]}/>
            </View>
        </View>
        <View style={styles.container}>
            <View style={styles.image}/>
            <View style={styles.textBox}>
                <View style={[styles.text,{width : "50%"}]}/>
                <View style={[styles.text,{width : "70%"}]}/>
            </View>
        </View>
        <View style={styles.container}>
            <View style={styles.image}/>
            <View style={styles.textBox}>
                <View style={[styles.text,{width : "50%"}]}/>
                <View style={[styles.text,{width : "70%"}]}/>
            </View>
        </View>
        


    </View>
  )
}


export default EmptyChat;