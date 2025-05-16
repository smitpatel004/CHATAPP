import User from "../models/userModel.js"
import bcrypt from "bcryptjs";
import createTokenAndCookies from "../jwt/generateToken.js"
export const signup = async (req, res) => {
    console.log("📝 Received Data from Frontend:", req.body);
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (password != confirmPassword) {
            return res.status(400).json({ message: "password do not match" })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "email already exist" });
        }

        const hashrdPassword = await bcrypt.hash(password, 10);

        const newUser = await new User({
            name,
            email,
            password: hashrdPassword,
        });

      

        await newUser.save();
        if(newUser){
            createTokenAndCookies(newUser._id,res);
            res.status(201).json({
                message: "user register successfully",user:{
                    _id:newUser._id,
                    name:newUser.name,
                    email:newUser.email,
                }
            })
        }
        
            // .then(() => 
            // .save()
            // )
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email})
        const isMatch= await bcrypt.compare(password,user.password)
        if(!user || !isMatch ){
          return   res.status(404).json({ message: "Invalid User or Password" })
        }
        createTokenAndCookies(user._id,res)
        res.status(201).json({message:"user logged in successgfully",user:{
            _id:user._id,
            name:user.name,
            email:user.email,
        }})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
}
export const logout=async(req,res)=>{
   
    try {
        res.clearCookie('token');
        res.status(200).json({message:"user loged out succesfuly"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" })
    }
}

export const getUserProfile=async(req,res)=>{
    try {
       
        const LogIn=req.user._id;
        const alluser =await User.find({_id:{$ne:LogIn}}).select("-password")
        res.status(201).json({alluser})
    } catch (error) {
        console.log("ERROR IN ALLUSER",error);
        res.status(500).json({message:"Server Error"});
        
    }
}