import { order } from "../../models/order.js";

export const createOrder = async(req,res) => {
    try {
        const {totalPrice} = req.body
        const newOrder = await order.create()

        return res.status(200).json({
            message:"Order created sucessfully",
            Data:newOrder
        })      
    } catch (error) {
        console.error("Error" , error);
        return res.status(500).json({message:"Interna; server error"})
    }
}

export const getPendingOrders = async(req , res) => {
    try {
        const allOrders = await order.find({status: "pending"});
        if(!allOrders){
            return res.status(400).json({message:"not found"})
        }

        return res.status(200).josn({
            message:"Orders Fetch Sucessfully",
            Data:{
                Toatal: allOrders.Length,
                Orders:allOrders
            }
        })
        
    } catch (error) {
        console.error("Error" , error);
        return res.status(500).josn({message:"Internal server error"})
    }
}

export const getProcessedOrders = async(req , res) => {
    try {
        const allOrders = await order.find({status: "processed"});
        if(!allOrders){
            return res.status(400).json({message:"not found"})
        }

        return res.status(200).josn({
            message:"Orders Fetch Sucessfully",
            Data:{
                Toatal: allOrders.Length,
                Orders:allOrders
            }
        })
        
    } catch (error) {
        console.error("Error" , error);
        return res.status(500).josn({message:"Internal server error"})
    }
}

export const getCompletedOrders = async(req , res) => {
    try {
        const allOrders = await order.find({status: "completed"});
        if(!allOrders){
            return res.status(400).json({message:"not found"})
        }

        return res.status(200).josn({
            message:"Orders Fetch Sucessfully",
            Data:{
                Toatal: allOrders.Length,
                Orders:allOrders
            }
        })
        
    } catch (error) {
        console.error("Error" , error);
        return res.status(500).josn({message:"Internal server error"})
    }
}

export const convertStatus = async(req,res) => {
    try {
        const {status} = req.body
        
    } catch (error) {
        console.error("Error" , error);
        return res.status(500).json({message:"Internal server error"})        
    }
}
