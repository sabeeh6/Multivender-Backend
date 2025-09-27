import { cloudinary } from "../../config/cloudinary.js";
import { products } from "../../models/product.js";


export const createProduct = async(req,res) => {
    try {
        const {} = req.body

    // 1️⃣ Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload_stream(
      { folder: "products" }, // optional folder
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Cloudinary error", error });
        }

        // 2️⃣ Save URL and Public ID to MongoDB
        const product = await Product.create({
          name: req.body.name,
          imageUrl: result.secure_url,
          imagePublicId: result.public_id
        });

        res.status(201).json({ success: true, product });
      }
    );
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
