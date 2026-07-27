// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useSearchParams, Link } from "react-router-dom";
// import Navbar from "../../components/common/Navbar";

// export default function Jobs() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchParams] = useSearchParams();
//   const category = searchParams.get("category");

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/jobs");
//         setJobs(res.data);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   // Filter by Category & Search Input
//   const filteredJobs = jobs.filter((job) => {
//     const matchesCategory = category ? job.category === category : true;
//     const matchesSearch =
//       job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       job.location?.toLowerCase().includes(searchQuery.toLowerCase());

//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Top Navbar */}
//       <Navbar />

//       {/* Main Content Area */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {/* Header Section */}
//         <div className="text-center max-w-3xl mx-auto mb-10">
//           <h1 className="text-4xl font-extrabold text-[#111827] sm:text-5xl tracking-tight">
//             {category ? `${category} Jobs` : "Explore All Jobs"}
//           </h1>
//           <p className="mt-3 text-lg text-slate-600">
//             Find your next career move from top companies hiring today.
//           </p>

//           {/* Search Bar Widget */}
//           <div className="mt-6 flex items-center bg-white rounded-2xl shadow-sm border border-slate-200 p-2 max-w-xl mx-auto">
//             <input
//               type="text"
//               placeholder="Search by job title, company, or location..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-4 py-2 text-sm text-[#111827] placeholder-slate-400 bg-transparent focus:outline-none"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery("")}
//                 className="text-xs font-semibold text-slate-400 hover:text-slate-600 mr-2"
//               >
//                 Clear
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Loading Spinner */}
//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="text-lg font-bold text-[#2048BD] animate-pulse">
//               Loading jobs...
//             </div>
//           </div>
//         ) : filteredJobs.length === 0 ? (
//           /* Empty State */
//           <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8">
//             <h3 className="text-xl font-bold text-[#111827]">
//               No jobs found
//             </h3>
//             <p className="text-slate-500 text-sm mt-1">
//               Try adjusting your search query or removing filters.
//             </p>
//           </div>
//         ) : (
//           /* Job Cards Grid */
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredJobs.map((job) => (
//               <div
//                 key={job._id}
//                 className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-[#d5e7fe] transition duration-300 flex flex-col justify-between"
//               >
//                 <div>
//                   {/* Category Badge & Salary */}
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="bg-[#d5e7fe] text-[#1E40AF] text-xs font-bold px-3 py-1 rounded-full">
//                       {job.category || "General"}
//                     </span>

//                     <span className="text-[#2048BD] font-bold text-lg">
//                       ₹{job.salary}
//                     </span>
//                   </div>

//                   {/* Title */}
//                   <h2 className="text-xl font-bold text-[#111827] mb-3 line-clamp-1">
//                     {job.title}
//                   </h2>

//                   {/* Company & Location Info */}
//                   <div className="space-y-1.5 mb-4 text-sm text-slate-600">
//                     <p className="flex items-center gap-2">
//                       <span className="font-medium text-slate-400">Company:</span>{" "}
//                       <span className="font-semibold text-[#111827]">
//                         {job.company}
//                       </span>
//                     </p>

//                     <p className="flex items-center gap-2">
//                       <span className="font-medium text-slate-400">Location:</span>{" "}
//                       <span className="text-slate-700">{job.location}</span>
//                     </p>
//                   </div>

//                   {/* Description snippet */}
//                   <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-3">
//                     {job.description}
//                   </p>
//                 </div>

//                 {/* View Details Button using Theme Color */}
//                 <Link
//                   to={`/job/${job._id}`}
//                   className="block text-center bg-[#2048BD] hover:bg-[#1E40AF] text-white py-2.5 rounded-xl text-sm font-medium transition shadow-md shadow-blue-100"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filter by Category & Search Input
  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = category ? job.category === category : true;
    const matchesSearch =
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Top Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main Content Area - Full Width */}
      <main className="w-full flex-grow px-4 sm:px-8 lg:px-12 py-10">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl font-black text-slate-800 sm:text-5xl tracking-tight">
            {category ? (
              <>
                Explore <span className="text-[#2048BD]">{category}</span> Jobs
              </>
            ) : (
              "Explore All Opportunities"
            )}
          </h1>
          <p className="mt-4 text-lg font-medium text-slate-500">
            Find your next career move from top companies hiring today.
          </p>

          {/* Search Bar Widget */}
          <div className="mt-8 flex items-center bg-white rounded-2xl shadow-md border border-slate-200 p-2 max-w-2xl mx-auto focus-within:ring-2 focus-within:ring-[#2048BD]/50 transition-all">
            <span className="pl-4 pr-2 text-slate-400">🔍</span>
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
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold transition-colors mr-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-[#2048BD] border-t-transparent rounded-full animate-spin" />
            <div className="mt-4 text-sm font-bold text-[#2048BD] animate-pulse">
              Fetching verified jobs...
            </div>
          </div>
        ) : filteredJobs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-3xl mx-auto">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-black text-slate-800">
              No jobs found
            </h3>
            <p className="text-slate-500 font-medium text-sm mt-2">
              Try adjusting your search query or exploring a different category.
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 bg-[#2048BD] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#1E40AF] transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          /* Job Cards Grid - Utilizing Full Width (xl:grid-cols-4) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="group bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-[#2048BD]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Ambient Hover Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d5e7fe]/30 rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Category Badge & Salary */}
                  <div className="flex justify-between items-start mb-5">
                    <span className="bg-[#d5e7fe] text-[#1E40AF] text-[10px] uppercase tracking-wider font-extrabold px-3.5 py-1.5 rounded-full">
                      {job.category || "General"}
                    </span>
                    <span className="text-emerald-600 font-black text-lg bg-emerald-50 px-3 py-1 rounded-xl">
                      ₹{job.salary}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-black text-slate-800 mb-2 line-clamp-1 group-hover:text-[#2048BD] transition-colors">
                    {job.title}
                  </h2>

                  {/* Company & Location Info */}
                  <div className="space-y-2 mb-4 text-sm">
                    <p className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-[10px]">🏢</span>
                      <span className="font-bold text-slate-700 truncate">
                        {job.company}
                      </span>
                    </p>

                    <p className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-[10px]">📍</span>
                      <span className="font-medium text-slate-500 truncate">
                        {job.location}
                      </span>
                    </p>
                  </div>

                  {/* Description snippet */}
                  <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6 line-clamp-3">
                    {job.description}
                  </p>
                </div>

                {/* View Details Button */}
                <Link
                  to={`/job/${job._id}`}
                  className="relative z-10 block text-center bg-slate-50 hover:bg-[#2048BD] text-[#2048BD] hover:text-white border border-[#2048BD]/20 hover:border-[#2048BD] py-3 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95"
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