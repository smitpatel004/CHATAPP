import jwt from "jsonwebtoken"
import dotenv from "dotenv"
const createTokenAndCookies=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_TOKEN,{
        expiresIn:"5d",
    });
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
    })

};
export default createTokenAndCookies