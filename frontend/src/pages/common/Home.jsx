import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import Navbar from "../../components/common/Navbar";
import Hero from "../../components/common/Hero";
import SearchBar from "../../components/common/SearchBar";
import Category from "../../components/common/CategoryList";
import FeaturedJobs from "../../components/common/FeaturedJobList";
import Footer from "../../components/common/Footer";

// Custom Styles
import "../../styles/home.css";

export default function Home() {

  const navigate = useNavigate();

  // States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);


  
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.role === "employer") {
      navigate("/employer", { replace: true });
    }
  }, [user, navigate]);

  const [loading, setLoading] = useState(true);
  
  // Fetch Jobs Data
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

  // Filter Logic
  // Filter Logic + Limit to Top 6 Jobs for Home Page
  const filteredJobs = jobs
    .filter(
      (job) =>
        job.title?.toLowerCase().includes(search.toLowerCase()) &&
        (category ? job.category === category : true) &&
        (location
          ? job.location?.toLowerCase().includes(location.toLowerCase())
          : true),
    )
    .slice(0, 6); // 👈 Isse DB se max 6 jobs hi Home page par dikhengi

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      {/* Sticky Glass Navbar */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-slate-100 shadow-xs">
        <Navbar />
      </div>

      <main className="flex-grow">
        {/* ==========================================
            HERO SECTION (FULLY RESPONSIVE)
        ========================================== */}
        <Hero />

        <div className="relative z-30 -mt-16 sm:-mt-15 px-4">
          <div className="max-w-6xl mx-auto bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-100">
            {/* Ensure you have the Search component imported correctly above */}
            {/* <Search
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            location={location}
            setLocation={setLocation}
          /> */}

            {/* Temporary placeholder if Search component is missing */}
            <div className="text-center text-slate-500 py-3 px-4 font-bold">
              <SearchBar />
            </div>
          </div>
        </div>

        {/* ==========================================
            STATS SECTION
        ========================================== */}
        <section className="pt-20 sm:pt-24 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="group bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-[#d5e7fe]/40 rounded-bl-full transition-all group-hover:scale-125" />
              <h3 className="text-2xl sm:text-4xl font-black text-[#2048BD]">
                10K+
              </h3>
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 mt-1.5 sm:mt-2 uppercase tracking-wider">
                Active Openings
              </p>
            </div>

            <div className="group bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-bl-full transition-all group-hover:scale-125" />
              <h3 className="text-2xl sm:text-4xl font-black text-[#111827]">
                500+
              </h3>
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 mt-1.5 sm:mt-2 uppercase tracking-wider">
                Top Employers
              </p>
            </div>

            <div className="group bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-[#d5e7fe]/40 rounded-bl-full transition-all group-hover:scale-125" />
              <h3 className="text-2xl sm:text-4xl font-black text-[#2048BD]">
                85K+
              </h3>
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 mt-1.5 sm:mt-2 uppercase tracking-wider">
                Candidates
              </p>
            </div>

            <div className="group bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 rounded-bl-full transition-all group-hover:scale-125" />
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-2xl sm:text-4xl font-black text-[#111827]">
                  98%
                </h3>
              </div>
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 mt-1.5 sm:mt-2 uppercase tracking-wider">
                Selection Rate
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            POPULAR CATEGORIES
        ========================================== */}
        <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
            <span className="bg-[#d5e7fe] text-[#1E40AF] text-[10px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest">
              Categories
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#111827] mt-2 sm:mt-3">
              Explore By Domain
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 sm:mt-2 max-w-md">
              Pick a category to filter roles suited to your exact skill set.
            </p>
          </div>

          <div className="relative bg-white p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#d5e7fe]/30 rounded-bl-full pointer-events-none" />
            <Category category={category} setCategory={setCategory} />
          </div>
        </section>

        {/* ==========================================
         FEATURED JOBS SECTION (WITH DB FALLBACK)
         ========================================== */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 gap-3 sm:gap-4 border-b border-slate-200/80 pb-4 sm:pb-6">
            <div>
              <span className="bg-[#d5e7fe] text-[#1E40AF] text-[10px] sm:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xs">
                🔥 Verified Roles
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#111827] mt-2">
                Featured Opportunities
              </h2>
            </div>

            {(search || category || location) && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("");
                  setLocation("");
                }}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition shadow-xs hover:scale-105 active:scale-95"
              >
                Clear Filters ✖
              </button>
            )}
          </div>

          {/* Content / Loading State */}
          {loading ? (
            <div className="flex flex-col justify-center items-center py-20 space-y-4 bg-white/80 backdrop-blur-md rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-10 h-10 border-4 border-[#2048BD] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#2048BD] font-bold text-xs sm:text-sm tracking-wide animate-pulse">
                Fetching verified job posts...
              </p>
            </div>
          ) : (
            <div className="relative bg-gradient-to-b from-white to-slate-50/80 p-6 sm:p-8 rounded-3xl border border-slate-200/70 shadow-xl shadow-slate-200/40">
              {/* Decorative Glow Orb */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#2048BD]/10 rounded-full blur-2xl pointer-events-none" />

              {/* FeaturedJobs Component with Fallback Logic */}
              {/* <FeaturedJobs 
        jobs={
          filteredJobs && filteredJobs.length > 0 
            ? filteredJobs 
            : staticFallbackJobs
        } 
      /> */}
              <FeaturedJobs jobs={filteredJobs} />
            </div>
          )}
        </section>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
