const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true
        },

        last_name: {
            type: String,
            default: ""
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please Enter Valid Email']
        },

        phone_no: {
            type: String,
            default: ""
        },

        address: {
            type: String,
            default: "", 
        },

        gender: {
            type: String,
            enum: ["male", "female", "other", ""],
            default: ""
        },

        password: {
            type: String,
            default: "" ,
        },

        role: {
            type: String,
            enum: ["admin", "user", "employer"],
            default: "user"
        },

        authType: {
            type: String,
            enum: ["local", "google"],
            default: "local"
        },

        resume: {
            type: String,
            default: ""
        },

        profileImage: {
            type: String,
            default: ""
        },

        // Employer Fields
        companyName: {
            type: String,
            default: ""
        },

        companyWebsite: {
            type: String,
            default: ""
        },

        linkedin: {
            type: String,
            default: ""
        },

        industry: {
            type: String,
            default: ""
        },

        companySize: {
            type: String,
            default: ""
        },

        foundedYear: {
            type: String,
            default: ""
        },

        aboutCompany: {
            type: String,
            default: ""
        },

        companyLogo: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
