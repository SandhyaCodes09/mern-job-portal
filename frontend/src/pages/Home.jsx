import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Search from "../component/Search"; 
import Category from "../component/Category";  
import FeaturedJobs from "../component/FeaturedJobs";
import Hero from "../component/Hero";

import axios from "axios";


// ================= HOME PAGE COMPONENT =================
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");



  // state to hold jobs
const [jobs, setJobs] = useState([]);

useEffect(()=>{
   
  const fetchJobs = async ()=>{
    try{
      const res = await axios.get( "http://localhost:5000/api/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  fetchJobs();
}, []);



  // simple search filter
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) &&
    (category ? job.category === category : true) &&
    (location ? job.location === location : true)
  );

  return (
    <>

      <Navbar />
      <Hero />
      <Search 
      search={search} setSearch={setSearch} 
      category={category} setCategory={setCategory}
      location={location} setLocation={setLocation}
      />

        {/* category jobs */}
      <Category category={category} setCategory={setCategory} />

      {/* FEATURED JOBS */}
      <FeaturedJobs jobs={filteredJobs} />

      <Footer />
    </>
  );
}