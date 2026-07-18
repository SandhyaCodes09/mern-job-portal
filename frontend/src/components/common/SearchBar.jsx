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
    <>
      {/* ================= SEARCH ================= */}

      <section className="bg-white shadow-lg rounded-2xl p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search for jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Project Manager">Project Manager</option>
            <option value="IT & Networking">IT & Networking</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Location</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
          </select>

          <button className="bg-blue-700 text-white rounded-lg px-6 py-3 hover:bg-blue-800 transition">
            Search
          </button>
        </div>
      </section>
    </>
  );
}
