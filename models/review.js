import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
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
    rating:{
        type:Number,
        min:1,
        max:2
    },
    description:{
        type:String,
    }
},{
    timestamps:true
})

export const review = mongoose.model("reviews" , reviewSchema)
