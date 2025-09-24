import express from "express";
import { signIn, signUp } from "../../controllers/auth/authController.js";
import { signInValidationSRequest, signUpValidationRequest } from "../../middlewares/validation/index.js";
import { getUsers, getUserById, updateUser, delUser, getSuppliers, changeStatus } from "../../controllers/user/userController.js";

export const router = express.Router();

router.post('/signUp' , [signUpValidationRequest] , signUp)
router.post('/signIn' , [signInValidationSRequest] ,  signIn)

router.get("/get-Users" , getUsers)
router.get("/get-Suppliers" , getSuppliers)
router.get("/by-User-Id" , getUserById)
router.put("/update-User" , updateUser)
router.delete("/delete-User" , delUser )
router.put("/change-Status" , changeStatus)