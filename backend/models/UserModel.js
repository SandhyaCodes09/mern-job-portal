const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: true 
    },
    last_name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    phone_no: { 
        type: String, 
        required: true, 
        unique: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    gender: { 
        type: String, 
        enum: ["male", "female", "other"], 
        required: true 
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6 
    },
    role: { 
        type: String, 
        enum: ["admin", "user", "employer"], 
        default: "user" 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;