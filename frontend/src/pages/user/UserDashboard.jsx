import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Bell,
  Heart,
  Briefcase,
  User,
  ChevronDown,
  Menu,
  X,
  UserCheck,
  MapPin,
  Building2,
  Clock,
  ArrowRight,
  LogOut,
} from "lucide-react";

import { roleLabel } from "../../utils/RoleLabel";

const API_URL = (
  process.env.REACT_APP_API_URL || "https://job-frame.onrender.com"
).replace(/\/+$/, "") + "/api";

export default function UserDashboard() {
  const navigate = useNavigate();

  // User and menu states
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Application states
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [applicationsError, setApplicationsError] = useState("");

  // Recommended jobs
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  // Saved jobs count is not connected until its API is confirmed
  // const [savedJobsCount, setSavedJobsCount] = useState(null);
  const [savedJobsCount] = useState(null);

  const appliedJobsCount = applications.length;

  const interviewsCount = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  // Fetch logged-in user
  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/auth/me`,
          { withCredentials: true }
        );

        if (!cancelled) {
          setUser(response.data?.user || response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);

        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setUserLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch applications made by the logged-in user
  useEffect(() => {
    let cancelled = false;

    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/applications/my-applications`,
          { withCredentials: true }
        );

        if (!cancelled) {
          setApplications(response.data?.applications || []);
          setApplicationsError("");
        }
      } catch (error) {
        console.error(
          "Error fetching applications:",
          error.response?.data || error.message
        );

        if (!cancelled) {
          setApplicationsError(
            "Applications could not be loaded. Please try again."
          );
        }
      } finally {
        if (!cancelled) {
          setApplicationsLoading(false);
        }
      }
    };

    fetchApplications();

    // Refresh application statuses every 10 seconds
    const intervalId = setInterval(fetchApplications, 10000);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  // Fetch actual jobs for recommendations
  useEffect(() => {
    let cancelled = false;

    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_URL}/jobs`);

        const jobsData = Array.isArray(response.data)
          ? response.data
          : response.data?.jobs || [];

        if (!cancelled) {
          setJobs(jobsData);
        }
      } catch (error) {
        console.error("Error fetching recommended jobs:", error);

        if (!cancelled) {
          setJobs([]);
        }
      } finally {
        if (!cancelled) {
          setJobsLoading(false);
        }
      }
    };

    fetchJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  // Application status styling
  const getStatusClass = (status) => {
    switch (status) {
      case "Selected":
        return "bg-emerald-100 text-emerald-700";

      case "Interview":
        return "bg-blue-100 text-blue-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Pending":
      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  // Loading screen
  if (userLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#2048BD] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#2048BD] font-bold text-sm mt-4">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  // If the user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-black text-slate-800">
          Please log in
        </h1>

        <p className="mt-3 text-slate-500 text-center">
          Log in to view your applications and dashboard.
        </p>

        <Link
          to="/login"
          className="mt-6 rounded-xl bg-[#2048BD] px-6 py-3 text-white font-bold"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // Show the latest applications first
  const recentApplications = [...applications]
    .sort(
      (a, b) =>
        new Date(b.applied_at || 0) - new Date(a.applied_at || 0)
    )
    .slice(0, 5);

  // Do not recommend jobs that the user has already applied for
  const appliedJobIds = new Set(
    applications
      .map((app) => app.job?._id || app.job_id?._id)
      .filter(Boolean)
      .map(String)
  );

  const recommendedJobs = jobs
    .filter((job) => job._id && !appliedJobIds.has(String(job._id)))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 w-full flex flex-col font-sans">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#111827]/95 backdrop-blur-xl shadow-lg border-b border-slate-800 w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 h-20 flex justify-between items-center">

          <Link
            to="/"
            className="text-2xl sm:text-3xl font-black text-white tracking-tight"
          >
            Talent<span className="text-[#d5e7fe]">Bridge</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-bold text-slate-300 hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/jobs"
              className="text-sm font-bold text-slate-300 hover:text-white"
            >
              Jobs
            </Link>

            <Link
              to="/applications"
              className="text-sm font-bold text-slate-300 hover:text-white"
            >
              My Applications
            </Link>

            <Link
              to="/saved-jobs"
              className="text-sm font-bold text-slate-300 hover:text-white"
            >
              Saved Jobs
            </Link>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">

            <Link
              to="/applications"
              aria-label="View applications"
              className="relative p-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <Bell size={20} />
            </Link>

            <Link
              to="/saved-jobs"
              aria-label="View saved jobs"
              className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-red-400 hidden sm:block"
            >
              <Heart size={20} />
            </Link>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 pl-2 pr-3 py-1.5 rounded-full"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
                      "User"
                  )}&background=2048BD&color=fff`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-[#2048BD]"
                />

                <div className="hidden md:block text-left">
                  <p className="font-bold text-xs text-white">
                    {user.first_name || "User"}
                  </p>

                  <p className="text-[10px] text-slate-400">
                    {roleLabel[user.role] || "User"}
                  </p>
                </div>

                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                  <Link
                    to="/user/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <UserCheck size={16} className="text-[#2048BD]" />
                    My Profile
                  </Link>

                  <Link
                    to="/applications"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <Briefcase size={16} className="text-[#2048BD]" />
                    My Applications
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 text-left px-4 py-3 text-sm font-bold hover:bg-red-50 text-red-600 border-t"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-slate-300 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileOpen && (
          <nav className="lg:hidden bg-[#111827] border-t border-slate-700 px-5 py-4 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-slate-200 font-semibold"
            >
              Home
            </Link>

            <Link
              to="/jobs"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-slate-200 font-semibold"
            >
              Browse Jobs
            </Link>

            <Link
              to="/applications"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-slate-200 font-semibold"
            >
              My Applications
            </Link>

            <Link
              to="/saved-jobs"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-slate-200 font-semibold"
            >
              Saved Jobs
            </Link>
          </nav>
        )}
      </header>

      {/* MAIN DASHBOARD */}
      <main className="w-full flex-grow px-4 sm:px-8 lg:px-12 py-8 space-y-10">

        {/* WELCOME SECTION */}
        <section>
          <div className="bg-gradient-to-br from-[#111827] via-[#1E40AF] to-[#2048BD] rounded-3xl p-8 sm:p-12 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <p className="text-blue-200 font-bold text-sm">
                YOUR CAREER SPACE
              </p>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-2">
                Welcome Back, {user.first_name || "User"}! 👋
              </h1>

              <p className="mt-3 text-sm sm:text-base font-medium text-blue-100 max-w-xl">
                Track your job applications, check your application status,
                and discover your next career opportunity.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/jobs"
                  className="bg-white text-[#2048BD] px-6 py-3 rounded-xl font-extrabold text-sm hover:shadow-lg transition-all"
                >
                  Browse Jobs
                </Link>

                <Link
                  to="/applications"
                  className="bg-white/10 border border-white/30 text-white px-6 py-3 rounded-xl font-extrabold text-sm hover:bg-white/20"
                >
                  View Applications
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* DASHBOARD STATS */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

            {/* Applied jobs */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Applied Jobs
                  </p>

                  <h2 className="text-3xl font-black text-slate-800 mt-2">
                    {applicationsLoading ? "..." : appliedJobsCount}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2048BD] flex items-center justify-center">
                  <Briefcase size={24} />
                </div>
              </div>

              <Link
                to="/applications"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#2048BD] mt-4"
              >
                View applications <ArrowRight size={14} />
              </Link>
            </div>

            {/* Saved jobs */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Saved Jobs
                  </p>

                  <h2 className="text-3xl font-black text-slate-800 mt-2">
                    {savedJobsCount === null ? "—" : savedJobsCount}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                  <Heart size={24} />
                </div>
              </div>

              <Link
                to="/saved-jobs"
                className="inline-flex items-center gap-1 text-xs font-bold text-red-500 mt-4"
              >
                View saved jobs <ArrowRight size={14} />
              </Link>
            </div>

            {/* Interviews */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Interviews
                  </p>

                  <h2 className="text-3xl font-black text-slate-800 mt-2">
                    {applicationsLoading ? "..." : interviewsCount}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <User size={24} />
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-4">
                Applications marked Interview
              </p>
            </div>

            {/* Pending applications */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Pending
                  </p>

                  <h2 className="text-3xl font-black text-slate-800 mt-2">
                    {applicationsLoading
                      ? "..."
                      : applications.filter(
                          (app) => !app.status || app.status === "Pending"
                        ).length}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Clock size={24} />
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-4">
                Waiting for an employer update
              </p>
            </div>
          </div>
        </section>

        {/* RECENT APPLICATIONS */}
        <section>
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-800">
                  📄 Recent Applications
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  Track the latest updates from employers.
                </p>
              </div>

              <Link
                to="/applications"
                className="text-[#2048BD] font-bold text-xs hover:underline bg-blue-50 px-3 py-2 rounded-lg"
              >
                View All
              </Link>
            </div>

            {applicationsError && (
              <div className="mb-4 rounded-xl bg-red-50 text-red-700 p-4 text-sm">
                {applicationsError}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="py-3 font-bold pr-6">Company</th>
                    <th className="py-3 font-bold pr-6">Position</th>
                    <th className="py-3 font-bold pr-6">Location</th>
                    <th className="py-3 font-bold pr-6">Status</th>
                    <th className="py-3 font-bold">Applied On</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50 text-sm">
                  {applicationsLoading ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">
                        Loading applications...
                      </td>
                    </tr>
                  ) : recentApplications.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center">
                        <Briefcase
                          size={32}
                          className="mx-auto text-slate-300 mb-3"
                        />

                        <p className="font-bold text-slate-600">
                          No applications yet
                        </p>

                        <p className="text-slate-400 mt-1">
                          Apply for a job to see it here.
                        </p>

                        <Link
                          to="/jobs"
                          className="inline-block mt-4 bg-[#2048BD] text-white px-5 py-2.5 rounded-xl font-bold"
                        >
                          Explore Jobs
                        </Link>
                      </td>
                    </tr>
                  ) : (
                    recentApplications.map((app) => (
                      <tr key={app._id} className="hover:bg-slate-50/70">
                        <td className="py-4 font-bold text-slate-800 pr-6">
                          {app.job?.company || "Company"}
                        </td>

                        <td className="py-4 font-medium text-slate-600 pr-6">
                          {app.job?._id ? (
                            <Link
                              to={`/job/${app.job._id}`}
                              className="hover:text-[#2048BD]"
                            >
                              {app.job.title || "View Job"}
                            </Link>
                          ) : (
                            app.job?.title || "Job no longer available"
                          )}
                        </td>

                        <td className="py-4 text-slate-500 pr-6">
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={13} />
                            {app.job?.location || "Not specified"}
                          </span>
                        </td>

                        <td className="py-4 pr-6">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusClass(
                              app.status
                            )}`}
                          >
                            {app.status || "Pending"}
                          </span>
                        </td>

                        <td className="py-4 text-slate-400 font-medium">
                          {app.applied_at
                            ? new Date(app.applied_at).toLocaleDateString(
                                "en-IN"
                              )
                            : "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* RECOMMENDED JOBS FROM DATABASE */}
        <section>
          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
            <div>
              <h2 className="text-xl font-black text-slate-800">
                🎯 Recommended Jobs
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Explore available opportunities you have not applied for.
              </p>
            </div>

            <Link
              to="/jobs"
              className="text-[#2048BD] font-bold text-xs hover:underline bg-blue-50 px-3 py-2 rounded-lg"
            >
              Explore More
            </Link>
          </div>

          {jobsLoading ? (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-500">
              Loading available jobs...
            </div>
          ) : recommendedJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center">
              <Briefcase
                size={32}
                className="mx-auto text-slate-300 mb-3"
              />

              <p className="font-bold text-slate-700">
                No new recommendations right now
              </p>

              <p className="text-sm text-slate-400 mt-2">
                Visit the jobs page to explore available opportunities.
              </p>

              <Link
                to="/jobs"
                className="inline-block mt-4 bg-[#2048BD] text-white px-5 py-2.5 rounded-xl font-bold"
              >
                Browse All Jobs
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {recommendedJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 hover:shadow-md hover:border-[#2048BD]/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <h3 className="text-lg font-black text-slate-800">
                          {job.title || "Untitled Job"}
                        </h3>

                        <p className="text-[#2048BD] font-bold text-sm mt-1 flex items-center gap-1">
                          <Building2 size={14} />
                          {job.company || "Company"}
                        </p>
                      </div>

                      <Heart size={20} className="text-slate-300 shrink-0" />
                    </div>

                    <div className="mt-4 flex gap-2 flex-wrap">
                      <span className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full text-xs font-bold">
                        {job.jobType || job.type || "Not specified"}
                      </span>

                      {job.experience && (
                        <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold">
                          {job.experience}
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-slate-500 text-sm flex items-center gap-1">
                      <MapPin size={14} />
                      {job.location || "Location not specified"}
                    </p>

                    <p className="mt-3 text-slate-800 text-sm font-extrabold">
                      {job.salary ? `₹${job.salary}` : "Salary not specified"}
                    </p>
                  </div>

                  <Link
                    to={`/job/${job._id}`}
                    className="mt-6 block bg-[#2048BD] text-white text-center py-3 rounded-xl text-sm font-bold hover:bg-[#1E40AF] transition-colors"
                  >
                    View Job Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CAREER TIPS */}
        <section>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">
              <h2 className="text-lg font-black text-slate-800 mb-5">
                💡 Career Tips
              </h2>

              <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                <h3 className="font-bold text-blue-800 text-sm">
                  Complete Your Profile
                </h3>

                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Keep your skills, education, and experience up to date so
                  employers can understand your background.
                </p>

                <Link
                  to="/user/profile"
                  className="inline-flex items-center gap-1 mt-3 text-sm font-bold text-blue-700"
                >
                  Update Profile <ArrowRight size={14} />
                </Link>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 mt-4">
                <h3 className="font-bold text-emerald-800 text-sm">
                  Tailor Your Resume
                </h3>

                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Highlight the skills and projects that match the job
                  description before applying.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">
              <h2 className="text-lg font-black text-slate-800 mb-5">
                📌 Quick Links
              </h2>

              <div className="space-y-3">
                <Link
                  to="/jobs"
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 transition"
                >
                  <span className="flex items-center gap-3 font-bold text-slate-700">
                    <Briefcase size={19} className="text-[#2048BD]" />
                    Browse Jobs
                  </span>

                  <ArrowRight size={18} className="text-slate-400" />
                </Link>

                <Link
                  to="/applications"
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 transition"
                >
                  <span className="flex items-center gap-3 font-bold text-slate-700">
                    <UserCheck size={19} className="text-[#2048BD]" />
                    Track Applications
                  </span>

                  <ArrowRight size={18} className="text-slate-400" />
                </Link>

                <Link
                  to="/saved-jobs"
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-red-50 transition"
                >
                  <span className="flex items-center gap-3 font-bold text-slate-700">
                    <Heart size={19} className="text-red-500" />
                    Saved Jobs
                  </span>

                  <ArrowRight size={18} className="text-slate-400" />
                </Link>

                <Link
                  to="/user/profile"
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 transition"
                >
                  <span className="flex items-center gap-3 font-bold text-slate-700">
                    <User size={19} className="text-[#2048BD]" />
                    Manage Profile
                  </span>

                  <ArrowRight size={18} className="text-slate-400" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#111827] text-slate-400 w-full mt-auto py-8">
        <div className="w-full px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-black text-white tracking-tight">
              Talent<span className="text-[#d5e7fe]">Bridge</span>
            </h2>

            <p className="text-xs font-medium mt-1 text-slate-500">
              © {new Date().getFullYear()} Talent Bridge.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-sm font-bold">
            <Link to="/" className="hover:text-white">
              Home
            </Link>

            <Link to="/jobs" className="hover:text-white">
              Jobs
            </Link>

            <Link to="/applications" className="hover:text-white">
              Applications
            </Link>

            <Link to="/user/profile" className="hover:text-white">
              Profile
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

