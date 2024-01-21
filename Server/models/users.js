const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email : {
            type : String ,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        name : {
            type : String,
            required : true
        },
        dp : {
            type : String,
            required : false
        },
        bio : {
            type : String, 
            required : false
        },
        chats : {
            type : [mongoose.Schema.Types.ObjectId],
            ref : "chat",
            required : true
        },
        status:{
            required : false,
            default : "offline",
            type : String
        },
        socket_id : {
            type : String
        }
    }
)

const userModel = mongoose.model("user", userSchema);

module.exports = {  userModel };