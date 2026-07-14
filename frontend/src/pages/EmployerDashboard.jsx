import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import EmployerProfileCard from "../components/EmployerProfileCard";
import EmployerStats from "../components/EmployerStats";
import EmployerQuickAction from "../components/EmployerQuickAction";
import EmployerHeader from "../components/EmployerHeader"; 

import {
    getEmployerJobs,
    deleteJob
} from "../services/JobService";

export default function EmployerDashboard() {

    const [jobs, setJobs] = useState([]);

    const [user, setUser] = useState(null);

    useEffect(() => {

        fetchJobs();
        fetchUser();

    }, []);

    // ============================
    // Get Employer
    // ============================

    const fetchUser = async () => {

        try {

            const res = await axios.get(

                "http://localhost:5000/api/auth/me",

                {
                    withCredentials: true
                }

            );

            setUser(res.data.user);

        }

        catch (error) {

            console.log(error);

        }

    };

    // ============================
    // Get Employer Jobs
    // ============================

    const fetchJobs = async () => {

        try {

            const res = await getEmployerJobs();

            setJobs(res.jobs);

        }

        catch (error) {

            console.log(error);

        }

    };

    // ============================
    // Delete Job
    // ============================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this job?"

        );

        if (!confirmDelete) return;

        try {

            await deleteJob(id);

            alert("Job deleted successfully");

            fetchJobs();

        }

        catch (error) {

            console.log(error);

            alert("Something went wrong");

        }

    };

    return (


     <div className="min-h-screen bg-slate-100">

    {/* Heading */}
    {/* <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-8 py-6">
            <h1 className="text-4xl font-bold text-blue-700">
                Employer Dashboard
            </h1>
        </div>
    </div> */}
    <EmployerHeader user={user} notificationCount={1} />
    

    

    {/* Main */}
    <div className="w-full px-8 py-6">

        <div className="grid lg:grid-cols-4 gap-8 items-stretch">

            {/* LEFT PROFILE */}
            <div className="lg:col-span-1">
                <div className="h-full">
                    <EmployerProfileCard user={user} />
                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="lg:col-span-3 flex flex-col gap-8">

                {/* Stats */}
                <EmployerStats
                    totalJobs={jobs.length}
                    activeJobs={jobs.length}
                    totalApplications={0}
                />

                {/* Quick Action */}
                <EmployerQuickAction />

                {/* My Posted Jobs */}
                <div className="bg-white rounded-2xl shadow-lg p-8 flex-1">

                    <h2 className="text-3xl font-bold text-blue-700 mb-8">
                        My Posted Jobs
                    </h2>

                    {
                        jobs.length === 0 ? (
                            <p className="text-gray-500">
                                No Jobs Posted Yet
                            </p>
                        ) : (
                            jobs.map((job) => (
                                <div
                                    key={job._id}
                                    className="border border-gray-200 rounded-xl p-6 mb-6 hover:shadow-lg transition duration-300"
                                >
                                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">

                                        {/* Left */}
                                        <div>
                                            <h3 className="text-2xl font-bold text-blue-700">
                                                {job.title}
                                            </h3>

                                            <p className="text-gray-600 mt-2">
                                                <strong>Company :</strong> {job.company}
                                            </p>

                                            <p className="text-gray-600">
                                                <strong>Category :</strong> {job.category}
                                            </p>

                                            <p className="text-gray-600">
                                                <strong>Location :</strong> {job.location}
                                            </p>

                                            <p className="text-gray-600">
                                                <strong>Experience :</strong> {job.experience}
                                            </p>

                                            <p className="text-gray-600">
                                                <strong>Job Type :</strong>
                                                <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                                    {job.jobType}
                                                </span>
                                            </p>

                                            <p className="mt-3 text-2xl font-bold text-green-600">
                                                ₹ {job.salary}
                                            </p>
                                        </div>

                                        {/* Right */}
                                        <div className="flex gap-3 mt-6 lg:mt-0">
                                            <Link
                                                to={`/edit-job/${job._id}`}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(job._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            ))
                        )
                    }

                </div>

            </div>

        </div>

    </div>

</div>
    
      
    );

}  