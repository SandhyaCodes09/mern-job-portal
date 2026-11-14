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
            expiresIn: "7d"
            }
            );


        res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "none",
        secure: true
    });

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


exports.getMe = async (req, res) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                msg: "No token"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        res.status(200).json({
            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg: "Server error"
        });

    }
};


// ===============================
// LOGOUT USER (CLEAR COOKIE) 
// ===============================
exports.logoutUser = async (req, res) => {

    try {

        // Clear token cookie
        res.clearCookie("token",{
            httpOnly: true,
            sameSite: "none",
            secure: true
        });

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

// =======================================
// UPDATE USER PROFILE
// =======================================
// exports.updateProfile = async (req, res) => {
//     try {

//         // Get token from cookie
//         const token = req.cookies.token;

//         if (!token) {
//             return res.status(401).json({
//                 msg: "Unauthorized"
//             });
//         }

//         // Verify token
//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );

//         // Find logged-in user
//         const user = await User.findById(decoded.id);

//         if (!user) {
//             return res.status(404).json({
//                 msg: "User not found"
//             });
//         }

//         // Update only if value is provided
//         user.first_name = req.body.first_name || user.first_name;
//         user.last_name = req.body.last_name || user.last_name;
//         user.phone_no = req.body.phone_no || user.phone_no;
//         user.address = req.body.address || user.address;
//         user.gender = req.body.gender || user.gender;

//         await user.save();

//         // Don't send password back
//         const updatedUser = await User.findById(user._id).select("-password");

//         res.status(200).json({
//             success: true,
//             msg: "Profile updated successfully",
//             user: updatedUser
//         });

//     } catch (error) {

//         console.log(error);

//         res.status(500).json({
//             msg: "Server Error"
//         });

//     }
// };


// ==============================
// Update Logged-in User Profile
// ==============================

exports.updateProfile = async (req, res) => {

    try {

        // Get JWT token from cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                msg: "Unauthorized"
            });
        }

        // Verify JWT token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find logged-in user
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        // =========================
        // Update profile fields
        // =========================

        user.first_name = req.body.first_name || user.first_name;
        user.last_name = req.body.last_name || user.last_name;
        user.phone_no = req.body.phone_no || user.phone_no;
        user.address = req.body.address || user.address;
        user.gender = req.body.gender || user.gender;

        // =========================
        // Update resume (optional)
        // =========================

        if (req.file) {
            user.resume = req.file.filename;
        }

        // Save changes
        await user.save();

        // Fetch updated user without password
        const updatedUser = await User.findById(user._id).select("-password");

        // Send updated data
        res.status(200).json({
            success: true,
            msg: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg: "Server Error"
        });

    }

};

exports.getEmployerProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id).select("-password");

        res.status(200).json({

            success: true,

            user

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.updateEmployerProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "Employer not found"

            });

        }

        user.first_name = req.body.first_name || user.first_name;

        user.last_name = req.body.last_name || user.last_name;

        user.phone_no = req.body.phone_no || user.phone_no;

        user.address = req.body.address || user.address;

        if (req.file) {

            user.profileImage = req.file.filename;

        }

        await user.save();

        res.status(200).json({

            success: true,

            message: "Employer profile updated successfully",

            user

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===============================
// GOOGLE LOGIN CONTROLLER
// ===============================
exports.googleLogin = async (req, res) => {
    try {
        const { email, displayName, photoURL } = req.body;

        if (!email) {
            return res.status(400).json({ msg: "Email is required" });
        }

        // 1. Check if user already exists
        let user = await User.findOne({ email });

        // 2. If user does not exist, register a new user
        if (!user) {
            // Split Google name into first_name and last_name
            const nameParts = (displayName || "Google User").split(" ");
            const first_name = nameParts[0] || "User";
            const last_name = nameParts.slice(1).join(" ") || "";

            user = new User({
                first_name,
                last_name,
                email,
                profileImage: photoURL || "",
                authType: "google",
                role: "user" // default role
            });

            await user.save();
        }

        // 3. Generate JWT Token 
        const token = jwt.sign(
            {
                id: user._id,
                first_name: user.first_name,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 4. Set HTTP-only Cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "none",
            secure: true
        });

        // 5. Send user info back to frontend
        return res.status(200).json({
            msg: "Google Login successful",
            user: {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage
            }
        });

    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(500).json({ msg: "Server error during Google auth" });
    }
};