import { User } from "../../models/user.js";

export const getUsers = async(req,res)=>{
    try {
        const user = await User.find({role: "user"})
        // console.log("Users",user);

        return res.status(200).json({
            message:"Users fetch sucessfully",
            Data:{
                length:user.length,
                Users :user
            }
        })
        
    } catch (error) {
        console.error("Error" , error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const getSuppliers = async(req,res)=>{
    try {
        const user = await User.find({role:"supplier"})
        // console.log("Supplier" ,user);

        return res.status(200).json({
            message:"Users fetch sucessfully",
            Data:{
                length:user.length,
                Users :user
            }
        })
        
    } catch (error) {
        console.error("Error" , error);
        return res.status(500).json({message:"Internal server error"})
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

export const updateUser = async(req,res) => {
    try {
        const {name , email , status , shopInfo } = req.body
        const {id} = req.query;
        const userExist = await User.findById(id)
        if (!userExist) {
            return res.status(404).json({message:"User not found"})
        }
        if (email || email !== userExist.email) {
            const isEmail = await User.findOne({email})
            if (isEmail)  return res.status(404).json({message:"User already exist with this email"})
        }
        
        const updatedUser = await User.findByIdAndUpdate(id , {$set:{
            name , 
            email:email , 
            status ,
            "shopInfo.name":shopInfo?.name,
            "shopInfo.description":shopInfo?.description,
            }} , {new:true})

        return res.status(200).json({
            message:"User updated sucessfully",
            Data:{
                User:updatedUser
            }
        })

    } catch (error) {
        console.error("Error" , error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const  delUser = async(req,res) => {
    try {
        const {id} = req.query
        const userExist = await User.findById(id)
        if (!userExist) {
            return res.status(404).json({message:"User not found"})
        }

        const del= await User.findByIdAndDelete(id)

        return res.status(200).json({
            message:"User delete sucessfully"
        })
        
    } catch (error) {
        console.error("Error" , error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const changeSupplierStatus = async (req, res) => {
  try {
    const { id } = req.query
    if (!id) return res.status(400).json({ message: "User ID required" });
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const newStatus = userExist.status === "active" ? "inactive" : "active";
    userExist.status = newStatus;
    await userExist.save();

    return res.status(200).json({
      message: `User status changed to ${newStatus}`,
      user: userExist,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

