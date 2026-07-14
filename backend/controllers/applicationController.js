const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// =======================================================
// Apply Job
// =======================================================

exports.applyJob = async (req, res) => {

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

        // Logged in user id
        const userId = decoded.id;

        // Job id from URL
        const jobId = req.params.jobId;

        // Find job
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                msg: "Job not found"
            });
        }

        // Check if already applied
        const alreadyApplied = await Application.findOne({
            user_id: userId,
            job_id: jobId
        });

        if (alreadyApplied) {
            return res.status(400).json({
                msg: "You have already applied for this job"
            });
        }

        // Create application
        const application = await Application.create({

            user_id: userId,

            job_id: job._id,

            employer_id: job.created_by,

            status: "Pending"

        });

        res.status(201).json({

            msg: "Job applied successfully",

            application

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            msg: "Server error"

        });

    }

};