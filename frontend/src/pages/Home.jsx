import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Search from "../component/Search"; 
import Category from "../component/Category";  

import axios from "axios";

// state to hold jobs

const [jobs, setJobs] = useState([]);

useEffect(()=>{
   
  const fetchJobs = async ()=>{
    try{
      const res = await axios.get("/api/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  fetchJobs();
}, []);

// ================= HOME PAGE COMPONENT =================
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");



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
              <div key={job._id} className="job-listing">
                <h3>{job.title}</h3>
                <p>Company: {job.company}</p>
                <p>Location: {job.location}</p>

                <Link to={`/job/${job._id}`}>View Details</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

        <Footer />
    </>
  );
}