import { signInValidationSchema, signUpValidationSchema } from "./validation.js"

// ✅ SOLUTION 2: Fix Validation Middleware
export const signUpValidationRequest = (req, res, next) => {
  const result = signUpValidationSchema.safeParse(req.body);

  if (!result.success) {
    console.log("❌ Validation failed:", result.error.issues);

    // ✅ Fix: Use result.error.issues instead of result.error.errors
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
      code: err.code
    }));

    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors
    });
  }
  next();
};

export const signInValidationSRequest = (req,res,next) =>{
    const {error} = signInValidationSchema.safeParse(req.body)

    if (error) {
        return res.status(400).json({
            message:"Validation error",
            Error: error.issues.map(err =>({
                field:err.path.join("."),
                message:err.message
            }))
        })
    }
    next()
}
