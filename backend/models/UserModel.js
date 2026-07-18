const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
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

        resume: {
            type: String,
            default: ""
        },

        profileImage: {
            type: String,
            default: ""
        },


    // Employer Fields yahin add honge

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
        },

        profileImage:{
        type:String,
        default:""
        },

    },
    {
        timestamps: true
    });

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;