
export const getAllOrders = async(req , res) => {
    try {
        const allOrders = await orders.find();
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