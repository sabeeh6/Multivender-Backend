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
    image:{

    },
    status:{
        type:String,
        enum:[
            "active" , "inactive"
        ],
        default:"active"
    },
    shopInfo:{
        name :{
            type:String
        },
        description:{
            type:String
        }
    },
    role:{
        type:String,
        enum:[
            "superadmin","supplier","user"
        ],
        default:"user",
    },
    // createdAt:{
    //     type:Date,
    //     default:Date.now
    // },
    // updatedAttedAt:{
    //     type:Date,
    //     default:Date.now
    // },
},{
        timestamps: true

})

export const User = mongoose.model('user' , myUserSchema);
