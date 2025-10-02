import express from "express";
import { getUsers, getUserById, updateUser, delUser, getSuppliers, changeSupplierStatus} from "../../controllers/user/userController.js";
import { authenticateUser, authorizeRoles } from "../../middlewares/user.js";
import { upload } from "../../middlewares/uploads.js";
import { createProduct } from "../../controllers/product/product.js";
import { convertStatus, createOrder, getPendingOrders, getProcessedOrders } from "../../controllers/orders/orderController.js";

export const Adminrouter = express.Router();

Adminrouter.get("/get-Users" ,authenticateUser, authorizeRoles("superadmin") , getUsers)
Adminrouter.get("/get-Suppliers",authenticateUser,authorizeRoles("superadmin"), getSuppliers)
Adminrouter.get("/by-User-Id", getUserById)
Adminrouter.put("/update-User", updateUser)
Adminrouter.delete("/delete-User", delUser)
Adminrouter.put("/change-Status", changeSupplierStatus)

// PRODUCTS

Adminrouter.post('/create-products/:categaryId',authenticateUser ,authorizeRoles("supplier") , upload.array('image',5), createProduct);

// ORDERS

Adminrouter.post("/create-order" ,authenticateUser,authorizeRoles("user") ,  createOrder)
Adminrouter.get("/get-pending-orders" ,authenticateUser,authorizeRoles("supplier") ,  getPendingOrders)
Adminrouter.get("/get-processed-orders" ,authenticateUser,authorizeRoles("supplier") ,  getProcessedOrders)
Adminrouter.put("/change-status",authenticateUser,authorizeRoles("supplier") ,  convertStatus)