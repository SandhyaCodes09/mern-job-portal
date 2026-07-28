import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// Layout Components
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

  // Static Fallback Data (Jab DB connect na ho)
  const staticFallbackJobs = {
    "static-1": {
      _id: "static-1",
      title: "MERN Stack Developer",
      company: "Google India",
      location: "Bangalore (Remote)",
      category: "Full Stack",
      salary: "12-16 LPA",
      type: "Full Time",
      description:
        "We are looking for a passionate MERN Stack Developer to build, test, and deploy highly scalable web applications. You will collaborate closely with UI/UX designers and product managers to deliver exceptional digital experiences.",
      requirements: [
        "Strong proficiency in JavaScript, React.js, and Node.js",
        "Hands-on experience with Express.js and MongoDB",
        "Understanding of REST APIs and modern front-end build pipelines",
        "Knowledge of Git version control and modern UI components",
      ],
    },
    "static-2": {
      _id: "static-2",
      title: "React.js Frontend Engineer",
      company: "Microsoft",
      location: "Hyderabad (Hybrid)",
      category: "Frontend",
      salary: "14-18 LPA",
      type: "Full Time",
      description:
        "Join our frontend team to craft responsive, accessible, and fast Web UIs using React, Tailwind CSS, and TypeScript. You will work on flagship enterprise platforms serving millions of daily users.",
      requirements: [
        "3+ years experience with React.js & Redux Toolkit / Context API",
        "Expertise in CSS frameworks like Tailwind CSS or styled-components",
        "Focus on web performance optimization & responsive design",
      ],
    },
    "static-3": {
      _id: "static-3",
      title: "Node.js Backend Developer",
      company: "Amazon",
      location: "Noida / Gurgaon",
      category: "Backend",
      salary: "10-15 LPA",
      type: "Full Time",
      description:
        "Responsible for writing clean, efficient, and well-documented server-side code. You will design microservices architecture and manage database integration.",
      requirements: [
        "Deep knowledge of Node.js asynchronous architecture",
        "Experience in database indexing, aggregation, and caching (Redis)",
        "Building secure OAuth2 & JWT authentication pipelines",
      ],
    },
  };

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(res.data);
      } catch (error) {
        console.warn("DB not connected, loading fallback job detail:", error);
        // DB na hone par fallback object load karega
        if (staticFallbackJobs[id]) {
          setJob(staticFallbackJobs[id]);
        } else {
          // Default Fallback
          setJob(staticFallbackJobs["static-1"]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-28">
          <div className="w-12 h-12 border-4 border-[#2048BD] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#2048BD] font-extrabold text-sm mt-4 animate-pulse">
            Loading Job Details...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-slate-100 shadow-xs">
        <Navbar />
      </div>

      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#2048BD] transition-colors"
          >
            ← Back to All Opportunities
          </Link>
        </div>

        {/* Main Job Card Frame */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          
          {/* Top Hero Banner Section */}
          <div className="bg-gradient-to-br from-[#111827] via-[#1E40AF] to-[#2048BD] p-6 sm:p-10 text-white relative overflow-hidden">
            {/* Background Ambient Glow Orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2048BD]/40 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[#d5e7fe] text-[#1E40AF] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  {job?.category || "Technology"}
                </span>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3.5 py-1 rounded-full text-xs font-bold">
                  {job?.type || "Full Time"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {job?.title}
              </h1>

              <div className="flex items-center gap-2 text-slate-200 font-semibold text-sm sm:text-base">
                <span className="text-blue-300">🏢</span>
                <p>{job?.company}</p>
              </div>
            </div>
          </div>

          {/* Key Metrics / Quick Info Grid */}
          <div className="p-6 sm:p-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              
              {/* Location Card */}
              <div className="group bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-[#2048BD]/30 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#d5e7fe] text-[#1E40AF] flex items-center justify-center font-bold text-lg mb-2 group-hover:scale-110 transition-transform">
                  📍
                </div>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  Location
                </h3>
                <p className="text-[#111827] text-base font-extrabold mt-1">
                  {job?.location}
                </p>
              </div>

              {/* Salary Card */}
              <div className="group bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-[#2048BD]/30 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg mb-2 group-hover:scale-110 transition-transform">
                  💰
                </div>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  Offered CTC
                </h3>
                <p className="text-emerald-600 text-base font-black mt-1">
                  ₹{job?.salary}
                </p>
              </div>

              {/* Application Status Card */}
              <div className="group bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-[#2048BD]/30 hover:shadow-md transition-all duration-300 sm:col-span-2 md:col-span-1">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#2048BD] flex items-center justify-center font-bold text-lg mb-2 group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  Process
                </h3>
                <p className="text-[#111827] text-base font-extrabold mt-1">
                  Direct Shortlisting
                </p>
              </div>
            </div>

            {/* Job Description Section */}
            <div className="space-y-4 pt-2">
              <h2 className="text-xl sm:text-2xl font-black text-[#111827] flex items-center gap-2">
                <span>📄</span> Role Overview
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-medium">
                {job?.description}
              </p>
            </div>

            {/* Key Requirements (If available) */}
            {job?.requirements && (
              <div className="space-y-4 pt-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#111827] flex items-center gap-2">
                  <span>✅</span> Key Skills & Requirements
                </h2>
                <ul className="space-y-2.5">
                  {job.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-slate-600 text-sm font-medium bg-slate-50 p-3 rounded-xl border border-slate-100"
                    >
                      <span className="text-[#2048BD] font-bold">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Apply Action CTA Bar */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400 font-semibold">
                  Interested in this position?
                </p>
                <p className="text-sm font-extrabold text-[#111827]">
                  Submit your application to {job?.company}
                </p>
              </div>

              <button
                onClick={() => setApplied(true)}
                disabled={applied}
                className={`w-full sm:w-auto px-10 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 shadow-md ${
                  applied
                    ? "bg-emerald-500 text-white cursor-default"
                    : "bg-[#2048BD] hover:bg-[#1E40AF] text-white hover:shadow-xl hover:shadow-blue-500/25 active:scale-95"
                }`}
              >
                {applied ? "Application Submitted! 🎉" : "Apply Now ➔"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}