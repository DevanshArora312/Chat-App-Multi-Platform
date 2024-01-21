const {login,signup,isLoggedin,getUser} = require("../controllers/userController")
const router = require("express").Router();
const {auth} = require("../middleware/auth");

router.post("/login",login);
router.post("/signup",signup);
router.post("/isLoggedin",auth,isLoggedin);
router.post("/get-user",auth,getUser);

module.exports = router;