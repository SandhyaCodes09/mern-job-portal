const express = require("express");
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    getMe, 
    logoutUser,  
    uploadResume,
    updateProfile
   } = require("../controllers/authController");

const upload = require("../middlewares/uploadResume");

// routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);
router.post("/logout", logoutUser);

//update logged in user's profile
router.put(
  "/update-profile",
  upload.single("resume"),
  updateProfile
);
// router.put("/update-profile", updateProfile);

// Upload Resume

router.post(
   "/upload-resume",
   upload.single("resume"),
   uploadResume
);

module.exports = router;