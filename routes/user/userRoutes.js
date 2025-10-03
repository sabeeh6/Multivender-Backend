import express from "express"
import { createReview } from "../../controllers/reviews/reviewsController.js"
import { authenticateUser, authorizeRoles } from "../../middlewares/user.js"


export const userRoute = express.Router()

userRoute.post("/create-review" , authenticateUser , authorizeRoles("user") , createReview)
