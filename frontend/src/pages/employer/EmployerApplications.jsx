import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../api";
import {
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  FileText,
  Sparkles,
  ArrowLeft,
  Loader2,
  ExternalLink,
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

  // Fetch applications belonging to the logged-in employer
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);

    const res = await API.get("/applications/employer");

      setApplications(res.data?.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      alert(
        error.response?.data?.message ||
          "Could not load applications. Please check your login and backend."
      );
    } finally {
      setLoading(false);
    }
  };

  // Update application status in the database
  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      setUpdatingId(applicationId);

      await API.put(
        `/applications/employer/${applicationId}`,
        { status: newStatus }
      );

      setApplications((previousApplications) =>
        previousApplications.map((app) =>
          (app._id || app.id) === applicationId
            ? { ...app, status: newStatus }
            : app
        )
      );
    } catch (error) {
      console.error("Error updating application status:", error);
      alert(
        error.response?.data?.message || "Failed to update application status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Application statistics
  const totalCount = applications.length;

  const pendingCount = applications.filter(
    (app) => (app.status || "Pending") === "Pending"
  ).length;

  const interviewCount = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const selectedCount = applications.filter(
    (app) => app.status === "Selected"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  // Search by applicant name, email or job title; filter by status
  const filteredApplications = applications.filter((app) => {
    const candidateName =
      app.user?.name ||
      `${app.user?.first_name || ""} ${app.user?.last_name || ""}`.trim() ||
      app.candidateName ||
      "Applicant";

    const email = app.user?.email || app.candidateEmail || "";
    const jobTitle = app.job?.title || app.jobTitle || "";

    const query = searchQuery.toLowerCase();

    const matchesSearch =
      candidateName.toLowerCase().includes(query) ||
      email.toLowerCase().includes(query) ||
      jobTitle.toLowerCase().includes(query);

    const currentStatus = app.status || "Pending";

    const matchesStatus =
      statusFilter === "All" || currentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status || "Pending") {
      case "Selected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Selected
          </span>
        );

      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold">
            <XCircle className="w-3.5 h-3.5" />
            Rejected
          </span>
        );

      case "Interview":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
            <Users className="w-3.5 h-3.5" />
            Interview
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white w-full overflow-x-hidden">
      <EmployerNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-900 border-b border-indigo-800 rounded-3xl p-8 sm:p-10 shadow-lg mb-8 text-white"
        >
          <div className="flex items-center gap-5 relative z-10">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/20 text-cyan-300">
              <Users className="w-10 h-10" />
            </div>

            <div>
              <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold mb-1 tracking-wider uppercase">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Applicant Review Portal</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Job Applications
              </h1>

              <p className="mt-1 text-blue-100 text-sm">
                View applicants, review applications and manage hiring status.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <MetricCard
            title="Total Applications"
            count={totalCount}
            icon={<Users className="w-6 h-6" />}
            color="indigo"
          />

          <MetricCard
            title="Pending Review"
            count={pendingCount}
            icon={<Clock className="w-6 h-6" />}
            color="amber"
          />

          <MetricCard
            title="Interview"
            count={interviewCount}
            icon={<Briefcase className="w-6 h-6" />}
            color="blue"
          />

          <MetricCard
            title="Selected"
            count={selectedCount}
            icon={<CheckCircle2 className="w-6 h-6" />}
            color="emerald"
          />
        </div>

        {/* Applications list */}
        <section className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
          {/* Search and filters */}
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Candidate Submissions
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Review applicants and update their application status.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

                <input
                  type="text"
                  placeholder="Search name, email or job..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-medium outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-4 pl-6">Candidate</th>
                  <th className="p-4">Applied Position</th>
                  <th className="p-4">Required Experience</th>
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
                        <span className="text-xs font-bold">
                          Loading applications...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-16 text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-3 rounded-full bg-slate-100">
                          <FileText className="w-8 h-8" />
                        </div>

                        <p className="text-sm font-bold text-slate-700 mt-1">
                          No Applications Found
                        </p>

                        <p className="text-xs text-slate-400">
                          {searchQuery || statusFilter !== "All"
                            ? "Try changing your search or status filter."
                            : "Applications from candidates will appear here."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => {
                    const appId = app._id || app.id;

                    const name =
                      app.user?.name ||
                      `${app.user?.first_name || ""} ${app.user?.last_name || ""}`.trim() ||
                      app.candidateName ||
                      "Applicant";

                    const email =
                      app.user?.email || app.candidateEmail || "No email";

                    const jobTitle =
                      app.job?.title || app.jobTitle || "Job Title";

                    const experience = app.job?.experience || "N/A";
                    const status = app.status || "Pending";

                    const resumeUrl = app.resume || app.user?.resume;

                    return (
                      <tr
                        key={appId}
                        className="hover:bg-slate-50/60 transition-colors"
                      >
                        {/* Candidate details */}
                        <td className="p-4 pl-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 shrink-0 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-black flex items-center justify-center text-sm">
                              {name.charAt(0).toUpperCase()}
                            </div>

                            <div>
                              <p className="font-bold text-slate-900 text-sm">
                                {name}
                              </p>
                              <p className="text-[11px] text-slate-400">
                                {email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Applied job */}
                        <td className="p-4">
                          <div className="flex items-center gap-2 font-semibold text-slate-800">
                            <Briefcase className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            {jobTitle}
                          </div>
                          {app.job?.company && (
                            <p className="text-[11px] text-slate-400 mt-1 ml-5">
                              {app.job.company}
                            </p>
                          )}
                        </td>

                        {/* Required experience for the job */}
                        <td className="p-4 text-slate-600 font-semibold">
                          {experience}
                        </td>

                        {/* Current status */}
                        <td className="p-4 whitespace-nowrap">
                          {getStatusBadge(status)}
                        </td>

                        {/* Actions */}
                        <td className="p-4 pr-6">
                          <div className="flex items-center justify-end gap-2">
                            {resumeUrl && (
                              <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                                title="View Resume"
                              >
                                Resume
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}

                            <select
                              disabled={updatingId === appId}
                              value={status}
                              onChange={(event) =>
                                handleStatusChange(appId, event.target.value)
                              }
                              className="bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-bold text-slate-700 outline-none hover:border-indigo-400 focus:ring-1 focus:ring-indigo-500 cursor-pointer disabled:opacity-50"
                              aria-label={`Update status for ${name}`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Interview">Interview</option>
                              <option value="Selected">Selected</option>
                              <option value="Rejected">Rejected</option>
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
        </section>

        {/* Rejected count */}
        <p className="text-xs text-slate-500 mt-4 text-right">
          Rejected applications: <strong>{rejectedCount}</strong>
        </p>
      </main>

      <EmployerFooter />
    </div>
  );
}

function MetricCard({ title, count, icon, color }) {
  const colorClasses = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex items-center justify-between"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {title}
        </p>
        <h2 className="text-3xl font-black text-slate-900 mt-1">{count}</h2>
      </div>

      <div className={`p-3.5 rounded-xl border ${colorClasses[color]}`}>
        {icon}
      </div>
    </motion.div>
  );
}
