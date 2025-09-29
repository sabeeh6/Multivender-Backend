import { Cloud } from "../../config/cloudinary.js";
import { products } from "../../models/product.js";

export const createProduct = async (req, res) => {
    try {
        const { name, price, stock, description } = req.body;
        const {categaryId} = req.params // URL params se
        console.log(req.body);
        
        // console.log(req.user);
        
        const supplierId = req.user.id; // Auth middleware se

        // Validation
        if (!name || !price) {
            return res.status(400).json({ 
                success: false,
                message: "Name and price are required" 
            });
        }

        if (!categaryId) {
            return res.status(400).json({ 
                success: false,
                message: "Category ID is required" 
            });
        }

        // Check if image file exists
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ 
                success: false,
                message: "Product image is required" 
            });
        }

        // ✅ Use imported "Cloud" instead of "cloudinary"
        console.log("here0");
        const uploadStream = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = Cloud.uploader.upload_stream(
                    {
                        folder: "products",
                        resource_type: "image"
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(buffer);
            });
        };
        
        console.log("here");
           const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadStream(file.buffer);
        return {
          publicId: result.public_id
        };
      })
    );
    console.log(uploadedImages);
    
        
const imagePublicIds = uploadedImages.map(img => img.publicId);

        // ✅ Use imported "products" instead of "Product"
        const product = await products.create({
            name,
            categaryId,
            supplierId, 
            price,
            stock: stock || 0,
            description,
            image: imagePublicIds,
            // imagePublicId: cloudinaryResult.public_id
        });

        res.status(201).json({ 
            success: true, 
            message: "Product created successfully",
            product 
        });

    } catch (error) {
        console.error("Create product error:", error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        res.status(500).json({ 
            success: false,
            message: "Internal server error" 
        });
    }
};


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
