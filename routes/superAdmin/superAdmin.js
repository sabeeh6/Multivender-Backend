import express from "express";
import { getUsers, getUserById, updateUser, delUser, getSuppliers, changeStatus} from "../../controllers/user/userController.js";

export const Adminrouter = express.Router();

Adminrouter.get("/get-Users", getUsers)
Adminrouter.get("/get-Suppliers", getSuppliers)
Adminrouter.get("/by-User-Id", getUserById)
Adminrouter.put("/update-User", updateUser)
Adminrouter.delete("/delete-User", delUser)
Adminrouter.put("/change-Status", changeStatus)
