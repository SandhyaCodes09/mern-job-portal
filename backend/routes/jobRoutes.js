const express = require("express");
const router = express.Router();

const {
    getJobs,
    createJob,
    getSingleJob,
    getJobsByCategory,
    getEmployerJobs,
    deleteJob,
    updateJob

} = require("../controllers/jobController");

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

// create job
router.post("/", protect, authorize("employer"), createJob);

// employer jobs
router.get(
    "/employer/jobs",
    protect,
    authorize("employer"),
    getEmployerJobs
);

// get all jobs
router.get("/", getJobs);

// job category
router.get("/category/:category", getJobsByCategory);

// single job
router.get("/:id", getSingleJob);

// update job
router.put(
    "/:id",
    protect,
    authorize("employer"),
    updateJob
);

// delete job
router.delete(
    "/:id",
    protect,
    authorize("employer"),
    deleteJob
);

module.exports = router;