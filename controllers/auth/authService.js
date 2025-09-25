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

export const verifyToken = (token) => {
    if (!process.env.JWT_PRIVATE_KEY_321) {
        throw new Error("JWT Private key is missing");
    }
    
    try {
        return jwt.verify(token, process.env.JWT_PRIVATE_KEY_321);
    } catch (error) {
        console.error("Token verification error:", error);
        throw new Error("Invalid or expired token");
    }
};
