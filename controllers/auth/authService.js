import jwt  from "jsonwebtoken";

export const createToken = (userId) => {
    if (!process.env.JWT_PEIVATE_KEY_321) {
        throw new error("Private key is missing")
    }
    try {
        return jwt.sign({id:userId} , process.env.JWT_PEIVATE_KEY_321 , {expiresIn: "1d"})
    } catch (error) {
        console.error("Token error" , error );        
    }
}