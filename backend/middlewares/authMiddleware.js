const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

// ======================================
// Authentication Middleware
// ======================================

exports.protect = async (req, res, next) => {

    try {

        // Get token from cookies
        const token = req.cookies.token;

        // Check token
        if (!token) {

            return res.status(401).json({
                msg: "Not authorized, no token found"
            });

        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find logged in user
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {

            return res.status(401).json({
                msg: "User not found"
            });

        }

        // Store user in request
        req.user = user;

        next();

    } catch (error) {

        console.log(error);

        res.status(401).json({
            msg: "Not authorized, token failed"
        });

    }

};

// ======================================
// Role Authorization
// ======================================

exports.authorize = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {

            return res.status(403).json({
                msg: "Access denied"
            });

        }

        next();

    };

};


