import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Briefcase,
  Building2,
  MapPin,
  IndianRupee,
  GraduationCap,
  Clock3,
  Wrench,
  FileText,
  Upload,
  Edit,
  Sparkles,
  ArrowLeft,
  Loader2,
  Save,
} from "lucide-react";

import EmployerNavbar from "../../components/employer/EmployerNavbar";
import EmployerFooter from "../../components/employer/EmployerFooter";
import { updateJob } from "../../services/JobService";

export default function EmployerEditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    category: "",
    location: "",
    salary: "",
    experience: "",
    jobType: "",
    skills: "",
    description: "",
  });

  // Fetch job details by ID using cookie authentication
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setFetching(true);
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`, {
          withCredentials: true,
        });
        
        const job = res.data?.job || res.data || {};

        setFormData({
          title: job.title || job.jobTitle || "",
          company: job.company || "",
          category: job.category || "",
          location: job.location || "",
          salary: job.salary || "",
          experience: job.experience || "",
          jobType: job.jobType || job.type || "",
          skills: Array.isArray(job.skills) ? job.skills.join(", ") : job.skills || "",
          description: job.description || "",
        });
      } catch (error) {
        console.error("Error fetching job details:", error);
        alert(error.response?.data?.message || "Failed to load job details!");
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const skillsArray = typeof formData.skills === "string"
        ? formData.skills.split(",").map((skill) => skill.trim())
        : formData.skills;

      await updateJob(id, {
        ...formData,
        skills: skillsArray,
      });

      alert("Job updated successfully!");
      navigate("/employer/my-jobs");
    } catch (error) {
      console.error("Error updating job:", error);
      alert(error.response?.data?.message || error.message || "Failed to update job!");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <EmployerNavbar />
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
          <p className="text-sm font-semibold">Loading job details...</p>
        </div>
        <EmployerFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white w-full overflow-x-hidden">
      <EmployerNavbar />

      {/* Main Container */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Back Button */}
        <button
          onClick={() => navigate("/employer/my-jobs")}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 mb-6 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to My Jobs
        </button>

        {/* Hero Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-900 border-b border-indigo-800 rounded-3xl p-8 sm:p-10 shadow-lg mb-8 text-white"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300">
              <Edit className="w-10 h-10" />
            </div>

            <div>
              <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold mb-1 tracking-wider uppercase">
                <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
                <span>Job Management</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Edit Job Details
              </h1>
              <p className="mt-1 text-blue-100 text-sm">
                Update job specifications, salary expectations, and requirements.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-6">
            {/* Job Title */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                Job Title <span className="text-indigo-600">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Full Stack Developer"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                Company Name <span className="text-indigo-600">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Acme Tech Solutions"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                Category <span className="text-indigo-600">*</span>
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Information Technology"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                Location <span className="text-indigo-600">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Remote / Noida / Lucknow"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Annual Salary */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <IndianRupee className="w-4 h-4 text-indigo-600" />
                Annual Salary (₹) <span className="text-indigo-600">*</span>
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. 600000"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                Experience Needed <span className="text-indigo-600">*</span>
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
              >
                <option value="" disabled>Select Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="1-2 Years">1-2 Years</option>
                <option value="2-4 Years">2-4 Years</option>
                <option value="5+ Years">5+ Years</option>
              </select>
            </div>

            {/* Job Type */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <Clock3 className="w-4 h-4 text-indigo-600" />
                Job Type <span className="text-indigo-600">*</span>
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
              >
                <option value="" disabled>Select Job Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            {/* Skills */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <Wrench className="w-4 h-4 text-indigo-600" />
                Required Skills
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                Separate skills using commas (e.g. React, Express, TailWind)
              </p>
            </div>

            {/* Company Logo Upload */}
            <div className="lg:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <Upload className="w-4 h-4 text-indigo-600" />
                Company Logo (Optional)
              </label>
              <div className="border-2 border-dashed border-slate-200 hover:border-indigo-500/70 rounded-2xl p-6 text-center bg-slate-50/50 transition-colors group cursor-pointer">
                <input type="file" accept="image/*" className="hidden" id="logoUpload" />
                <label htmlFor="logoUpload" className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-600 transition-colors mb-2" />
                  <span className="text-xs font-bold text-slate-700">Click to upload company logo</span>
                  <span className="text-[10px] text-slate-400 mt-1 font-medium">PNG, JPG or SVG up to 2MB</span>
                </label>
              </div>
            </div>

            {/* Job Description */}
            <div className="lg:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Job Description <span className="text-indigo-600">*</span>
              </label>
              <textarea
                rows="6"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write detailed responsibilities, key requirements and eligibility criteria..."
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none resize-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Form Actions */}
            <div className="lg:col-span-2 mt-2 flex justify-end items-center gap-4 border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={() => navigate("/employer/my-jobs")}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-200 transition-all disabled:opacity-50 active:scale-[0.98] cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating Job...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      <EmployerFooter />
    </div>
  );
}