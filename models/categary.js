import mongoose from "mongoose"

const newCategary = new mongoose.Schema({
    name:{
        type:String
    }
})

export const categary = mongoose.model("categary" , newCategary)
