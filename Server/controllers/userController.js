const mongoose = require("mongoose");
const {userModel} = require("../models/users");
const bcrypt = require("bcrypt");
// const defaultPfp = require("../assets/pfp")
const jwt = require("jsonwebtoken")

const isLoggedin = async(req,res) => {
    if(!req.user){
        return res.status(400).json({
            success:false,
            message:"user is not logged in!"
        })
    }
    return res.status(200).json({
        success:true,
        reqUserId : req.user.id,
        message:"user is logged in!"
    })
}

const login = async (req,res)=> {
    const {email, password} = req.body;
    console.log(email,password);
    if (!email || !password){
        return res.status(401).json({
            success : false,
            message : 'Email or password is null!'
        })
    }
    if (email === "" || password === ""){
        return res.status(401).json({
            success : false,
            message : 'Email or password is Empty!'
        })
    }
    try{
        const userCheck = await userModel.findOne({email : email});
        // console.log(userCheck)
        if (!userCheck){
            return res.status(401).json({
                success : false,
                message : 'No user with email exists!'
            })
        }
        if (! await bcrypt.compare(password,userCheck.password)){
            return res.status(403).json({
                success:false,
                message:"password does not match!"
            })
            
        }
        const payLoad = {
            email : userCheck.email,
            id : userCheck._id,
        }
        let token = jwt.sign(payLoad,process.env.JWT_SECRET_KEY,{ expiresIn: "72h" });
        
        res.status(200).json(
            {
                ok:true,
                success:true,
                token,
                message:"Login Successful!"
            }
        )
    } catch (err){
        return res.status(500).json({
            success : false,
            message : 'Server Error at user finding!'
        })
    }
    
} 

const signup = async (req,res)=> {
    // console.log(req.body)
    const {email, password,name,bio} = req.body;
    var newDp;
    console.log("FILEEEE---",req.files);
    if(req.files && req.files.dp){
        const dp = req.files.dp;
        const type = dp.mimetype.split('/')[1];
        const url = `data:image/${type};base64,` + dp.data.toString('base64');
        
        // newDp = {
        //     public_id:"public",
        //     url : url
        // } 
        newDp = url;  
    }
    else{
        newDp = "";
    }
    
    if (!email || !password){
        return res.status(401).json({
            success : false,
            message : 'Email or password is null!'
        })
    }
    if (email === "" || password === ""){
        return res.status(401).json({
            success : false,
            message : 'Email or password is Empty!'
        })
    }
    try{
        const userCheck = await userModel.findOne({email : email});
        if (userCheck){
            return res.status(401).json({
                success : false,
                message : 'User with email already exists!'
            })
        }

        // const cookieOptions = {
        //     httpOnly : true,
        //     expires : new Date(Date.now() + 3*60*60*1000)
        // }
        
        const user = await userModel.create({email,password  : await bcrypt.hash(password,10) , dp : newDp , bio : bio | "" , name })
        const payLoad = {
            email : user.email,
            id : user._id,
        }
        let token = jwt.sign(payLoad,process.env.JWT_SECRET_KEY,{ expiresIn: "72h" });
        
        return res.status(200).json(
            {
                ok:true,
                success:true,
                token,
                message:"Signup Successful!"
            }
        )
    } catch (err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : 'Server Error !'
        })
    }
    
} 

const getUser = async (req,res) =>{
    try{
        if(!req.user){
            return res.status(400).json({
                success:false,
                message:"user is not logged in!"
            })
        }
        const {user2} = req.body;
        if (user2 === "" || !user2){
            throw new Error("User ID invalid!"); 
        }
        // console.log(user2)
        const user = await userModel.findOne({email : user2});
        return res.status(200).json({
            success : true,
            message : "Fetch Success!",
            user : {
                id : user._id,
                name : user.name,
                dp : user.dp 
            }
        })
    }catch (err){
        return res.status(500).json({
            success : false,
            message : err.message
        }); 
    }
}

module.exports = {login,signup,isLoggedin,getUser}