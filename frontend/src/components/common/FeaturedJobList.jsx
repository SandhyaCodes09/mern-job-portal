import { Link } from "react-router-dom";

export default function FeaturedJobs({ jobs }) {
  // DB Disconnect / Empty Data hone par Static Fallback Array
  const staticFallbackJobs = [
    {
      _id: "static-1",
      title: "MERN Stack Developer",
      company: "Google India",
      location: "Bangalore",
      category: "Full Stack",
      salary: "12-16 LPA",
    },
    {
      _id: "static-2",
      title: "React.js Frontend Engineer",
      company: "Microsoft",
      location: "Hyderabad",
      category: "Frontend",
      salary: "14-18 LPA",
    },
    {
      _id: "static-3",
      title: "Node.js Backend Developer",
      company: "Amazon",
      location: "Noida",
      category: "Backend",
      salary: "10-15 LPA",
    },
  ];

  // Agar jobs prop me data aaye to wo dikhega, varna fallback jobs
  const displayJobs = jobs && jobs.length > 0 ? jobs : staticFallbackJobs;

  return (
    <section className="py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayJobs.map((job) => (
            <div
              key={job._id}
              className="group relative bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#2048BD]/15 hover:border-[#2048BD]/40 flex flex-col justify-between overflow-hidden"
            >
              {/* Unique Hover Top Accent Border Glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E40AF] via-[#2048BD] to-[#d5e7fe] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                {/* Category Badge & Salary */}
                <div className="flex justify-between items-center mb-4">
                  <span className="inline-block bg-[#d5e7fe] text-[#1E40AF] text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
                    {job.category || "General"}
                  </span>

                  {job.salary && (
                    <span className="text-[#2048BD] font-black text-sm">
                      ₹{job.salary}
                    </span>
                  )}
                </div>

                {/* Job Title */}
                <h3 className="text-xl font-extrabold text-[#111827] group-hover:text-[#2048BD] transition-colors duration-300 mb-2 line-clamp-1">
                  {job.title}
                </h3>

                {/* Company & Location */}
                <p className="text-slate-600 font-semibold text-sm mb-1 flex items-center gap-1.5">
                  <span className="text-slate-400">🏢</span> {job.company}
                </p>

                <p className="text-slate-400 font-medium text-xs mb-6 flex items-center gap-1.5">
                  <span className="text-slate-400">📍</span> {job.location}
                </p>
              </div>

              {/* View Details Button */}
              <Link
                to={`/job/${job._id}`}
                className="block text-center bg-[#2048BD] hover:bg-[#1E40AF] text-white font-bold py-2.5 px-5 rounded-xl transition-all duration-300 shadow-md group-hover:shadow-blue-500/25 active:scale-95 text-sm"
              >
                View Details ➔
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
