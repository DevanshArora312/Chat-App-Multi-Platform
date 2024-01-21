const {addMessage,getAllChats,getChatById,addChat} = require("../controllers/chatController")
const router = require("express").Router();
const {auth} = require("../middleware/auth")
router.post("/add-message",auth,addMessage);
router.post("/get-chats",auth,getAllChats);
router.post("/get-chat/:id",auth,getChatById);
router.post("/add-chat",auth,addChat);

module.exports = router; 