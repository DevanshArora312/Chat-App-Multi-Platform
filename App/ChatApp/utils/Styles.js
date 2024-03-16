import { StyleSheet } from "react-native";

export const stylesHeaderFunc = (isDarkMode) =>  {
    return (
        StyleSheet.create({
            safeContainer : {
                width:"100%",
                flex :1,
                position:'absolute',
                top:0,
                left:0,
                height:"15%"
            },
            headContainer : {
                width : "100%", 
                flex : 1,
                backgroundColor : isDarkMode ? "rgb(38,55,66)" : "rgb(7,94,85)",
                height : "15%",
                position:"relative"
        
            },
            titleContainer : {
                width : "100%",
                display : 'flex',
                flexDirection : "row",
                justifyContent : 'space-between',
                alignItems:"center",
                padding : 10,
                position:"absolute",
                top:0,
                left:0
                
            },
            headText : {
                color : 'white',
                fontSize  : 25
            },
            btnContainer : {
                width : "100%",
                display : 'flex',
                flexDirection : "row",
                justifyContent : 'space-between',
                position:"absolute",
                left:0,
                bottom : "1%"
            },
            iconBox : {
                width : "25%",
                display : "flex",
                flexDirection : "row",
                justifyContent : 'space-around',
                alignItems  : "center"
            },
            btnStyles : {
                flex : 1,
                justifyContent : "center",
                alignItems :"center",
                // height:40,
            },
            textCont : {
                width :"auto",
                height:"100%",
                flex : 1,
                justifyContent : "center",
            },
            active : {
                color : isDarkMode ? "rgb(2,176,153)" : "white",
            },
            activeBox : {
                borderTopColor : "transparent",
                borderLeftColor : "transparent",
                borderRightColor : "transparent",
                borderBottomColor : isDarkMode ? "rgb(2,176,153)" : "white",
                borderWidth : 3,
                border : "solid",   
            },
            btnText : {
                fontSize : 20,
                padding : "3%"
            },
            inactive : {
                color : "white"
            }
        })
    );
}

export const singleChatBoxStyles = (isDarkMode) =>  {
    return (
        StyleSheet.create({
            container : {
                backgroundColor : "transparent",
                width:"auto",
                height : "auto",
                display : "flex",
                flexDirection : "row",
                columnGap : 15,
                alignItems:"center",
                padding : 15,
            },
            img : {
                borderRadius : 100,
                height : 50,
                width : 50
            },
            textBox : {
                display : "flex",
                flexDirection : "column",
                rowGap : 7,
                width : '100%',
                height:"auto"
            },
            message : {
                color : isDarkMode ? "rgba(255,255,255,0.7)" : "grey",
                fontSize : 15
        
            },
            messageBox : {
                display : 'flex',
                flexDirection : "row",
                columnGap : 10,
                alignItems:"center"
            },
            nameBox : {
                width : "80%",
                display : 'flex',
                justifyContent : 'space-between',
                flexDirection : "row",
                alignItems:"center"
            },
            name : {
                color : isDarkMode ? "white" : "black" ,
                fontSize : 20,
                fontWeight : 'bold',
            } 
        })
    );
}

export const HomeSubStyles = (isDarkMode) =>  {
    return (
        StyleSheet.create({
            container : {
                height:"100%",
                width:"100%",
                flexShrink:0,
                backgroundColor:isDarkMode ? "rgb(35,47,55)" : "white"
            }
        })
    );
}

export const SingleChatStyles = (isDarkMode,isKeyboardVisible) =>  {
    return (
        StyleSheet.create({
            chatArea : {
                width : "100%",
                height : "83%",
                display:"flex",
                flexDirection:"column-reverse",
                paddingBottom : isKeyboardVisible ? 40 : 5,
            },
            headContainer : {
                display : "flex",
                flexDirection : "row",
                backgroundColor : "rgb(2,176,153)",
                width : "100%",
                height : "8%",
                minHeight : 60,
                alignItems : "center",
                justifyContent : "space-between",
                paddingVertical : 8,
                paddingHorizontal : 10
            },
            img : {
                borderRadius : 100,
                height : 45,
                width : 45,
                marginHorizontal : 10
            },
            headTxt : {
                fontSize : 25,
                color : "white",
                fontWeight : "500"
            },
            cont1 : {
                height : "100%",
                display : "flex",
                flexDirection :"row",
                alignItems : "center"
            },
            bg:{
                minHeight : "100%",
                width : "100%"
            },
            inpCont : {
                position : "absolute",
                width : "100%",
                display :"flex",
                flexDirection :"row",
                columnGap : 5,
                bottom : 7, 
                height : "7.5%",
                minHeight : 50
            },
            inp :{
                backgroundColor : isDarkMode ? "#3e4c54" : "white",
                width : "85%",
                borderRadius : 30,
                paddingHorizontal : 13,
                fontSize : 15,
                color : isDarkMode ? "white" : "black"
            },
            sendBtn : {
                backgroundColor : "rgb(2,176,153)",
                borderRadius : 100,
                display : "flex",
                alignItems : "center",
                justifyContent : "center",
                width : 50,
                height : 50
            },
        })
    );
}


export const MessageStyles = (isDarkMode) =>  {
    return (
        StyleSheet.create({
            messCont : {
                width : "100%",
                height:"auto",
                marginVertical : 5,
                paddingHorizontal : 10
            },
            messBox : {
                maxWidth :"80%" ,
                paddingHorizontal : 10,
                paddingVertical : 5,
                rowGap : 4
            },
            right : {
                alignSelf :"flex-end",
                backgroundColor : isDarkMode ? "rgb(7, 94, 84)" : "rgb(223,247,205)",
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                borderTopLeftRadius: 15,
                borderTopRightRadius : 0
            },
            left : {
                alignSelf :"flex-start",
                backgroundColor : isDarkMode ? "rgb(35,47,55)" : "#f1f5f8",
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                borderTopLeftRadius: 0,
                borderTopRightRadius : 15
                
            }
        })
    );
}

export const AddChatStyles = (isDarkMode) =>  {
    return (
        StyleSheet.create({
            container : {
                height:"100%",
                width:"100%",
                flexShrink:0,
                backgroundColor:isDarkMode ? "rgb(35,47,55)" : "white",
                paddingTop : 100
            },
            inputCont : {
                backgroundColor : "transparent",
                width : "100%",
                alignItems : "center",
                marginVertical : 10
            },
            input:{
                backgroundColor : "transparent",
                width : "75%",
                borderWidth : 1,
                borderStyle : 'solid',
                borderColor : isDarkMode ? "white" : "black",
                borderRadius : 15,
                color : isDarkMode ? "white" : "black",
                padding : 10,
                fontSize : 20
            },
            btn : {
                backgroundColor : isDarkMode ? "rgb(7, 94, 84)" : "rgb(7,94,85)",
                padding : 10,
                borderRadius : 12,
                width : "30%",
                alignItems : "center"
            }
        })
    );
}

export const empty = (isDarkMode) =>  {
    return (
        StyleSheet.create({
            
        })
    );
}