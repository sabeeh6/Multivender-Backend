import { User } from "../../models/user.js";

export const getAllUsers = async(req,res)=>{
    try {
        const user = await User.find({role: {$ne:"superadmin"}})
        console.log(user);

        return res.status(200).json({
            message:"Users fetch sucessfully",
            Data:{
                length:user.length,
                Users :user
            }
        })
        
    } catch (error) {
        console.error("Error" , error);
        return resizeBy.status(500).json({message:"Internal server error"})
    }
}

export const getUserById = async(req,res) => {
    try {
        const {id} = req.query
        const userById = await User.findById(id);
        if (!userById) {
            return res.status(200).json({message:"User not found"})
        }

        return res.status(200).json({
            message:"User fetch sucessfully",
            Data: userById
        })
    } catch (error) {
        console.error("Error" , error);        
    }
}

