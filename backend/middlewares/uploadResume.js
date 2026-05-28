const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({

    // Folder where files will be stored
    destination: (req, file, cb) => {

        cb(null, "./uploads/resumes");

    },

    // Generate unique filename
    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );

    },

});

// File filter
const fileFilter = (req, file, cb) => {

    const allowedTypes = [

        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(
            new Error("Only PDF/DOC/DOCX files are allowed"),
            false
        );

    }

};

// Multer upload config
const upload = multer({

    storage: storage,

    fileFilter: fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }

});

module.exports = upload;