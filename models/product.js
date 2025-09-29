import mongoose from "mongoose";

const newProduct = new mongoose.Schema({
    name:{
        type:String
    },
    categaryId:{
        type :mongoose.Schema.Types.ObjectId,
        ref:"categary",
        required:true   
    },
    supplierId:{
        type :mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
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
    image:{
        type:[String]
    }
},{
    timestamps:true
})

export const products = mongoose.model("product" , newProduct)
