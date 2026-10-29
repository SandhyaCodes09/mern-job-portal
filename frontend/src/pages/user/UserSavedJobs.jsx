
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";
import {
  Bookmark,
  BriefcaseBusiness,
  MapPin,
  Trash2,
  RefreshCw,
} from "lucide-react";


export default function UserSavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  const fetchSavedJobs = async () => {
    try {
      setError("");

    const res = await API.get("/saved-jobs");

      const jobs = res.data?.savedJobs || res.data?.jobs || [];

      setSavedJobs(
        jobs.map((item) => ({
          ...item,
          job: item.job || item.job_id || item,
        }))
      );
    } catch (err) {
      console.error("Saved jobs fetch error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load saved jobs. Please check the backend routes."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const removeSavedJob = async (jobId) => {
    if (!jobId) return;

    const confirmed = window.confirm(
      "Are you sure you want to remove this saved job?"
    );

    if (!confirmed) return;

    try {
      setRemovingId(jobId);

      await API.delete(`/saved-jobs/${jobId}`);

      setSavedJobs((previousJobs) =>
        previousJobs.filter(
          (item) => String(item.job?._id) !== String(jobId)
        )
      );
    } catch (err) {
      console.error("Remove saved job error:", err);

      alert(
        err.response?.data?.message ||
          "Could not remove this job. Please try again."
      );
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <Link to="/" className="text-2xl font-bold text-blue-700">
            Talent Bridge
          </Link>

          <Link
            to="/jobs"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Browse Jobs
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              My Saved Jobs
            </h1>
            <p className="mt-2 text-slate-600">
              Keep track of jobs you want to apply for later.
            </p>
          </div>

          <button
            onClick={() => {
              setLoading(true);
              fetchSavedJobs();
            }}
            className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        <div className="mb-6 rounded-xl border bg-white p-5">
          <p className="text-sm text-slate-500">Saved jobs</p>
          <p className="mt-1 text-3xl font-bold text-blue-700">
            {savedJobs.length}
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-600">
            Loading saved jobs...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => {
                setLoading(true);
                fetchSavedJobs();
              }}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white"
            >
              Try Again
            </button>
          </div>
        ) : savedJobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-white px-6 py-16 text-center">
            <Bookmark size={44} className="mx-auto text-slate-400" />
            <h2 className="mt-4 text-xl font-semibold text-slate-800">
              No saved jobs yet
            </h2>
            <p className="mt-2 text-slate-500">
              Save interesting jobs and they will appear here.
            </p>
            <Link
              to="/jobs"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Find Jobs
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {savedJobs.map((item) => {
              const job = item.job;
              const jobId = job?._id;

              return (
                <article
                  key={item._id || jobId}
                  className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className="rounded-lg bg-blue-50 p-3">
                        <BriefcaseBusiness
                          size={24}
                          className="text-blue-700"
                        />
                      </div>

                      <div>
                        <h2 className="text-lg font-bold text-slate-900">
                          {job?.title || "Untitled Job"}
                        </h2>
                        <p className="mt-1 text-slate-600">
                          {job?.company || "Company not available"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeSavedJob(jobId)}
                      disabled={!jobId || removingId === jobId}
                      title="Remove saved job"
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 size={19} />
                    </button>
                  </div>

                  {job?.location && (
                    <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={16} />
                      {job.location}
                    </p>
                  )}

                  {job?.jobType && (
                    <p className="mt-2 text-sm text-slate-500">
                      Job type: {job.jobType}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap gap-3 border-t pt-4">
                    {jobId ? (
                      <Link
                        to={`/job/${jobId}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        View Details
                      </Link>
                    ) : (
                      <span className="text-sm text-slate-500">
                        Job details unavailable
                      </span>
                    )}

                    <button
                      onClick={() => removeSavedJob(jobId)}
                      disabled={!jobId || removingId === jobId}
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      {removingId === jobId ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
