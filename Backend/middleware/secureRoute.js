import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const secureRoute=async(req,res,next)=>{
    try {
        const token =req.cookies.jwt;
       
       
        if(!token){
            return res.status(401).json({message:"NOT AUTHORIZED at secure"})
        }
       

        const verified=jwt.verify(token,process.env.JWT_TOKEN);
        if(!verified){
            return res.status(403).json({message:"INvalid token"})
        }
        const user=await User.findById(verified.userId).select("-password")
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        req.user=user;
        next()

        
    } catch (error) {
        console.log(error)
        res.status(501).json({message:"Interal server error"})
    }
}
export default secureRoute;