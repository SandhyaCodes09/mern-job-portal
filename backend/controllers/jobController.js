const jwt = require("jsonwebtoken");
const Job = require("../models/JobModel");

// ======================================
// Create Job
// ======================================
const createJob = async (req, res) => {

    try {

        // Get token from cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Logged in employer id
        const employerId = decoded.id;

        // Create new job
            const newJob = await Job.create({

            title: req.body.title,

            company: req.body.company,

            category: req.body.category,

            location: req.body.location,

            salary: req.body.salary,

            experience: req.body.experience,

            jobType: req.body.jobType,

            skills: req.body.skills,

            description: req.body.description,

            created_by: employerId

         });

        res.status(201).json({

            message: "Job created successfully",

            newJob

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};


const getSingleJob = async (req, res) => {

   try {

      const { id } = req.params;

      if (!id) {
         return res.status(400).json({
            message: "Job ID missing"
         });
      }

      const job = await Job.findById(id);

      if (!job) {
         return res.status(404).json({
            message: "Job not found"
         });
      }

      res.status(200).json(job);

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: error.message,
      });

   }
};

// Get All Jobs
const getJobs = async (req, res) => {

   try {

      const jobs = await Job.find();

      res.status(200).json(jobs);

   } catch (error) {

      res.status(500).json({
         message: "Server error",
      });

   }

};



// Get Jobs by Category

const getJobsByCategory = async (req, res) => {

   try {

      const jobs = await Job.find({
         category: req.params.category
      });

      res.status(200).json(jobs);

   } catch (error) {

      res.status(500).json({
         success: false,
         message: error.message,
      });

   }

};

// =======================================
// Get Logged-in Employer Jobs
// =======================================

const getEmployerJobs = async (req, res) => {

    try {

        // Fetch jobs created by logged-in employer
        const jobs = await Job.find({
            created_by: req.user._id
        }).sort({
            createdAt: -1
        });

        res.status(200).json({

            success: true,
            totalJobs: jobs.length,
            jobs

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// =======================================
// Delete Job
// =======================================

const deleteJob = async (req, res) => {

    try {

        // Find job by id
        const job = await Job.findById(req.params.id);

        if (!job) {

            return res.status(404).json({
                message: "Job not found"
            });

        }

        // Check if logged-in employer owns this job
        if (job.created_by.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                message: "Unauthorized"
            });

        }

        // Delete job
        await Job.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,
            message: "Job deleted successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// =======================================
// Update Job
// =======================================

const updateJob = async (req, res) => {

    try {

        // Find job
        const job = await Job.findById(req.params.id);

        if (!job) {

            return res.status(404).json({
                message: "Job not found"
            });

        }

        // Check ownership
        if (job.created_by.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                message: "Unauthorized"
            });

        }

        // Update fields
        job.title = req.body.title;
        job.company = req.body.company;
        job.category = req.body.category;
        job.location = req.body.location;
        job.salary = req.body.salary;
        job.experience = req.body.experience;
        job.jobType = req.body.jobType;
        job.skills = req.body.skills;
        job.description = req.body.description;

        await job.save();

        res.status(200).json({

            success: true,
            message: "Job updated successfully",
            job

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {
   getJobs,
   createJob,
   getSingleJob,
   getJobsByCategory,
   getEmployerJobs,
   deleteJob,
   updateJob   
};


