import jwt from "jsonwebtoken";
// import { verifyToken } from "../controllers/auth/authService.js";
import { User } from "../models/user.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies?.authToken;
    
    if (!token){
        return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }
    
    // console.log("env" , process.env.JWT_PEIVATE_KEY_321);
    const decoded = jwt.verify(token, process.env.JWT_PEIVATE_KEY_321);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(401).json({ success: false, message: "Access denied. User not found." });
    if (["banned", "inactive"].includes(user.status))
      return res.status(403).json({ success: false, message: "Access denied. Account is inactive." });

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err.message);
    res.clearCookie("authToken"); // token clear
    return res.status(401).json({ success: false, message: "Access denied. Invalid or expired token." });
  }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // console.log("User",req.user);
        
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Access denied. You are not ${roles.join(", ")}`
            });
        }
        
        next();
    };
}

export const optionalAuth = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        
        if (token) {
            const decoded = verifyToken(token);
            const user = await User.findById(decoded.id).select("-password");
            
            if (user && user.status === "active") {
                req.user = user;
            }
        }
        
        next(); // Continue regardless of token validity
        
    } catch (error) {
        // Just continue without user if token is invalid
        next();
    }
}
                                  