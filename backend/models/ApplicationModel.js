
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    // User who applied
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Job applied for
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    // Employer who posted the job
    employer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Application status
    status: {
      type: String,
      enum: ["Pending", "Interview", "Selected", "Rejected"],
      default: "Pending",
    },

    // Application submission date
    applied_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// One application per user per job
applicationSchema.index(
  { user_id: 1, job_id: 1 },
  { unique: true }
);

module.exports = mongoose.model("Application", applicationSchema);
