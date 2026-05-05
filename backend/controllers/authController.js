const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register user
exports.registerUser = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        const { first_name, last_name, email, phone_no, address, gender, password, role } = req.body;

        //check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user

        let userRole = "user"; // default role
        if(role === "employer"){
            userRole = "employer";
        }

        user = new User({
            first_name,
            last_name,
            email,
            phone_no,
            address,
            gender,
            password: hashedPassword,
            role: userRole
        })

        await user.save();

        res.json({ msg: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
};

//login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        //create and return JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            msg: "Login successful",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};