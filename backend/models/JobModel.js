const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({

    // Job title
    title: {
        type: String,
        required: true,
    },

    // Company name
    company: {
        type: String,
        required: true,
    },

    // Job category
    category: {
        type: String,
        required: true,
    },

    // Job location
    location: {
        type: String,
        required: true,
    },

    // Salary (Annual CTC)
    salary: {
        type: Number,
        required: true,
    },

    // Experience required
    experience: {
        type: String,
        required: true,
    },

    // Job type
    jobType: {
        type: String,
        enum: ["Full Time", "Part Time", "Internship", "Remote"],
        required: true,
    },

    // Required skills
    skills: {
        type: [String],
        default: [],
    },

    // Job description
    description: {
        type: String,
        required: true,
    },

    // Employer who created this job
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, {
    timestamps: true,
});

module.exports = mongoose.model("Job", jobSchema);