const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const path = require("path");

require("dotenv").config();
const connectDB = require("./config/db");


// express app initialization
const app =  express();
const mongoose = require('mongoose');


// ✅ DB connect
connectDB();


// middlewares

// serve uploaded files
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

// json parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

//CORS configuration

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://mern-job-portal-3xium0vyv-sandhya-projects2.vercel.app/"
        ], // frontend URL
        credentials: true, // allow cookies to be sent
    })
);



// routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// job routes
const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

// test route
app.get("/", (req,res) => {
    res.json({ message: "API Running..." });
});

// start server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on port ${port}`));


