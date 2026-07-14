const mongoose = require("mongoose");

// Application Schema
const applicationSchema = new mongoose.Schema({

    // User who applied
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Job that user applied for
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },

    // Employer who posted the job
    employer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Current application status
    status: {
        type: String,
        enum: ["Pending", "Interview", "Selected", "Rejected"],
        default: "Pending"
    },

    // Date when application was submitted
    applied_at: {
        type: Date,
        default: Date.now
    }

});

// Export model
module.exports = mongoose.model(
    "Application",
    applicationSchema
);