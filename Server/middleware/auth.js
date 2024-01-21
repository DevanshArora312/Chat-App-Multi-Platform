const jwt = require("jsonwebtoken");
require("dotenv").config();
const {userModel} = require("../models/users");

exports.auth = async (req,res,next) => {
    try{
        const token = req.body.token;
        if (!token){
            return res.status(400).json({
                success:false,
                message:"user is not logged in!"
            })
        }
        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET_KEY);
            // const user = userModel.findById(payload.id);
            req.user = payload;
        } catch (err){
            return res.status(401).json(
                {
                    success:false,
                    message : "TOKEN_INVALID_ERR"
                }
            )
        }
        next();
    }
    catch(err){
        return res.status(401).json(
            {
                success:false,
                message:"something went wrong while verifying the token"
            }
        )
    }
    
}