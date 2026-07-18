import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import EmployerProfileCard from "../../components/employer/EmployerProfileCard";
import EmployerStats from "../../components/employer/EmployerStats";
import EmployerQuickAction from "../../components/employer/EmployerQuickAction";
// import EmployerHeader from "../../components/employer/EmployerHeader";
import EmployerNavbar from "../../components/employer/EmployerNavbar";
import EmployerFooter from "../../components/employer/EmployerFooter";

import { getEmployerJobs, deleteJob } from "../../services/JobService";

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
          withCredentials: true,
        },
      );

      setUser(res.data.user);
    } catch (error) {
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
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // Delete Job
  // ============================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(id);

      alert("Job deleted successfully");

      fetchJobs();
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* <EmployerHeader user={user} notificationCount={1} /> */}
      <EmployerNavbar />

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
          </div>
        </div>
      </div>

      <EmployerFooter />
    </div>
  );
}
