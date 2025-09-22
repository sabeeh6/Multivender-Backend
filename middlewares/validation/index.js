import { signUpValidationSchema } from "./validation.js"


// export const signUpValidationRequest = (req , res , next) => {
//     const {error} =  signUpValidationSchema.validate(req.body , {abortEarly : false})

//     if (error) {
//         return res.status(400).json({
//             message:"validation error",
//             Error: error.details.map((detail)=>({
//                 field: detail.path.join("."),
//                 message: detail.message,
//             }))
//         })
//     }
//     next();
// }

// ✅ SOLUTION 2: Fix Validation Middleware
export const signUpValidationRequest = (req, res, next) => {
  console.log("🔍 req.body:", req.body);

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

  console.log("✅ Validation passed");
  req.body = result.data;
  next();
};
