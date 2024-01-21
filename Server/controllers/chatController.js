const mongoose = require("mongoose");
const {chatModel} = require("../models/chats");
const {userModel} = require("../models/users");
const jwt = require("jsonwebtoken");


const addChat = async (req,res) => {
    try{
        if(!req.user){
            throw new Error("User not logged in!");
        }
        const {user2} = req.body;
        const user1 = req.user.id;
        var db1,db2;
        try{
            db1 = await userModel.findById(user1);
            db2 = await userModel.findOne({email : user2});
            const arr1 = db1.chats;
            const arr2 = db2.chats;
            arr1.forEach(el1 => {
                arr2.forEach(el2 => {
                    if (el1.toString() === el2.toString()){
                        throw new Error("Chat already exists!");
                    }
                })
            })
        }catch(err){
            return res.status(400).json({
                success:false,
                message : err.message
            })
        }
        const chat = new chatModel({
            user1 : db1._id,user2 : db2._id,messages :[]
        });
        
        const savedChat = await chat.save();
        try{
            await userModel.findByIdAndUpdate(db1._id,{$push : {chats : savedChat._id}},);
            await userModel.findByIdAndUpdate(db2._id,{$push : {chats : savedChat._id}});
        } catch (err){
            return res.status(401).json({
                success:false,
                message : "user id invalid!"
            })
        }
        const userId = (user1.toString() !== savedChat.user1.toString()) ? savedChat.user1.toString() : savedChat.user2.toString();
        const user = await userModel.findById(userId);        
        const newOb = {
            reqUserId : user1,
            user : {
                name : user.name,
                dp : user.dp,
            },
            _id : savedChat._id,
            lastMess : "",
            messName : "",
            sentOn : "",
            read : undefined
        } 
        return res.status(200).json({
            success : true,
            message : "Chat Added!",
            chat : newOb
        })
        
    }catch (err){
        return res.status(500).json({
            success : false,
            message : err.message
        }); 
    }
}

const getChatById = async(req,res) => {
    try{
        if(!req.user){
            return res.status(500).json({
                success : false,
                message : "User not logged in"
            });
        }
        const {id} = req.params;
        const chat = await chatModel.findById(id);
        const getId = chat.user1.toString() === req.user.id.toString() ? chat.user2 : chat.user1;
        const altId = chat.user1.toString() !== req.user.id.toString() ? chat.user2 : chat.user1;
        const lastUser = await userModel.findById(altId);
        const user = await userModel.findById(getId);
        // console.log(req.user.id)
        chat.messages.forEach(item => {
            if(item.sentBy.toString() !== req.user.id.toString()){
                item.read = true;
            }
        })
        await chatModel.findByIdAndUpdate(id,{messages:chat.messages});
        const resp = {
            user1 : chat.user1,
            user2 : chat.user2,
            messages : chat.messages,
            reqUserId : req.user.id,
            name : user.name,
            dp : user.dp,
            status : user.status,
            unread : false,
            lastMessName : lastUser.name
        }
        return res.status(200).json({
            success : true,
            message : 'Fetch success!',
            chats : resp,
            
        })
    } catch (err){
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

const getAllChats = async(req,res)=>{
    try{
        if(!req.user){
            return res.status(500).json({
                success : false,
                message : "User not logged in"
            });
            
        }
        const {id}  = req.user;
        const chat = await userModel.findById(id).populate("chats").exec();
        const chatArr = chat.chats;
        var newChatArr = []
        // console.log(chatArr)
        await Promise.all(
            chatArr.map(async item => {
                const userId = (id.toString() !== item.user1.toString()) ? item.user1.toString() : item.user2.toString();
                const user = await userModel.findById(userId);
                for (const el of item.messages){
                    if(!el.read && id !== el.sentBy){
                        item.unread = true;
                        break;
                    }
                }
                const newOb = {
                    reqUserId : id,
                    user : {
                        name : user.name,
                        dp : user.dp,
                    },
                    _id : item._id,
                    lastMess : item.messages[0] ? (item.messages[item.messages.length-1].type === "text" ? item.messages[item.messages.length-1].content : "Image") : "",
                    messName : item.messages[0] ? (item.messages[item.messages.length-1].sentBy === id ? "You" : user.name) : "",
                    sentOn : item.messages[0] ? item.messages[item.messages.length-1].sentOn : "",
                    read : item.messages[0] ? item.messages[item.messages.length-1].read : undefined,
                    unread : item.unread,
                }
                newChatArr.push(newOb);
            })
        );
        // console.log(newChatArr)
        return res.status(200).json({
            success : true,
            message : 'Fetch success!',
            chats : newChatArr,
            
        })
    } catch (err){
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}
 
const addMessage = async(req,res) => {
    try{
        if(!req.user){
            throw new Error("User not logged in!");
        }
        const {content,type,sentOn,id} = req.body;
        const sentBy = req.user.id;
        const newMessage = {
            sentBy,content,type,sentOn
        };
        const updatedChatArr = await chatModel.findByIdAndUpdate(id,{$push:{messages : newMessage}} , {new : true});
        return res.status(200).json({
            success : true,
            message : "Added Succesfully!",
            chat : updatedChatArr
        })
    } catch (err){
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

module.exports = {getAllChats,getChatById,addMessage,addChat};