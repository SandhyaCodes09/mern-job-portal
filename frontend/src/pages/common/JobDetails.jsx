import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../api";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";


export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobError, setJobError] = useState("");

  const [applied, setApplied] = useState(false);
  const [checkingApplication, setCheckingApplication] = useState(true);
  const [applying, setApplying] = useState(false);

  const [applyError, setApplyError] = useState("");
  const [applyMessage, setApplyMessage] = useState("");

  // Fetch real job and check whether user has already applied
  useEffect(() => {
    let cancelled = false;

    const fetchJobAndApplication = async () => {
      setLoading(true);
      setCheckingApplication(true);
      setJob(null);
      setJobError("");
      setApplied(false);
      setApplyError("");
      setApplyMessage("");

      try {
        // 1. Fetch job details
       const jobResponse = await API.get(`/jobs/${id}`);

        const jobData = jobResponse.data?.job || jobResponse.data;

        if (!jobData?._id) {
          throw new Error("Invalid job data received.");
        }

        if (cancelled) return;

        setJob(jobData);
        setLoading(false);

        // 2. Check previous applications
        try {
          const applicationsResponse = await API.get(
            "/applications/my-applications"
          );

          const applications =
            applicationsResponse.data?.applications || [];

          const alreadyApplied = applications.some((application) => {
            const appliedJobId =
              application.job?._id || application.job_id?._id;

            return String(appliedJobId) === String(jobData._id);
          });

          if (!cancelled) {
            setApplied(alreadyApplied);
          }
        } catch (applicationError) {
          // A visitor who is not logged in may not be able
          // to check application history.
          console.warn(
            "Could not check previous application:",
            applicationError
          );
        }
      } catch (error) {
        console.error("Job fetch error:", error);

        if (!cancelled) {
          setJobError(
            error.response?.data?.message ||
              error.message ||
              "Job could not be loaded. Please try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setCheckingApplication(false);
        }
      }
    };

    fetchJobAndApplication();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // Apply for a job
  const handleApply = async () => {
    if (!job?._id || applied || applying) return;

    try {
      setApplying(true);
      setApplyError("");
      setApplyMessage("");

      const response = await API.post(
        `/applications/${job._id}`,
        {}
      );

      setApplied(true);
      setApplyMessage(
        response.data?.message ||
          "Your application has been submitted successfully!"
      );
    } catch (error) {
      console.error("Apply job error:", error);

      if (error.response?.status === 409) {
        // Backend says this application already exists
        setApplied(true);
        setApplyMessage("You have already applied for this job.");
      } else if (error.response?.status === 401) {
        setApplyError("Please log in before applying for this job.");
      } else if (error.response?.status === 403) {
        setApplyError(
          "Only job seeker accounts can apply for jobs."
        );
      } else {
        setApplyError(
          error.response?.data?.message ||
            "Application failed. Please try again."
        );
      }
    } finally {
      setApplying(false);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />

        <div className="flex flex-grow flex-col items-center justify-center py-28">
          <div className="w-12 h-12 border-4 border-[#2048BD] border-t-transparent rounded-full animate-spin" />

          <p className="mt-4 text-sm font-extrabold text-[#2048BD]">
            Loading Job Details...
          </p>
        </div>

        <Footer />
      </div>
    );
  }

  // Job not found
  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />

        <main className="flex-grow mx-auto max-w-2xl px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            Job not available
          </h2>

          <p className="mt-3 text-slate-600">
            {jobError || "This job could not be found."}
          </p>

          <Link
            to="/jobs"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            Browse Jobs
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="sticky top-0 z-50 bg-white/90 border-b border-slate-100">
        <Navbar />
      </div>

      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Back link */}
        <div className="mb-6">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#2048BD]"
          >
            ← Back to All Opportunities
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          {/* Job header */}
          <div className="bg-gradient-to-br from-[#111827] via-[#1E40AF] to-[#2048BD] p-6 sm:p-10 text-white">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#d5e7fe] text-[#1E40AF] px-3.5 py-1 rounded-full text-xs font-black uppercase">
                {job.category || "Technology"}
              </span>

              <span className="bg-white/10 border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold">
                {job.jobType || job.type || "Full Time"}
              </span>
            </div>

            <h1 className="mt-4 text-2xl sm:text-4xl font-black tracking-tight">
              {job.title}
            </h1>

            <p className="mt-3 text-slate-200 font-semibold">
              🏢 {job.company}
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Job information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-5 rounded-2xl border">
                <p className="text-slate-400 text-xs font-bold uppercase">
                  Location
                </p>

                <p className="text-slate-900 font-extrabold mt-2">
                  📍 {job.location || "Not specified"}
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border">
                <p className="text-slate-400 text-xs font-bold uppercase">
                  Offered CTC
                </p>

                <p className="text-emerald-600 font-black mt-2">
                  {job.salary ? `₹${job.salary}` : "Not specified"}
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border">
                <p className="text-slate-400 text-xs font-bold uppercase">
                  Application Process
                </p>

                <p className="text-slate-900 font-extrabold mt-2">
                  Direct Application
                </p>
              </div>
            </div>

            {/* Description */}
            <section>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                📄 Role Overview
              </h2>

              <p className="mt-4 text-slate-600 leading-relaxed">
                {job.description || "No description provided."}
              </p>
            </section>

            {/* Requirements */}
            {Array.isArray(job.requirements) &&
              job.requirements.length > 0 && (
                <section>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    ✅ Key Skills & Requirements
                  </h2>

                  <ul className="mt-4 space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li
                        key={index}
                        className="bg-slate-50 p-3 rounded-xl border text-slate-600"
                      >
                        <span className="mr-2 text-blue-700">✓</span>
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

            {/* Apply button */}
            <div className="pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400 font-semibold">
                  Interested in this position?
                </p>

                <p className="text-sm font-extrabold text-slate-900 mt-1">
                  Submit your application to {job.company}
                </p>
              </div>

              <div className="w-full sm:w-auto">
                <button
                  onClick={handleApply}
                  disabled={
                    applied ||
                    applying ||
                    checkingApplication
                  }
                  className={`w-full px-10 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-md ${
                    applied
                      ? "bg-green-600 text-white cursor-not-allowed"
                      : "bg-[#2048BD] hover:bg-[#1E40AF] text-white disabled:opacity-60"
                  }`}
                >
                  {checkingApplication
                    ? "Checking Status..."
                    : applying
                    ? "Submitting..."
                    : applied
                    ? "Already Applied ✓"
                    : "Apply Now ➔"}
                </button>

                {applyMessage && (
                  <p className="mt-3 text-sm font-medium text-green-700">
                    {applyMessage}
                  </p>
                )}

                {applyError && (
                  <p className="mt-3 text-sm font-medium text-red-600">
                    {applyError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
