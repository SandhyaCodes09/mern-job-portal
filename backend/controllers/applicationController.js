const Application = require("../models/ApplicationModel");
const Job = require("../models/JobModel");
// const User = require("../models/UserModel");
// const jwt = require("jsonwebtoken");

// =======================================================
// Apply Job
// =======================================================


exports.applyJob = async (req, res) => {
  try {
    // protect middleware has already authenticated the user
    const userId = req.user._id;
    const jobId = req.params.jobId;

    // Only normal users can apply
    if (req.user.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Only job seekers can apply for jobs",
      });
    }

    // Find the selected job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Prevent employers from applying to their own jobs

console.log("Job created_by:", job.created_by);
console.log("Logged-in user ID:", userId);

if (
  job.created_by &&
  job.created_by.toString() === userId.toString()
) {
  return res.status(403).json({
    success: false,
    message: "You cannot apply to your own job",
  });
}

    // Check whether this user has already applied
    const existingApplication = await Application.findOne({
      user_id: userId,
      job_id: job._id,
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Create the application
    const application = await Application.create({
      user_id: userId,
      job_id: job._id,
      employer_id: job.created_by,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Job applied successfully",
      application,
    });
  } catch (error) {
    // Unique index can reject concurrent duplicate requests
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    console.error("Apply job error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to apply for job",
    });
  }
};


/* Get applications for the logged-in employer */
exports.getEmployerApplications = async (req, res) => {
  try {
    const records = await Application.find({
      employer_id: req.user._id,
    })
      .populate("user_id", "first_name last_name name email experience resume")
      .populate("job_id", "title company experience")
      .sort({ applied_at: -1 });

    const applications = records.map((record) => {
      const app = record.toObject();
      const candidate = app.user_id;
      const job = app.job_id;

      const fullName = candidate
        ? `${candidate.first_name || ""} ${candidate.last_name || ""}`.trim()
        : "";

      return {
        ...app,
        user: candidate,
        job: job,
        candidateName: candidate?.name || fullName || "Applicant",
        candidateEmail: candidate?.email || "",
        jobTitle: job?.title || "Job Title",
      };
    });

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Get employer applications error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

/* Update application status */
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Interview",
      "Selected",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    const application = await Application.findOne({
      _id: applicationId,
      employer_id: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error("Update application status error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};

// user get application

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user_id: req.user._id,
    })
      .populate("job_id", "title company location jobType experience")
      .sort({ applied_at: -1 });

    const formattedApplications = applications.map((app) => ({
      _id: app._id,
      status: app.status,
      applied_at: app.applied_at,
      job: app.job_id
        ? {
            _id: app.job_id._id,
            title: app.job_id.title,
            company: app.job_id.company,
            location: app.job_id.location,
            jobType: app.job_id.jobType,
            experience: app.job_id.experience,
          }
        : null,
    }));

    return res.status(200).json({
      success: true,
      totalApplications: formattedApplications.length,
      applications: formattedApplications,
    });
  } catch (error) {
    console.error("Get my applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch your applications",
    });
  }
};

