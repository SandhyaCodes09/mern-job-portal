import { useState, useEffect } from "react";
import API from "../../api";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";


export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDbConnected, setIsDbConnected] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");

        // API array ya { jobs: [...] } response handle karo
        const jobsData = Array.isArray(res.data)
          ? res.data
          : res.data?.jobs || [];

        setJobs(jobsData);
        setIsDbConnected(true);
      } catch (error) {
        console.error("Jobs fetch error:", error);
        setJobs([]);
        setIsDbConnected(false);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = category
      ? job.category === category
      : true;

    const search = searchQuery.toLowerCase();

    const matchesSearch =
      job.title?.toLowerCase().includes(search) ||
      job.company?.toLowerCase().includes(search) ||
      job.location?.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <main className="w-full flex-grow px-4 sm:px-8 lg:px-12 py-10">
        {!loading && !isDbConnected && (
          <div className="mb-8 max-w-4xl mx-auto bg-amber-50 border border-amber-200 text-amber-800 px-6 py-4 rounded-2xl text-center text-sm font-bold">
            Unable to load jobs from the database. Please check your backend server and try again.
          </div>
        )}

        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl font-black text-slate-800 sm:text-5xl tracking-tight">
            {category ? (
              <>
                Explore{" "}
                <span className="text-[#2048BD]">
                  {category}
                </span>{" "}
                Jobs
              </>
            ) : (
              "Explore All Opportunities"
            )}
          </h1>

          <p className="mt-4 text-lg font-medium text-slate-500">
            Find your next career move from top companies hiring today.
          </p>

          <div className="mt-8 flex items-center bg-white rounded-2xl shadow-md border border-slate-200 p-2 max-w-2xl mx-auto focus-within:ring-2 focus-within:ring-[#2048BD]/50 transition-all">
            <span className="pl-4 pr-2 text-slate-400">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search by job title, company, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-2 py-3 text-sm font-semibold text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold mr-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-[#2048BD] border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-sm font-bold text-[#2048BD]">
              Fetching jobs...
            </p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-3xl mx-auto">
            <div className="text-6xl mb-4">📭</div>

            <h3 className="text-2xl font-black text-slate-800">
              {isDbConnected
                ? "No jobs found"
                : "Jobs are temporarily unavailable"}
            </h3>

            <p className="text-slate-500 font-medium text-sm mt-2">
              {isDbConnected
                ? "Try another search or category."
                : "Please make sure the backend and database are running."}
            </p>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 bg-[#2048BD] text-white px-6 py-2.5 rounded-xl font-bold text-sm"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="group bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-[#2048BD]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-5">
                    <span className="bg-[#d5e7fe] text-[#1E40AF] text-[10px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-full">
                      {job.category || "General"}
                    </span>

                    {job.salary && (
                      <span className="text-emerald-600 font-black text-sm bg-emerald-50 px-3 py-1 rounded-xl">
                        ₹{job.salary}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-black text-slate-800 mb-2 line-clamp-2 group-hover:text-[#2048BD]">
                    {job.title}
                  </h2>

                  <div className="space-y-2 mb-4 text-sm">
                    <p className="flex items-center gap-2">
                      <span>🏢</span>
                      <span className="font-bold text-slate-700">
                        {job.company}
                      </span>
                    </p>

                    <p className="flex items-center gap-2">
                      <span>📍</span>
                      <span className="font-medium text-slate-500">
                        {job.location}
                      </span>
                    </p>
                  </div>

                  <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6 line-clamp-3">
                    {job.description}
                  </p>
                </div>

                <Link
                  to={`/job/${job._id}`}
                  className="block text-center bg-slate-50 hover:bg-[#2048BD] text-[#2048BD] hover:text-white border border-[#2048BD]/20 py-3 rounded-xl text-sm font-bold transition-all"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
