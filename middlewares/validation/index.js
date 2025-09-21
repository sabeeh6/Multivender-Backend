import { signUpValidationSchema } from "./validation.js"


export const signUpValidationRequest = (req , res , next) => {
    const {error} =  signUpValidationSchema.validate(req.body , {abortEarly : false})

    if (error) {
        return res.status(400).json({
            message:"validation error",
            Error: error.details.map((detail)=>({
                field: detail.path.join("."),
                message: detail.message,
            }))
        })
    }
    next();
}