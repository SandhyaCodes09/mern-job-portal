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

      setJobs(res.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
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

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <EmployerNavbar />

      <div className="min-h-screen bg-slate-100">
        <div className="w-full px-8 lg:px-12 py-8">
          {/* Heading */}

          <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-blue-700">
                My Posted Jobs
              </h1>

              <p className="text-gray-500 mt-2">
                Manage all your posted jobs from one place.
              </p>
            </div>

            {/* Search */}

            <div className="relative mt-6 lg:mt-0">
              <Search
                className="absolute left-4 top-3.5 text-gray-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search Job..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-80 bg-white border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Stats */}

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <p className="text-gray-500">Total Jobs</p>

              <h2 className="text-4xl font-bold text-blue-700 mt-2">
                {jobs.length}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <p className="text-gray-500">Active Jobs</p>

              <h2 className="text-4xl font-bold text-green-600 mt-2">
                {jobs.length}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <p className="text-gray-500">Search Results</p>

              <h2 className="text-4xl font-bold text-orange-500 mt-2">
                {filteredJobs.length}
              </h2>
            </div>
          </div>

          {/* Jobs List */}

          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-16 text-center">
              <BriefcaseBusiness size={70} className="mx-auto text-gray-300" />

              <h2 className="text-2xl font-semibold mt-5">No Jobs Found</h2>

              <p className="text-gray-500 mt-2">
                Start posting jobs to attract candidates.
              </p>

              <Link
                to="/create-job"
                className="inline-block mt-6 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl"
              >
                Post New Job
              </Link>
            </div>
          ) : (
            <>
              {" "}
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-7 mb-6 border border-gray-100"
                >
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">
                    {/* Left */}

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-bold text-blue-700">
                          {job.title}
                        </h2>

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {job.jobType}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mt-5">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Building2 size={18} />

                          <span>{job.company}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin size={18} />

                          <span>{job.location}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock3 size={18} />

                          <span>{job.experience}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            {job.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-5 text-2xl font-bold text-green-600">
                        <IndianRupee size={22} />

                        {job.salary}
                      </div>
                    </div>

                    {/* Right */}

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                      <Link
                        to={`/edit-job/${job._id}`}
                        className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl transition"
                      >
                        <Pencil size={18} />
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(job._id)}
                        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <EmployerFooter />
    </>
  );
}
