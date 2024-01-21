import { View, Text, TextInput } from 'react-native'
import React from 'react'

const SearchBox = () => {
  return (
    <View style={{position:"absolute",top:0,left:0,width:"100%"}}>
      <TextInput style={{backgroundColor : "white"}} placeholder='Search' placeholderTextColor={"black"} />
    </View>
  )
}

export default SearchBox