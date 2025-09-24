import mongoose from "mongoose"

const newCategary = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    createdAt:{},
    updatedAt:{}
})

export const categary = mongoose.model("categary" , newCategary)
