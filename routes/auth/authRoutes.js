import express from "express";
import { signIn, signUp } from "../../controllers/authController.js";
import { signUpValidationRequest } from "../../middlewares/validation/index.js";

export const router = express.Router();

router.post('/signUp' , [signUpValidationRequest] , signUp)
router.post('/signIn' , signIn)
