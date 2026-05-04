const express = require('express');
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");


// express app initialization
const app =  express();
const mongoose = require('mongoose');

// ✅ DB connect
connectDB();


// middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json

// routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req,res) => {
    // res.send("Api Running");
    res.json({ message: "API Running..." });
});

// start server
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on port ${port}`));


// mongoose.connect("mongodb+srv://Sandhya09:Sandhya123@cluster0.m1tj13n.mongodb.net/?appName=Cluster0.m1tj13n.mongodb.net/jobportal")
//   .then(() =>console.log("Connected to MongoDB"))
//   .catch(err => console.log(err));

