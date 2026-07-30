import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Briefcase, Plus, TrendingUp, Sparkles, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

import EmployerProfileCard from "../../components/employer/EmployerProfileCard";
import EmployerStats from "../../components/employer/EmployerStats";
import EmployerQuickAction from "../../components/employer/EmployerQuickAction";
import EmployerNavbar from "../../components/employer/EmployerNavbar";
import EmployerFooter from "../../components/employer/EmployerFooter";

import { getEmployerJobs } from "../../services/JobService";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });
      setUser(res.data.user || res.data);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await getEmployerJobs();
      const jobList = res.jobs || res || [];
      setJobs(jobList);
    } catch (error) {
      console.log("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Metrics
  const totalJobsCount = jobs.length;
  const activeJobsCount = jobs.filter((j) => (j.status ? j.status === "active" : true)).length;
  const totalApplicationsCount = jobs.reduce((acc, job) => {
    return acc + (job.applications?.length || job.applicationCount || 0);
  }, 0);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans w-full overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      <EmployerNavbar />

      {/* Hero Welcome Banner (Deep Gradient Accent) */}
      <div className="w-full relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-900 border-b border-indigo-800 py-10 px-6 md:px-12 shadow-lg">
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold mb-1 tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span>Employer Control Center</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Welcome back,{" "}
              <span className="text-cyan-300 capitalize">
                {user?.name || `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || "Employer"}
              </span>{" "}
              👋
            </h1>
            <p className="text-blue-100 text-sm mt-1 font-normal">
              Manage your job postings, track applications, and hire top talent seamlessly.
            </p>
          </div>

          <Link
            to="/employer/create-job"
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-700 hover:bg-blue-50 font-bold text-sm shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 text-indigo-700 transition-transform group-hover:rotate-90" />
            Post New Job
          </Link>
        </div>
      </div>

      {/* Main Content Dashboard Area */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full px-4 md:px-10 py-8 flex-1"
      >
        <div className="grid lg:grid-cols-4 gap-8 items-start w-full">
          
          {/* Left Profile Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <EmployerProfileCard user={user} />
          </motion.div>

          {/* Right Main Section */}
          <div className="lg:col-span-3 flex flex-col gap-8 w-full">
            
            {/* Dynamic Stats */}
            <motion.div variants={itemVariants}>
              <EmployerStats
                totalJobs={totalJobsCount}
                activeJobs={activeJobsCount}
                totalApplications={totalApplicationsCount}
              />
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <EmployerQuickAction
                totalJobs={totalJobsCount}
                totalApplications={totalApplicationsCount}
              />
            </motion.div>

            {/* Recent Job Listings (Crisp White Card) */}
            <motion.div
              variants={itemVariants}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Recent Job Listings</h2>
                    <p className="text-xs text-slate-500">Overview of your active hiring posts</p>
                  </div>
                </div>

                {jobs.length > 0 && (
                  <Link
                    to="/employer/jobs"
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
                  >
                    View All <TrendingUp className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12 text-slate-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-10 px-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
                  <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-700 font-semibold">No jobs posted yet</p>
                  <p className="text-xs text-slate-500 mt-1 mb-4">
                    Create your first job post to start receiving candidate applications.
                  </p>
                  <Link
                    to="/employer/create-job"
                    className="inline-flex items-center gap-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md shadow-indigo-200"
                  >
                    <Plus className="w-4 h-4" /> Post Job Now
                  </Link>
                </div>
              ) : (
                <div className="grid gap-3">
                  {jobs.slice(0, 3).map((job) => (
                    <motion.div
                      key={job._id || job.id}
                      whileHover={{ scale: 1.003, x: 2 }}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-indigo-300 transition-all flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm">{job.title || job.jobTitle}</h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                          <span>{job.location || "Remote"}</span>
                          <span>•</span>
                          <span className="text-emerald-600 font-semibold">{job.jobType || job.type || "Full-time"}</span>
                          <span>•</span>
                          <span className="text-indigo-600 font-medium">
                            {job.applications?.length || job.applicationCount || 0} Applications
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/employer/job/${job._id || job.id}`}
                        className="text-xs font-semibold bg-white hover:bg-slate-100 text-indigo-700 px-4 py-2 rounded-xl border border-slate-200 transition-colors shadow-xs"
                      >
                        Manage
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <EmployerFooter />
    </div>
  );
}