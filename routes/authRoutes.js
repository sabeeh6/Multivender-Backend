import express from "express";
import { signIn, signUp } from "../controllers/authController.js";

export const router = express.Router();

router.post('/signUp' , signUp)
router.post('/signIn' , signIn)
