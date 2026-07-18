const express = require("express");
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    getMe, 
    logoutUser,  
    uploadResume,
    updateProfile,

    getEmployerProfile,
    updateEmployerProfile
   } = require("../controllers/authController");

   const { protect, authorize  } = require("../middlewares/authMiddleware");

const upload = require("../middlewares/uploadResume");
const profileUpload = require("../middlewares/profileUpload");

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

router.get(
    "/employer/profile",
    protect,
    authorize("employer"),
    getEmployerProfile
);

router.put(

    "/employer/profile",

    protect,

    authorize("employer"),

    profileUpload.single("companyLogo"),

    updateEmployerProfile

);

module.exports = router;