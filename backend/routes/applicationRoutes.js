
const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/authMiddleware");

const {
  applyJob,
  getEmployerApplications,
  updateApplicationStatus,
  getMyApplications,
} = require("../controllers/applicationController");

// Job seeker applies for a job
router.post("/:jobId", protect, authorize("user"), applyJob);

// Employer views applications for their jobs
router.get(
  "/employer",
  protect,
  authorize("employer"),
  getEmployerApplications
);

// Employer updates an application's status
router.put(
  "/employer/:applicationId",
  protect,
  authorize("employer"),
  updateApplicationStatus
);

router.get("/my-applications", protect, authorize("user"), getMyApplications);

module.exports = router;
