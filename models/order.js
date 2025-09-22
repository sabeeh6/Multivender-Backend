import mongoose from "mongoose";

const newOrder = new mongoose.Schema({
    status:{
        type:String
    }
})

export const order = mongoose.model("order" , newOrder)
