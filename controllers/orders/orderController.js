import { readonly, success } from "zod";
import { sendEmail } from "../../middlewares/sendEmail.js";
import { order } from "../../models/order.js";
import { products } from "../../models/product.js";

// Create Order Controller
export const createOrder = async (req, res) => {
    try {
        console.log("========== Order Creation Started ==========");
        
        const { items } = req.body;
        const userId = req.user.id;
        
        console.log("User ID:", userId);
        console.log("Requested Items:", JSON.stringify(items, null, 2));

        // Validation - Check if items exist
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Items array is required and must not be empty"
            });
        }

        // Validate each item has required fields
        for (const item of items) {
            if (!item.productId || !item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: "Each item must have productId and quantity"
                });
            }

            if (item.quantity < 1) {
                return res.status(400).json({
                    success: false,
                    message: "Quantity must be at least 1"
                });
            }
        }

        // Fetch product details and calculate prices
        const enrichedItems = await Promise.all(
            items.map(async (item) => {
                const product = await products.findById(item.productId)
                    .populate("supplierId", "email name")
                    .select('price supplierId name')
                    .lean();

                if (!product) {
                    throw new Error(`Product not found with ID: ${item.productId}`);
                }

                if (!product.price || product.price <= 0) {
                    throw new Error(`Invalid price for product: ${product.name || item.productId}`);
                }

                if (!product.supplierId) {
                    throw new Error(`Supplier not found for product: ${product.name || item.productId}`);
                }

                const itemTotal = product.price * item.quantity;

                console.log(`\n--- Product: ${product.name || item.productId} ---`);
                console.log(`Product ID: ${item.productId}`);
                console.log(`Price per unit: ${product.price}`);
                console.log(`Quantity: ${item.quantity}`);
                console.log(`Supplier Email: ${product.supplierId.email}`);
                console.log(`Supplier ID: ${product.supplierId._id}`);
                console.log(`Item Total: ${itemTotal}`);

                return {
                    productId: item.productId,
                    productName: product.name,
                    quantity: item.quantity,
                    price: product.price,
                    supplierId: product.supplierId._id,
                    supplierEmail: product.supplierId.email,
                    supplierName: product.supplierId.name
                };
            })
        );

        // Calculate total price
        const totalPrice = enrichedItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        console.log("\n========== Price Calculation ==========");
        console.log("Total Price:", totalPrice);

        // Create order data
        const orderData = {
            userId,
            item: enrichedItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                supplierId: item.supplierId
            })),
            totalPrice,
            status: "pending"
        };

        // Save order to database
        const newOrder = await order.create(orderData);

        console.log("\n========== Order Created Successfully ==========");
        console.log("Order ID:", newOrder._id);

        // Group items by supplier to send one email per supplier
        const supplierOrders = enrichedItems.reduce((acc, item) => {
            const supplierIdStr = item.supplierId.toString();
            
            if (!acc[supplierIdStr]) {
                acc[supplierIdStr] = {
                    email: item.supplierEmail,
                    name: item.supplierName,
                    items: []
                };
            }
            
            acc[supplierIdStr].items.push({
                productName: item.productName,
                quantity: item.quantity,
                price: item.price,
                itemTotal: item.price * item.quantity
            });
            
            return acc;
        }, {});

        // Send email to each supplier
        console.log("\n========== Sending Emails to Suppliers ==========");
        
        const emailPromises = Object.values(supplierOrders).map(async (supplierOrder) => {
            const itemsHTML = supplierOrder.items.map(item => `
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">${item.productName}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${item.quantity}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Rs. ${item.price}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">Rs. ${item.itemTotal}</td>
                </tr>
            `).join('');

            const supplierTotal = supplierOrder.items.reduce((sum, item) => sum + item.itemTotal, 0);

            const emailBody = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #4CAF50;">🎉 New Order Received!</h1>
                    <p>Dear ${supplierOrder.name || 'Supplier'},</p>
                    <p>Great news! A new order has been placed for your products.</p>
                    
                    <h3>Order Details:</h3>
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <thead>
                            <tr style="background-color: #f2f2f2;">
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Product</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Quantity</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Price</th>
                                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHTML}
                        </tbody>
                        <tfoot>
                            <tr style="background-color: #f9f9f9; font-weight: bold;">
                                <td colspan="3" style="padding: 10px; border: 1px solid #ddd; text-align: right;">Total Amount:</td>
                                <td style="padding: 10px; border: 1px solid #ddd;">Rs. ${supplierTotal}</td>
                            </tr>
                        </tfoot>
                    </table>
                    
                    <p><strong>Order ID:</strong> ${newOrder._id}</p>
                    <p>Please prepare these items for shipment.</p>
                    
                    <p style="margin-top: 30px; color: #666;">
                        Best regards,<br>
                        Your Marketplace Team
                    </p>
                </div>
            `;

            console.log(`Sending email to: ${supplierOrder.email}`);
            
            await sendEmail(
                supplierOrder.email,
                `New Order Received - Order #${newOrder._id.toString().slice(-6)}`,
                emailBody
            );

            console.log(`✅ Email sent successfully to: ${supplierOrder.email}`);
        });

        // Wait for all emails to be sent
        await Promise.all(emailPromises);

        console.log("\n========== All Emails Sent Successfully ==========");

        return res.status(201).json({
            success: true,
            message: "Order created successfully and suppliers notified",
            data: {
                orderId: newOrder._id,
                userId: newOrder.userId,
                items: newOrder.item,
                totalPrice: newOrder.totalPrice,
                status: newOrder.status,
                createdAt: newOrder.createdAt
            }
        });

    } catch (error) {
        console.error("\n========== Error Creating Order ==========");
        console.error("Error:", error.message);
        console.error("Stack:", error.stack);

        // Handle specific errors
        if (error.message.includes('Product not found')) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        if (error.message.includes('Supplier not found') || error.message.includes('Invalid price')) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                error: error.message
            });
        }

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const getPendingOrders = async(req , res) => {
    try {
        const allOrders = await order.find({status: "pending"});
        if(!allOrders){
            return res.status(400).json({message:"not found"})
        }

        return res.status(200).json({
            message:"Orders Fetch Sucessfully",
            // Length:,
            Data:{
                TotalPendingOrders: allOrders.length,
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
        if(!allOrders.length || !allOrders){
            return res.status(400).json({message:"Orders not found"})
        }

        return res.status(200).json({
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
        const {orderId} = req.body
        const {id} = req.user
        const ok = id.role
        console.log(req.user.role);
        
        const orderExist = await order.findById(orderId)
        // console.log(orderExist);
        let newStatus;
        if (req.user.role == "supplier") {   
             newStatus = await order.findByIdAndUpdate(orderId ,{status:"processed" }  , {new:true})
        }
        if (req.user.role == "superadmin") {   
             newStatus = await order.findByIdAndUpdate(orderId ,{status:"completed" }  , {new:true})
        }
        console.log("newStatus " , newStatus);

        return res.status(200).json({
            success:true,
            message:"Status convert sucessfully",
            Data:newStatus
        })
        
        
    } catch (error) {
        console.error("Error" , error);
        return res.status(500).json({message:"Internal server error"})        
    }
}

export const cancelOrder = async(req,res) =>{
    try {
        const {id} = req.user
        const {} = req.body

        return res.status(200).json({
            message:"Order canceled successfully"
        })
        
    } catch (error) {
        console.error("Error" , error.message);
        return res.status(500).json({message:"Internal server error"})
    }
}
