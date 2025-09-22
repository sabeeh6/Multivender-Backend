import express from "express";
import { signIn, signUp } from "../../controllers/auth/authController.js";
import { signInValidationSRequest, signUpValidationRequest } from "../../middlewares/validation/index.js";
import { getAllUsers, getUserById } from "../../controllers/user/userController.js";

export const router = express.Router();

router.post('/signUp' , [signUpValidationRequest] , signUp)
router.post('/signIn' , [signInValidationSRequest] ,  signIn)

router.get("/get" , getAllUsers)
router.get("/byId" , getUserById)