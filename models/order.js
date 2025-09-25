import mongoose from "mongoose";

const newOrder = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    },
    totalPrice:{
        type:Number
    },
    status:{
        type:String,
        enum:["pending" , "processed" , "completed"],
        default:"pending"
    }
},{
    timestamps:true
})

export const order = mongoose.model("order" , newOrder)
