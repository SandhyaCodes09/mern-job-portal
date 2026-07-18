import { useEffect, useState } from "react";
import "../../styles/home.css";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Search from "../../components/common/SearchBar";
import Category from "../../components/common/CategoryList";
import FeaturedJobs from "../../components/common/FeaturedJobList";
import Hero from "../../components/common/Hero";

import axios from "axios";

// ================= HOME PAGE COMPONENT =================
export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  // state to hold jobs
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // simple search filter
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? job.category === category : true) &&
      (location ? job.location === location : true),
  );

  return (
    <>
      <Navbar />
      <Hero />
      <Search
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        location={location}
        setLocation={setLocation}
      />

      {/* category jobs */}
      <Category category={category} setCategory={setCategory} />

      {/* FEATURED JOBS */}
      <FeaturedJobs jobs={filteredJobs} />

      <Footer />
    </>
  );
}
