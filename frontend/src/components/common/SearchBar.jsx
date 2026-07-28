// import "../../styles/home.css";

// export default function Search({
//   search,
//   setSearch,
//   category,
//   setCategory,
//   location,
//   setLocation,
// }) {
//   return (
//     <>
//       {/* ================= SEARCH ================= */}

//       <section className="bg-white shadow-lg rounded-2xl p-6 max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <input
//             type="text"
//             placeholder="Search for jobs..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select Category</option>
//             <option value="Human Resources">Human Resources</option>
//             <option value="Project Manager">Project Manager</option>
//             <option value="IT & Networking">IT & Networking</option>
//             <option value="Software Engineer">Software Engineer</option>
//             <option value="Finance">Finance</option>
//             <option value="Marketing">Marketing</option>
//           </select>

//           <select
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">All Location</option>
//             <option value="Remote">Remote</option>
//             <option value="On-site">On-site</option>
//           </select>

//           <button className="bg-blue-700 text-white rounded-lg px-6 py-3 hover:bg-blue-800 transition">
//             Search
//           </button>
//         </div>
//       </section>
//     </>
//   );
// }

import "../../styles/home.css";

export default function Search({
  search,
  setSearch,
  category,
  setCategory,
  location,
  setLocation,
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Search Input */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Job title or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all placeholder-slate-400"
          />
        </div>

        {/* Category Select */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">📁</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            <option value="" className="text-slate-400">All Categories</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Project Manager">Project Manager</option>
            <option value="IT & Networking">IT & Networking</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {/* Location Select */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">📍</span>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            <option value="" className="text-slate-400">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        {/* Search Button */}
        <button className="w-full bg-[#2048BD] hover:bg-[#1E40AF] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2">
          Search Jobs
        </button>
        
      </div>
    </div>
  );
}
