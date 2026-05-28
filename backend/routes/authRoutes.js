const express = require("express");
const router = express.Router();
const { 
    registerUser, 
    loginUser, getMe, 
    logoutUser,  
    uploadResume
   } = require("../controllers/authController");

const upload = require("../middlewares/uploadResume");

// routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);
router.post("/logout", logoutUser);

router.post(
   "/upload-resume",
   upload.single("resume"),
   uploadResume
);

module.exports = router;