import "../../styles/home.css";

export default function Search({
  search,
  setSearch,
  category,
  setCategory,
  location,
  setLocation,
  onSearch,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.();
  };

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    onSearch?.();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">

        {/* Keyword */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>

          <input
            type="text"
            placeholder="Job title or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2048BD] placeholder-slate-400"
          />
        </div>

        {/* Category */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            📁
          </span>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2048BD]"
          >
            <option value="">All Categories</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Project Manager">Project Manager</option>
            <option value="IT & Networking">IT & Networking</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {/* Location */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            📍
          </span>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2048BD]"
          >
            <option value="">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        {/* Search */}
        <button
          type="submit"
          className="w-full bg-[#2048BD] hover:bg-[#1E40AF] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95"
        >
          🔍 Search Jobs
        </button>
      </div>

      {(search || category || location) && (
        <div className="flex justify-end mt-3">
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-semibold text-[#2048BD] hover:underline"
          >
            Clear filters ✕
          </button>
        </div>
      )}
    </form>
  );
}

