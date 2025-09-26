import express from "express";
import { getUsers, getUserById, updateUser, delUser, getSuppliers, changeStatus} from "../../controllers/user/userController.js";
import { authenticateUser, authorizeRoles } from "../../middlewares/user.js";

export const Adminrouter = express.Router();

Adminrouter.get("/get-Users" ,authenticateUser, authorizeRoles("superadmin") , getUsers)
Adminrouter.get("/get-Suppliers",authenticateUser,authorizeRoles("superadmin"), getSuppliers)
Adminrouter.get("/by-User-Id", getUserById)
Adminrouter.put("/update-User", updateUser)
Adminrouter.delete("/delete-User", delUser)
Adminrouter.put("/change-Status", changeStatus)
