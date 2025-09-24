import mongoose from "mongoose";

const newProduct = new mongoose.Schema({
    name:{
        type:String
    },
    categaryId:{

    },
    supplierId:{

    },
    price:{
        type:Number
    },
    stock:{
        type:Number
    },
    description:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export const products = mongoose.model("product" , newProduct)
