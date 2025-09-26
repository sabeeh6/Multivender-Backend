import express from "express";
import { signIn, signOut, signUp } from "../../controllers/auth/authController.js";
import { signInValidationSRequest, signUpValidationRequest } from "../../middlewares/validation/index.js";
import { authenticateUser } from "../../middlewares/user.js";

export const authRouter = express.Router();

authRouter.post("/signUp" ,  signUpValidationRequest, signUp);
authRouter.post("/signIn", signInValidationSRequest, signIn);
authRouter.post("/sign-out", signOut);
