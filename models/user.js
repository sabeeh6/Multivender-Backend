import mongoose from "mongoose";

const myUserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:[
            "superadmin","supplier","user"
        ],
        default:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})

export const User = mongoose.model('user' , myUserSchema);
