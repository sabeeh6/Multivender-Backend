
export const setCookies = (res, token) => {
    const cookieOptions = {
        httpOnly: true, // Prevent XSS attacks
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "strict", // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        path: "/" // Available on all routes
    };
    
    res.cookie("authToken", token, cookieOptions);
};

export const clearCookies = (res) => {
    res.clearCookie("authToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
    });
};