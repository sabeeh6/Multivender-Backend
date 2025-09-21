// import Joi from "joi";

// export const signUpValidationSchema = Joi.object({
//     name:Joi.string()
//     .required()
//     .label("Name")
//     .messages({
//         "any.required" : "Name is required"
//     }),
//     email:Joi.string()
//     .email()
//     .required()
//     .label("Email")
//     .messages({
//         "any.reuired" : "Email is required",
//         "string.email" : "Emai is not valid"
//     }),
//     password:Joi.string()
//     .min(8)
//     .required()
//     .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
//     .messages({
//         "any.required" : "Password is required",
//         "string.min" : "At least 8 characters are reqiured",
//         "string.pattern.base" : "Paaword must contain at leat one uppercase ,one lowercase , one specia; character and one number"
//     })
// })
import * as z from "zod";

export const signUpValidationSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Email is not valid"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "At least 8 characters are required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase, one lowercase, one special character, and one number"
    ),
});
