const Job = require("../models/jobModel");


// Create Job
const createJob = async (req, res) => {

   try {

      console.log(req.body);

      const newJob = await Job.create(req.body);

      res.status(201).json({
         message: "Job created successfully",
         newJob,
      });

   } catch (error) {

      res.status(500).json({
         message: error.message,
      });

   }

};

// get single job

// const getSingleJob = async (req ,res)=>{
//    try{

//          console.log(req.params);

//       const job = await Job.findById(req.params.id);
      
//       res.status(200).json(job);

//    } catch (error) {
      
//       console.error(error);
//       res.status(500).json({
//          message: error.message,
//       });
//    }
// }

// const getSingleJob = async (req, res) => {

//    try {

//       console.log("PARAM ID:", req.params.id);

//       const job = await Job.findById(req.params.id);

//       console.log("JOB:", job);

//       res.status(200).json(job);

//    } catch (error) {

//       console.log("ERROR:", error);

//       res.status(500).json({
//          message: error.message,
//       });

//    }

// };

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

module.exports = {
   getJobs,
   createJob,
   getSingleJob,
   getJobsByCategory
};


