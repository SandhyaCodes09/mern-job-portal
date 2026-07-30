import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Building2,
  Clock3,
  IndianRupee,
  Pencil,
  Trash2,
  BriefcaseBusiness,
  Plus,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Tag,
  X,
} from "lucide-react";

import { getEmployerJobs, deleteJob } from "../../services/JobService";

import EmployerNavbar from "../../components/employer/EmployerNavbar";
import EmployerFooter from "../../components/employer/EmployerFooter";

export default function EmployerMyJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await getEmployerJobs();
      setJobs(res.jobs || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(id);
      fetchJobs();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // Enhanced Search Logic (Title, Company, Location, Category)
  const filteredJobs = jobs.filter((job) => {
    const query = search.toLowerCase().trim();
    if (!query) return true;

    return (
      (job.title && job.title.toLowerCase().includes(query)) ||
      (job.company && job.company.toLowerCase().includes(query)) ||
      (job.location && job.location.toLowerCase().includes(query)) ||
      (job.category && job.category.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white w-full overflow-x-hidden">
      {/* Employer Navbar */}
      <EmployerNavbar />

      {/* Hero Header Banner */}
      <div className="w-full bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-900 text-white relative overflow-hidden border-b border-indigo-800 shadow-md">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300 text-xs font-semibold tracking-wider uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Recruiter Management
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                My Posted Jobs
              </h1>

              <p className="text-indigo-100 text-sm leading-relaxed">
                Manage, edit, and track all your active job listings in real-time.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/employer/create-job"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                <Plus size={18} />
                Post New Job
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-grow">
        {/* Search Bar Container */}
        <div className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-3xl shadow-xs mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search
              className="absolute left-3.5 top-3 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by job title, company, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-9 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-4 py-2.5 rounded-xl border border-slate-200/60">
            <Sparkles size={15} className="text-indigo-600 animate-pulse" />
            Showing {filteredJobs.length} of {jobs.length} Postings
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-xs hover:border-indigo-300 transition-colors">
            <div className="flex items-center justify-between">
              <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Total Posted
              </p>
              <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                <BriefcaseBusiness size={18} />
              </div>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mt-2">
              {jobs.length}
            </h2>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-xs hover:border-emerald-300 transition-colors">
            <div className="flex items-center justify-between">
              <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Active Listings
              </p>
              <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <h2 className="text-3xl font-black text-emerald-600 mt-2">
              {jobs.length}
            </h2>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between">
              <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Search Matches
              </p>
              <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                <TrendingUp size={18} />
              </div>
            </div>
            <h2 className="text-3xl font-black text-blue-600 mt-2">
              {filteredJobs.length}
            </h2>
          </div>
        </div>

        {/* 3-Column Job Cards Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center shadow-xs max-w-lg mx-auto my-8 space-y-4">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto border border-indigo-100">
              <BriefcaseBusiness size={32} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">No Jobs Found</h2>
              <p className="text-slate-500 text-sm mt-1">
                {search
                  ? `No jobs matched "${search}". Try searching for something else.`
                  : "You haven't posted any jobs yet."}
              </p>
            </div>
            <Link
              to="/employer/create-job"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <Plus size={16} /> Create Job Posting
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-slate-200/80 hover:border-indigo-400/80 rounded-3xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Badges Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="bg-indigo-50 text-indigo-700 border border-indigo-200/80 px-3 py-1 rounded-xl text-xs font-bold">
                      {job.jobType || "Full Time"}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-xl flex items-center gap-1.5 border border-slate-200/60">
                      <Tag size={12} className="text-slate-400" />
                      {job.category || "General"}
                    </span>
                  </div>

                  {/* Title & Company */}
                  <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1">
                    {job.title}
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-5 font-semibold">
                    <Building2 size={14} className="text-indigo-600 shrink-0" />
                    <span className="truncate">{job.company}</span>
                  </div>

                  {/* Job Details Badges */}
                  <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-600 mb-5">
                    <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-semibold">
                      <MapPin size={14} className="text-rose-500 shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-semibold">
                      <Clock3 size={14} className="text-amber-500 shrink-0" />
                      <span className="truncate">{job.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Salary & Actions Footer */}
                <div className="pt-4 border-t border-slate-100 mt-auto flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block">
                      Salary
                    </span>
                    <div className="flex items-center text-slate-900 font-extrabold text-base">
                      <IndianRupee size={15} className="text-emerald-600 shrink-0" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/employer/edit-job/${job._id}`}
                      className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/80 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95"
                      title="Edit Job"
                    >
                      <Pencil size={15} />
                    </Link>

                    <button
                      onClick={() => handleDelete(job._id)}
                      className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/80 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      title="Delete Job"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Employer Footer */}
      <EmployerFooter />
    </div>
  );
}