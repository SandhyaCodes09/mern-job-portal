import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  FileText,
  Sparkles,
  ArrowLeft,
  Loader2,
  ExternalLink,
  ChevronRight,
  User,
  Briefcase,
} from "lucide-react";

import EmployerNavbar from "../../components/employer/EmployerNavbar";
import EmployerFooter from "../../components/employer/EmployerFooter";

export default function EmployerApplications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch employer job applications using cookie-based auth
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/employer/applications", {
        withCredentials: true,
      });
      const data = res.data?.applications || res.data || [];
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle application status updates (e.g., Pending, Selected, Rejected)
  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      setUpdatingId(applicationId);
      await axios.put(
        `http://localhost:5000/api/employer/applications/${applicationId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      // Update local state to reflect change instantly
      setApplications((prev) =>
        prev.map((app) =>
          (app._id || app.id) === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Error updating application status:", error);
      alert(error.response?.data?.message || "Failed to update status!");
    } finally {
      setUpdatingId(null);
    }
  };

  // Metric Stats Calculations
  const totalCount = applications.length;
  const pendingCount = applications.filter(
    (a) => (a.status || "Pending").toLowerCase() === "pending"
  ).length;
  const selectedCount = applications.filter((a) =>
    ["selected", "shortlisted", "hired"].includes((a.status || "").toLowerCase())
  ).length;
  const rejectedCount = applications.filter(
    (a) => (a.status || "").toLowerCase() === "rejected"
  ).length;

  // Filter applications by Search Input and Status Dropdown
  const filteredApplications = applications.filter((app) => {
    const candidateName =
      app.candidateName ||
      app.user?.name ||
      `${app.user?.first_name || ""} ${app.user?.last_name || ""}`.trim() ||
      "";
    const jobTitle = app.jobTitle || app.job?.title || "";
    const matchesSearch =
      candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const appStatus = (app.status || "Pending").toLowerCase();
    const matchesStatus =
      statusFilter === "All" || appStatus === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white w-full overflow-x-hidden">
      <EmployerNavbar />

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Back Button */}
        <button
          onClick={() => navigate("-1")}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 mb-6 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back 
        </button>

        {/* Hero Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-900 border-b border-indigo-800 rounded-3xl p-8 sm:p-10 shadow-lg mb-8 text-white"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300">
                <Users className="w-10 h-10" />
              </div>

              <div>
                <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold mb-1 tracking-wider uppercase">
                  <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
                  <span>Applicant Review Portal</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Job Applications
                </h1>
                <p className="mt-1 text-blue-100 text-sm">
                  Review applicant profiles, manage hiring stages, and track candidate progress.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Total Applications Card */}
          <motion.div
            whileHover={{ y: -3 }}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Applications
              </p>
              <h2 className="text-3xl font-black text-slate-900 mt-1">
                {totalCount}
              </h2>
            </div>
            <div className="p-3.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Users className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Pending Applications Card */}
          <motion.div
            whileHover={{ y: -3 }}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Pending Review
              </p>
              <h2 className="text-3xl font-black text-amber-600 mt-1">
                {pendingCount}
              </h2>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <Clock className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Selected Applications Card */}
          <motion.div
            whileHover={{ y: -3 }}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Shortlisted / Selected
              </p>
              <h2 className="text-3xl font-black text-emerald-600 mt-1">
                {selectedCount}
              </h2>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Rejected Applications Card */}
          <motion.div
            whileHover={{ y: -3 }}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Rejected
              </p>
              <h2 className="text-3xl font-black text-rose-600 mt-1">
                {rejectedCount}
              </h2>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
              <XCircle className="w-6 h-6" />
            </div>
          </motion.div>
        </div>

        {/* Main Content Card: Applications List */}
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
          {/* Header & Filter Toolbar */}
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Candidate Submissions
              </h2>
              <p className="text-xs text-slate-500">
                Manage candidate status or view submitted resumes
              </p>
            </div>

            {/* Search and Status Dropdown Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search candidate or job..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-4 pl-6">Candidate</th>
                  <th className="p-4">Applied Position</th>
                  <th className="p-4">Experience</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-16 text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                        <span className="text-xs font-bold">Loading applications...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-16 text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-3 rounded-full bg-slate-100 text-slate-400">
                          <FileText className="w-8 h-8" />
                        </div>
                        <p className="text-sm font-bold text-slate-700 mt-1">
                          No Applications Found
                        </p>
                        <p className="text-xs text-slate-400">
                          {searchQuery || statusFilter !== "All"
                            ? "Try adjusting your search filters."
                            : "New applications from candidates will appear here."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => {
                    const appId = app._id || app.id;
                    const name =
                      app.candidateName ||
                      app.user?.name ||
                      `${app.user?.first_name || ""} ${app.user?.last_name || ""}`.trim() ||
                      "Applicant";
                    const email = app.candidateEmail || app.user?.email || "No email";
                    const jobTitle = app.jobTitle || app.job?.title || "Job Title";
                    const experience = app.experience || app.user?.experience || "N/A";
                    const status = (app.status || "Pending").toLowerCase();
                    const resumeUrl = app.resume || app.user?.resume;

                    return (
                      <tr
                        key={appId}
                        className="hover:bg-slate-50/60 transition-colors"
                      >
                        {/* Candidate Info */}
                        <td className="p-4 pl-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-black flex items-center justify-center text-sm shadow-2xs">
                              {name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{name}</p>
                              <p className="text-[11px] text-slate-400">{email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Applied Job */}
                        <td className="p-4">
                          <div className="flex items-center gap-2 font-semibold text-slate-800">
                            <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                            {jobTitle}
                          </div>
                        </td>

                        {/* Experience */}
                        <td className="p-4 text-slate-600 font-semibold">
                          {experience}
                        </td>

                        {/* Status Badge */}
                        <td className="p-4">
                          {status === "selected" || status === "hired" ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Selected
                            </span>
                          ) : status === "rejected" ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              Rejected
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              Pending
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="p-4 pr-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Resume Link */}
                            {resumeUrl && (
                              <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                                title="View Resume"
                              >
                                Resume <ExternalLink className="w-3 h-3" />
                              </a>
                            )}

                            {/* Status Change Dropdown / Buttons */}
                            <select
                              disabled={updatingId === appId}
                              value={app.status || "Pending"}
                              onChange={(e) =>
                                handleStatusChange(appId, e.target.value)
                              }
                              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none hover:border-indigo-400 focus:ring-1 focus:ring-indigo-500 cursor-pointer transition-all disabled:opacity-50"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Selected">Select</option>
                              <option value="Rejected">Reject</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <EmployerFooter />
    </div>
  );
}