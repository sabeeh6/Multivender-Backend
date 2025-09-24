import mongoose from "mongoose";

const newOrder = new mongoose.Schema({
    userId:{

    },
    productId:{

    },
    totalPrice:{

    },
    status:{
        type:String
    }
})

export const order = mongoose.model("order" , newOrder)
