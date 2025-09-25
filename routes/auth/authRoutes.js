import express from "express";
import { signIn, signUp } from "../../controllers/auth/authController.js";
import { signInValidationSRequest, signUpValidationRequest } from "../../middlewares/validation/index.js";

export const authRouter = express.Router();

authRouter.post("/signUp", signUpValidationRequest, signUp);
authRouter.post("/signIn", signInValidationSRequest, signIn);
