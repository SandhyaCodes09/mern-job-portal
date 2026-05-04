import { useState } from "react";
import "../styles/home.css";

export default function Search({ search, setSearch, category, setCategory, location, setLocation }) {
  return (
    <>
      {/* ================= SEARCH ================= */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Search for jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Project Manager">Project Manager</option>
          <option value="IT & Networking">IT & Networking</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">All Location</option>
          <option value="Remote">Remote</option>
          <option value="On-site">On-site</option>
        </select>

        <button>Search</button>
      </section>
    </>
  );
}
