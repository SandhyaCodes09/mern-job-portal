import axios from "axios";

const API_URL = "http://localhost:5000/api/jobs";


// Create new job API
export const createJob = async (jobData) => {

    const res = await axios.post(
        API_URL,
        jobData,
        {
            withCredentials: true
        }
    );

    return res.data;

};


// ======================================
// Get Logged-in Employer Jobs
// ======================================

export const getEmployerJobs = async () => {

    const res = await axios.get(

        "http://localhost:5000/api/jobs/employer/jobs",

        {
            withCredentials: true
        }

    );

    return res.data;

};

// ======================================
// Delete Job
// ======================================

export const deleteJob = async (id) => {

    const res = await axios.delete(

        `http://localhost:5000/api/jobs/${id}`,

        {
            withCredentials: true
        }

    );

    return res.data;

};

// ======================================
// Update Job
// ======================================

export const updateJob = async (id, jobData) => {

    const res = await axios.put(

        `http://localhost:5000/api/jobs/${id}`,

        jobData,

        {
            withCredentials: true
        }

    );

    return res.data;

};