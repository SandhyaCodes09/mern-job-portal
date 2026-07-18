import { Link } from "react-router-dom";

export default function FeaturedJobs({ jobs }) {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Featured Jobs
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Find the latest opportunities from top companies
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
            >
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
                {job.category}
              </span>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {job.title}
              </h3>

              <p className="text-gray-600 mb-1">{job.company}</p>

              <p className="text-gray-500 mb-4">{job.location}</p>

              <Link
                to={`/job/${job._id}`}
                className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
