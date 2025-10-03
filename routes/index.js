import express from "express";
import { authRouter } from "./auth/authRoutes.js";
import { Adminrouter } from "./superAdmin/superAdmin.js";
import { catRouter } from "./categary/categary.js";
import { userRoute } from "./user/userRoutes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/admin", Adminrouter);
router.use("/admin" , catRouter)
router.use("/user" , userRoute)

export default router;
