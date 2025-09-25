import { categary } from "../../models/categary.js";


export const createCategary = async(req,res) => {
    try {        
        const {name , description} = req.body
        const exist = await  categary.findOne({name})
        if (exist) {
            return res.status(400).json({message:"Categary with same name already exist"})
        }

        const cat = await categary.create({name , description})
        return res.status(200).json({
            message:"Categary added sucessfully",
            Data:cat
        })
        
    } catch (error) {
        console.error("Error" , error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const getAllCategaries = async(req , res) => {
    try {
        const exist = await categary.find()
        if (!exist) {
            return res.status(404).json({message:"Categaries not found"})
        }

        return res.status(200).json({
            message:"Categaries fetched sucessfully",
            Data:{
                Length:exist.length,
                Categaries: exist
            }
        })
        
    } catch (error) {
        console.error("Error" , error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const updateCategary = async(req,res) => {
    try {
        const {id} = req.query
        const {name , description} = req.body
        const exist = await categary.findById(id)
        console.log(exist);
        if (!exist) {
            return res.status(404).json({message:"categary not found"})
        }

        const newCat = await categary.findByIdAndUpdate(id ,{name , description} , {new:true} );
        return res.status(200).json({
            message:"Categary update sucessfully",
            Data:newCat
        })
        
    } catch (error) {
        console.error("Error" , error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const delCategary = async(req,res) => {
    try {
        const {id} = req.query
        const exist = await categary.findById(id)
        if (!exist) {
            return res.status(404).json({message:"Categary not found"})
        }
        const del = await categary.findByIdAndDelete(id)
        console.log(del);
        
        return res.status(200).json({
            message:"Categary deleted sucessfully",
            DeletedData:exist
        })

    } catch (error) {
        console.error("Error" , error);
        return res.status(500).json({message:"Internal servre error"})
    }
}
