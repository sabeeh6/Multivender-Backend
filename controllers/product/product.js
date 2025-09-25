import { products } from "../../models/product.js";


export const createProduct = async(req,res) => {
    try {
        const {} = req.body


        return res.status(200).json({
            message:"Product created sucessfully",
            Data:""
        })
    } catch (error) {
        console.error("Error" , error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const getProducts = async(req,res) => {
    try {
        const {} = req.body


        return res.status(200).json({
            message:"Products fetchted sucessfully",
            Data:""
        })
    } catch (error) {
        console.error("Error" , error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const updateProduct = async(req,res) => {
    try {
        const {} = req.body
        const {id} = req.query
        const exist = await products.findById(id)
        if (!exist) {
            return res.status(404).json({message:"Product not found"})
        }
        const updatedProduct = await products.findByIdAndUpdate(id , {new:true})

        return res.status(200).json({
            message:"Product updated sucessfully",
            Data:""
        })
    } catch (error) {
        console.error("Error" , error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const delProduct = async(req,res) => {
    try {
        const {id} = req.query;
        const exist = await products.findById(id)
        if (!exist) {
            return res.status(404).json({message:"Product not found"})
        }
        await products.findByIdAndDelete(id)

        return res.status(200).json({
            message:"Product created sucessfully",
            Data:exist
        })
    } catch (error) {
        console.error("Error" , error);
        return res.status(500).json({message:"Internal server error"})
    }
}
