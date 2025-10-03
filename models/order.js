import mongoose from "mongoose";

const newOrder = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    item: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            supplierId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "processed", "completed"],
        default: "pending"
    }
}, {
    timestamps: true
});

export const order = mongoose.model("order", newOrder);
