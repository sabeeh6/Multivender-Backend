import { User } from "../models/user.js";
import bcrypt from "bcrypt";


export const signUp = async (req , res)=>{
    try {
        const {email , password  } = req.body
        const isUserLie = await User.findOne({email})
        if (isUserLie) {
            return res.status(400).json({message:"User already exist"})
        }

        const hash = await bcrypt.hash(password , 15)
        console.log(hash);
        const newUser = await {...req.body , password:hash}
        console.log("newUser" ,newUser);
        
        const createdUser = await User.create(newUser)
        return res.status(200).json({
            message:"User created successfully (❁´◡`❁)",
            Data:createdUser
        })
        

    } catch (error) {
        console.error("Error" , error);
        res.status(500).json("Internal server error 👻")
    }
}

export const signIn = async (req,res)=> {
    try {
        const {email , password} = req.body
        console.log(email , password);
        
        const isUserLie = await User.findOne({email})
        console.log(isUserLie);
        
        if (!isUserLie) {
            return res.status(400).json({message:"User not exist"})
        }
        const comparePassword = await bcrypt.compare(password , isUserLie.password)
        if (!comparePassword) {
            return res.status(400).json({message:"Invalid credentials"})
        }

        return res.status(200).json({
            message:"User Logged In sucessfully" , 
            Data:isUserLie
        })
        
        
    } catch (error) {
        console.error("Error" , error);
        res.status(500).json({message:"Internal server error 👻"})
    }
}
