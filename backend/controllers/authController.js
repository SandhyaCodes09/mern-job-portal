const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===============================
// REGISTER USER
// ===============================
exports.registerUser = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const {
            first_name,
            last_name,
            email,
            phone_no,
            address,
            gender,
            password,
            role
        } = req.body;

        // check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // set default role
        let userRole = "user";
        if (role === "employer") {
            userRole = "employer";
        }

        // create new user
        const user = new User({
            first_name,
            last_name,
            email,
            phone_no,
            address,
            gender,
            password: hashedPassword,
            role: userRole
        });

        await user.save();

        res.status(201).json({
            msg: "User registered successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
};


// ===============================
// LOGIN USER (COOKIE AUTH)
// ===============================
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // create JWT token (store id + role)
            const token = jwt.sign(
            {
            id: user._id,
            first_name: user.first_name,
            role: user.role
            },
            process.env.JWT_SECRET,
            {
            expiresIn: "1h"
            }
            );

        // SEND TOKEN IN HTTP ONLY COOKIE (secure way)
        res.cookie("token", token, {
            httpOnly: true,        // JS access nahi kar sakta
            secure: false,         // production me true (https)
            sameSite: "lax",       // CSRF protection basic
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        // send user data in response

        // res.status(200).json({
        //     success: true,
        //     user:{
        //         name: user.first_name + " " + user.last_name,
        //         email: user.email,
        //         role: user.role
        //     }

        // });

        // send safe user data (NO password)
        res.json({
            msg: "Login successful",
            user: {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
};

//==============================// 
// GET CURRENT USER (FROM TOKEN)    
//==============================//

exports.getMe = async (req,res) => {
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({
                msg: "No token, authorization denied"
            })
        } 

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        res.json({
            user:{
                id: decoded.id,
                first_name: decoded.first_name,
                role: decoded.role,
                resume: decoded.resume  
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }   
};


// ===============================
// LOGOUT USER (CLEAR COOKIE) 
// ===============================
exports.logoutUser = async (req, res) => {

    try {

        // Clear token cookie
        res.clearCookie("token");

        res.json({
            msg: "Logout successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg: "Server error"
        });

    }

};

// ===============================
// UPLOAD RESUME
// ===============================
exports.uploadResume = async (req, res) => {

   try {

      // Get token from cookie
      const token = req.cookies.token;

      if (!token) {

         return res.status(401).json({
            msg: "Unauthorized"
         });

      }

      // Verify token
      const decoded = jwt.verify(
         token,
         process.env.JWT_SECRET
      );

      // Find user
      const user = await User.findById(decoded.id);

      if (!user) {

         return res.status(404).json({
            msg: "User not found"
         });

      }

      // Save resume path
      user.resume = req.file.filename;

      await user.save();

      res.json({
         msg: "Resume uploaded successfully",
         resume: user.resume
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         msg: "Server error"
      });

   }

};