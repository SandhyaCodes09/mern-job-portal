const express = require("express");
const router = express.Router();
const{getJobs, createJob, getSingleJob}  = require("../controllers/jobController");

router.post("/", createJob);
router.get("/" , getJobs);
router.get("/category/:category", getJobsByCategory);
router.get("/:_id" , getSingleJob);

module.exports = router;