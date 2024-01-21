import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Signup = ({navigation} : {navigation : any}) => {
    

    return (
    <View style={styles.container}>
      <Text>Signup</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        width : "100%",
        height : "100%"
    }
})

export default Signup