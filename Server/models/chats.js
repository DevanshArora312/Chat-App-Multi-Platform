const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema(
//     {
//         sentBy : {
//             type : String ,
//             required : true
//         },
//         content : {
//             type : String,
//             required : true
//         },
//         type : {
//             type : String,
//             required : true
//         },
//         sentOn : {
//             type : Date,
//             required : true
//         }  
//     }
// )

const chatSchema = new mongoose.Schema(
    {
        user1 : {
            type : mongoose.Schema.Types.ObjectId ,
            ref : "user",
            required : true
        },
        user2 : {
            type : mongoose.Schema.Types.ObjectId ,
            ref : "user",
            required : true
        },
        messages : [{
            sentBy : {
                type : String ,
                required : true
            },
            content : {
                type : String,
                required : true
            },
            type : {
                type : String,
                required : true
            },
            sentOn : {
                type : Date,
                required : true
            },
            read : {
                type : Boolean,
                required : false,
                default : false
            },
            img : {
                type : String,
                required : false,
                default : null
            }
        }]
    }
)

const chatModel = mongoose.model("chat", chatSchema);
// const messageModel = mongoose.model("chat", messageSchema);
module.exports = {  chatModel};