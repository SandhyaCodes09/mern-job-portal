const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const { recompileSchema } = require("../models/UserModel");

// Authentication middleware
exports.protect = async (req, res, next)=>{
    try{
        // Get token from cookies
        const token = req.cookie.token;

        // Check if token exists or not
        if(!token){
            return res.status(401).json({
                msg: "Not authorized, no token found"
            });
        }

        // Verify token 
        const decooded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        req.user = await User.findById(decooded.id).select("-password");

        if (!user){
            return res.status(401).json({
                msg: "Not authorized, user not found"
            }); 
        }

        req.user = user;

        // Move to next middleware
        next();
    } catch (error){
        console.log(error);
        res.status(401).json({
            msg: "Not authorized, token failed"
        });
    }
};

exports.authorize = (...roles) => {
    return(req ,res,next) => {
        
        // check if user role is in allowed roles
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                msg: "Access denied: insufficient permissions"            });
        }
        next();
    }
}
