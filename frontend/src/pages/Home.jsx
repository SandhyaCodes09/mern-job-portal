import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Search from "../component/Search"; 
import Category from "../component/Category";  

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

 const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Tech Solutions Inc.",
    location: "Remote",
    category: "Software Engineer",
  },
  {
    id: 2,
    title: "IT & Networking Specialist",
    company: "Tech Solutions Inc.",
    location: "Remote",
    category: "IT & Networking",
  },
  {
    id: 3,
    title: "Project Manager",
    company: "Global Enterprises",
    location: "On-site",
    category: "Project Manager",
  },
  {
    id: 4,
    title: "Marketing Specialist",
    company: "Creative Minds Co.",
    location: "Remote",
    category: "Marketing",
  },
  {
    id: 5,
    title: "Financial Analyst",
    company: "Finance Experts Ltd.",
    location: "On-site",
    category: "Finance",
  },
  {
    id: 6,
    title: "Human Resources Manager",
    company: "HR Hub",
    location: "On-site",
    category: "Human Resources",
  },
];

  // simple search filter
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) &&
    (category ? job.category === category : true) &&
    (location ? job.location === location : true)
  );

  return (
    <>

      <Navbar />
      <Search 
      search={search} setSearch={setSearch} 
      category={category} setCategory={setCategory}
      location={location} setLocation={setLocation}
      />
      <Category category={category} setCategory={setCategory} />



      {/* ================= FEATURED JOBS ================= */}
      <section className="featured-jobs">
        <div className="container">
          <h2>Featured Jobs</h2>
          <p className="section-desc">
            Check out some of the featured job listings.
          </p>

          <div className="jobs-wrapper">
            {filteredJobs.map((job) => (
              <div key={job.id} className="job-listing">
                <h3>{job.title}</h3>
                <p>Company: {job.company}</p>
                <p>Location: {job.location}</p>

                <Link to={`/job/${job.id}`}>View Details</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

        <Footer />
    </>
  );
}