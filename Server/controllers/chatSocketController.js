const mongoose = require("mongoose");
const {chatModel} = require("../models/chats");
const {userModel} = require("../models/users");
const jwt = require("jsonwebtoken");

const addMessage = async(data) => {
    try{
        const {newChat} = data;
        const id  = data.chatId
        const updatedChatArr = await chatModel.findByIdAndUpdate(id,{$push:{messages : newChat}} , {new : true});
    
    } catch (err){
        console.log(err.message)
    }
}

module.exports = addMessage