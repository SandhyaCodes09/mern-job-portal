
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";

import {
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
  RefreshCw,
} from "lucide-react";


const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Interview: "bg-blue-100 text-blue-800",
  Selected: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

export default function UserAppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      setError("");

      const res = await API.get("/applications/my-applications");

      setApplications(res.data?.applications || []);
    } catch (err) {
      console.error("Applications fetch error:", err);
      setError(
        err.response?.data?.message ||
          "Unable to load your applications. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

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
              My Applied Jobs
            </h1>
            <p className="mt-2 text-slate-600">
              Track your applications and their latest status.
            </p>
          </div>

          <button
            onClick={() => {
              setLoading(true);
              fetchApplications();
            }}
            className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        <div className="mb-6 rounded-xl border bg-white p-5">
          <p className="text-sm text-slate-500">Total applications</p>
          <p className="mt-1 text-3xl font-bold text-blue-700">
            {applications.length}
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-600">
            Loading your applications...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => {
                setLoading(true);
                fetchApplications();
              }}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white"
            >
              Try Again
            </button>
          </div>
        ) : applications.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-white px-6 py-16 text-center">
            <BriefcaseBusiness
              size={44}
              className="mx-auto text-slate-400"
            />
            <h2 className="mt-4 text-xl font-semibold text-slate-800">
              No applications yet
            </h2>
            <p className="mt-2 text-slate-500">
              Jobs you apply for will appear here.
            </p>
            <Link
              to="/jobs"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Explore Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => {
              const job = application.job;

              return (
                <article
                  key={application._id}
                  className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {job?.title || "Job no longer available"}
                      </h2>

                      <p className="mt-1 font-medium text-slate-600">
                        {job?.company || "Company not available"}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                        {job?.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={16} />
                            {job.location}
                          </span>
                        )}

                        {application.applied_at && (
                          <span className="flex items-center gap-1">
                            <CalendarDays size={16} />
                            Applied on{" "}
                            {new Date(
                              application.applied_at
                            ).toLocaleDateString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${
                        statusStyles[application.status] ||
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {application.status || "Pending"}
                    </span>
                  </div>

                  {job?._id && (
                    <div className="mt-5 border-t pt-4">
                      <Link
                        to={`/job/${job._id}`}
                        className="font-semibold text-blue-700 hover:underline"
                      >
                        View Job Details →
                      </Link>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
