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

const getSingleJob = async (req ,res)=>{
   try{
      const job = await Job.findById(req.params._id);
      
      res.status(200).json(job);

   } catch (error) {

      res.status(500).json({
         message: error.message,
      });
   }
}

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





module.exports = {
   getJobs,
   createJob,
   getSingleJob,
};

