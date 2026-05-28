const express = require("express");
const router = express.Router();

const {
    getJobs,
    createJob,
    getSingleJob,
    getJobsByCategory
} = require("../controllers/jobController");

// const { protect } = require("../middlewares/authMiddleware");
const {protect, authorize} = require("../middlewares/authMiddleware");  
  
// ===============================
// PROTECTED ROUTE (logged in user only)
// ===============================
router.get("/my-jobs", protect, (req, res) => {
    res.json({
        msg: "Protected route accessed successfully",
        user: req.user
    });
});

// ===============================
// JOB ROUTES
// ===============================

// create job (employer only)
router.post("/", protect, authorize("employer"), createJob);

// get all jobs
router.get("/", getJobs);

// filter by category
router.get("/category/:category", getJobsByCategory);

// single job
router.get("/:id", getSingleJob);

module.exports = router;