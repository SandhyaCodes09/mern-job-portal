// import { useEffect, useState } from "react";
// import axios from "axios";

// // Layout & Section Components
// import Navbar from "../../components/common/Navbar";
// import Hero from "../../components/common/Hero";
// import Search from "../../components/common/SearchBar";
// import Category from "../../components/common/CategoryList";
// import FeaturedJobs from "../../components/common/FeaturedJobList";
// import Footer from "../../components/common/Footer";

// // Custom Styles
// import "../../styles/home.css";

// // ===============================================
// // HOME PAGE COMPONENT
// // ===============================================
// export default function Home() {
//   // Filter States
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [location, setLocation] = useState("");

//   // Data States
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ---------------------------------------------
//   // Fetch Jobs Data
//   // ---------------------------------------------
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

//   // ---------------------------------------------
//   // Search & Filter Logic
//   // ---------------------------------------------
//   const filteredJobs = jobs.filter(
//     (job) =>
//       job.title?.toLowerCase().includes(search.toLowerCase()) &&
//       (category ? job.category === category : true) &&
//       (location ? job.location?.toLowerCase().includes(location.toLowerCase()) : true)
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans selection:bg-[#d5e7fe] selection:text-[#1E40AF]">
//       {/* Sticky Glass Navbar */}
//       <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-100/80 shadow-sm">
//         <Navbar />
//       </div>

//       {/* Main Content */}
//       <main className="flex-grow">
        
//         {/* ==========================================
//             HERO & SEARCH SECTION (High Energy Styling)
//         ========================================== */}
//         <section className="relative bg-gradient-to-br from-[#111827] via-[#1E40AF] to-[#2048BD] pt-12 pb-20 px-4 sm:px-6 lg:px-8">
//           {/* Animated Background Glowing Orbs */}
//           <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
//           <div className="absolute bottom-5 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

//           <div className="relative z-10 max-w-7xl mx-auto">
//             <Hero />

//             {/* Fixed Search Bar Container (Always Visible & Front) */}
//             <div className="mt-10 max-w-5xl mx-auto relative z-30">
//               <div className="bg-white/95 backdrop-blur-2xl p-4 sm:p-6 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-white/60 ring-4 ring-white/10 hover:ring-[#2048BD]/30 transition-all duration-300">
//                 <Search
//                   search={search}
//                   setSearch={setSearch}
//                   category={category}
//                   setCategory={setCategory}
//                   location={location}
//                   setLocation={setLocation}
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ==========================================
//             STATS / LIVE ACTIVITY BADGE
//         ========================================== */}
//         <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
//             {/* Stat Card 1 */}
//             <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-20 h-20 bg-[#d5e7fe]/40 rounded-bl-full transition-all group-hover:scale-110"></div>
//               <h3 className="text-3xl sm:text-4xl font-extrabold text-[#2048BD]">10K+</h3>
//               <p className="text-xs font-bold text-slate-500 mt-2 tracking-wider uppercase">Active Openings</p>
//             </div>

//             {/* Stat Card 2 */}
//             <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-20 h-20 bg-slate-100 rounded-bl-full transition-all group-hover:scale-110"></div>
//               <h3 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">500+</h3>
//               <p className="text-xs font-bold text-slate-500 mt-2 tracking-wider uppercase">Top Tech MNCs</p>
//             </div>

//             {/* Stat Card 3 */}
//             <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-20 h-20 bg-[#d5e7fe]/40 rounded-bl-full transition-all group-hover:scale-110"></div>
//               <h3 className="text-3xl sm:text-4xl font-extrabold text-[#2048BD]">85K+</h3>
//               <p className="text-xs font-bold text-slate-500 mt-2 tracking-wider uppercase">Applied Candidates</p>
//             </div>

//             {/* Stat Card 4 */}
//             <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-bl-full transition-all group-hover:scale-110"></div>
//               <div className="flex items-center gap-2">
//                 <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
//                 <h3 className="text-3xl sm:text-4xl font-extrabold text-[#111827]">98%</h3>
//               </div>
//               <p className="text-xs font-bold text-slate-500 mt-2 tracking-wider uppercase">Response Rate</p>
//             </div>

//           </div>
//         </section>

//         {/* ==========================================
//             POPULAR CATEGORIES
//         ========================================== */}
//         <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//           <div className="flex flex-col items-center text-center mb-8">
//             <span className="bg-[#d5e7fe] text-[#1E40AF] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
//               Popular Fields
//             </span>
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mt-3">
//               Explore Top Categories
//             </h2>
//             <p className="text-slate-500 text-sm mt-2 max-w-md">
//               Find positions matching your exact domain and tech stack.
//             </p>
//           </div>

//           <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-md">
//             <Category category={category} setCategory={setCategory} />
//           </div>
//         </section>

//         {/* ==========================================
//             FEATURED JOBS LISTING
//         ========================================== */}
//         <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 border-b border-slate-200/80 pb-6">
//             <div>
//               <span className="bg-[#d5e7fe] text-[#1E40AF] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
//                 Handpicked Roles
//               </span>
//               <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mt-2">
//                 Featured Jobs
//               </h2>
//             </div>

//             {(search || category || location) && (
//               <button
//                 onClick={() => {
//                   setSearch("");
//                   setCategory("");
//                   setLocation("");
//                 }}
//                 className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition shadow-sm"
//               >
//                 Clear Filters ✖
//               </button>
//             )}
//           </div>

//           {loading ? (
//             <div className="flex flex-col justify-center items-center py-20 space-y-4">
//               <div className="w-10 h-10 border-4 border-[#2048BD] border-t-transparent rounded-full animate-spin"></div>
//               <p className="text-[#2048BD] font-bold text-sm tracking-wide">Fetching verified job posts...</p>
//             </div>
//           ) : (
//             <FeaturedJobs jobs={filteredJobs} />
//           )}
//         </section>

//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import axios from "axios";

// // Layout & Section Components
// import Navbar from "../../components/common/Navbar";
// import Search from "../../components/common/SearchBar";
// import Category from "../../components/common/CategoryList";
// import FeaturedJobs from "../../components/common/FeaturedJobList";
// import Footer from "../../components/common/Footer";

// // Custom Styles
// import "../../styles/home.css";

// // ===============================================
// // HOME PAGE COMPONENT
// // ===============================================
// export default function Home() {
//   // Filter States
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [location, setLocation] = useState("");

//   // Data States
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ---------------------------------------------
//   // Fetch Jobs Data
//   // ---------------------------------------------
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

//   // ---------------------------------------------
//   // Search & Filter Logic
//   // ---------------------------------------------
//   const filteredJobs = jobs.filter(
//     (job) =>
//       job.title?.toLowerCase().includes(search.toLowerCase()) &&
//       (category ? job.category === category : true) &&
//       (location ? job.location?.toLowerCase().includes(location.toLowerCase()) : true)
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans selection:bg-[#d5e7fe] selection:text-[#1E40AF]">
//       {/* Sticky Glass Navbar */}
//       <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-slate-100/80 shadow-xs">
//         <Navbar />
//       </div>

//       {/* Main Content */}
//       <main className="flex-grow">
        
//         {/* ==========================================
//             HERO SECTION WITH REAL PROFESSIONAL IMAGE
//         ========================================== */}
//         <section className="relative bg-gradient-to-br from-[#111827] via-[#1E40AF] to-[#2048BD] pt-12 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
//           {/* Animated Background Orbs */}
//           <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
//           <div className="absolute bottom-0 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

//           <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
//             {/* Left Content */}
//             <div className="lg:col-span-7 text-left text-white space-y-6">
//               <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-semibold text-[#d5e7fe] tracking-wide animate-bounce">
//                 <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
//                 #1 Job Portal Platform for Tech Talent
//               </div>

//               <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
//                 Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-100 to-white">Dream Job</span> & Accelerate Career.
//               </h1>

//               <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed">
//                 Connect with top tech companies, explore verified opportunities, and get hired faster with our smart recruitment workspace.
//               </p>

//               {/* Trust Badges */}
//               <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
//                 <span className="flex items-center gap-2">✔ 100% Verified Employers</span>
//                 <span className="flex items-center gap-2">✔ Direct Hiring Process</span>
//                 <span className="flex items-center gap-2">✔ Instant Notifications</span>
//               </div>
//             </div>

//             {/* Right Side: Professional Banner Image with Floating Badges */}
//             <div className="lg:col-span-5 relative flex justify-center">
//               <div className="relative w-full max-w-md">
//                 {/* Image Glow Backplate */}
//                 <div className="absolute inset-0 bg-gradient-to-tr from-[#2048BD] to-indigo-400 rounded-3xl rotate-3 scale-105 opacity-50 blur-xl"></div>

//                 {/* Main Hero Image */}
//                 <img
//                   src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
//                   alt="Professional candidate"
//                   className="relative z-10 w-full h-[420px] object-cover rounded-3xl shadow-2xl border-2 border-white/20 hover:scale-[1.02] transition duration-500"
//                 />

//                 {/* Floating Glass Widget 1 */}
//                 <div className="absolute -bottom-6 -left-6 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/60 flex items-center gap-3 animate-pulse">
//                   <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg">
//                     ✓
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-500 font-semibold">Job Selected</p>
//                     <p className="text-sm font-bold text-[#111827]">500+ Companies</p>
//                   </div>
//                 </div>

//                 {/* Floating Glass Widget 2 */}
//                 <div className="absolute -top-4 -right-4 z-20 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white/60">
//                   <p className="text-xs text-slate-500 font-semibold">Active Hiring</p>
//                   <p className="text-sm font-extrabold text-[#2048BD]">10k+ Live Roles</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Floating Search Bar */}
//           <div className="mt-12 max-w-5xl mx-auto relative z-30">
//             <div className="bg-white/95 backdrop-blur-2xl p-4 sm:p-6 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-white/80 ring-4 ring-white/20 hover:ring-[#2048BD]/40 transition-all duration-300">
//               <Search
//                 search={search}
//                 setSearch={setSearch}
//                 category={category}
//                 setCategory={setCategory}
//                 location={location}
//                 setLocation={setLocation}
//               />
//             </div>
//           </div>
//         </section>

//         {/* ==========================================
//             STATS SECTION
//         ========================================== */}
//         <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
//             <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-16 h-16 bg-[#d5e7fe]/50 rounded-bl-full transition-all group-hover:scale-125"></div>
//               <h3 className="text-3xl sm:text-4xl font-black text-[#2048BD]">10K+</h3>
//               <p className="text-xs font-bold text-slate-500 mt-2 tracking-wider uppercase">Active Openings</p>
//             </div>

//             <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-16 h-16 bg-slate-100 rounded-bl-full transition-all group-hover:scale-125"></div>
//               <h3 className="text-3xl sm:text-4xl font-black text-[#111827]">500+</h3>
//               <p className="text-xs font-bold text-slate-500 mt-2 tracking-wider uppercase">Top Companies</p>
//             </div>

//             <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-16 h-16 bg-[#d5e7fe]/50 rounded-bl-full transition-all group-hover:scale-125"></div>
//               <h3 className="text-3xl sm:text-4xl font-black text-[#2048BD]">85K+</h3>
//               <p className="text-xs font-bold text-slate-500 mt-2 tracking-wider uppercase">Candidates</p>
//             </div>

//             <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full transition-all group-hover:scale-125"></div>
//               <div className="flex items-center gap-2">
//                 <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
//                 <h3 className="text-3xl sm:text-4xl font-black text-[#111827]">98%</h3>
//               </div>
//               <p className="text-xs font-bold text-slate-500 mt-2 tracking-wider uppercase">Selection Rate</p>
//             </div>
//           </div>
//         </section>

//         {/* ==========================================
//             POPULAR CATEGORIES WITH ANIMATIONS
//         ========================================== */}
//         <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//           <div className="flex flex-col items-center text-center mb-10">
//             <span className="bg-[#d5e7fe] text-[#1E40AF] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
//               Explore Fields
//             </span>
//             <h2 className="text-3xl sm:text-4xl font-black text-[#111827] mt-3">
//               Browse Top Categories
//             </h2>
//             <p className="text-slate-500 text-sm mt-2 max-w-md">
//               Find openings matching your exact domain, skills, and preference.
//             </p>
//           </div>

//           {/* Animated Glass Card Wrapper */}
//           <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-lg hover:border-[#d5e7fe] transition-all duration-500 hover:shadow-2xl">
//             <Category category={category} setCategory={setCategory} />
//           </div>
//         </section>

//         {/* ==========================================
//             FEATURED JOBS WITH SMOOTH ENTRANCE ANIMATIONS
//         ========================================== */}
//         <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4 border-b border-slate-200/80 pb-6">
//             <div>
//               <span className="bg-[#d5e7fe] text-[#1E40AF] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
//                 Latest Jobs
//               </span>
//               <h2 className="text-3xl sm:text-4xl font-black text-[#111827] mt-2">
//                 Featured Opportunities
//               </h2>
//             </div>

//             {(search || category || location) && (
//               <button
//                 onClick={() => {
//                   setSearch("");
//                   setCategory("");
//                   setLocation("");
//                 }}
//                 className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition shadow-sm hover:scale-105 active:scale-95"
//               >
//                 Clear Filters ✖
//               </button>
//             )}
//           </div>

//           {loading ? (
//             <div className="flex flex-col justify-center items-center py-24 space-y-4">
//               <div className="w-12 h-12 border-4 border-[#2048BD] border-t-transparent rounded-full animate-spin"></div>
//               <p className="text-[#2048BD] font-bold text-sm tracking-wide animate-pulse">
//                 Fetching latest job opportunities...
//               </p>
//             </div>
//           ) : (
//             <div className="transition-all duration-500 transform ease-in-out">
//               <FeaturedJobs jobs={filteredJobs} />
//             </div>
//           )}
//         </section>

//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";

// Components
import Navbar from "../../components/common/Navbar";
import Search from "../../components/common/SearchBar";
import Category from "../../components/common/CategoryList";
import FeaturedJobs from "../../components/common/FeaturedJobList";
import Footer from "../../components/common/Footer";

// Custom Styles
import "../../styles/home.css";

export default function Home() {
  // States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel Images
const bannerImages = [
  // 1. Team Workspace (Perfect Wide Angle)
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  
  // 2. Tech Developer Working on Laptop
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",

  // 3. Corporate Tech Interview Scene
  "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1200&q=80",
];
  // Auto Slider
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(slideTimer);
  }, [bannerImages.length]);

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
      (location ? job.location?.toLowerCase().includes(location.toLowerCase()) : true)
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
        <section className="relative bg-gradient-to-br from-[#111827] via-[#1E40AF] to-[#2048BD] pt-8 sm:pt-12 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Column Text Content */}
            <div className="lg:col-span-7 text-left text-white space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20 text-[11px] sm:text-xs font-semibold text-[#d5e7fe]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                #1 Job Portal Platform for Tech Talent
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-100 to-white">Dream Job</span> & Accelerate Career.
              </h1>

              <p className="text-slate-200 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
                Connect with top tech companies, explore verified opportunities, and get hired faster with TalentBridge.
              </p>

              {/* Trust Features */}
              <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3 sm:gap-5 text-[11px] sm:text-xs text-slate-300 font-semibold">
                <span className="flex items-center gap-1.5">✓ 100% Verified Employers</span>
                <span className="flex items-center gap-1.5">✓ Direct Hiring Process</span>
                <span className="flex items-center gap-1.5">✓ Instant Alerts</span>
              </div>
            </div>

            {/* Right Column: Image Banner Carousel */}
            <div className="lg:col-span-5 relative flex justify-center mt-2 lg:mt-0">
              <div className="relative w-full max-w-md sm:max-w-lg aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900">
                {bannerImages.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`TalentBridge Banner ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                      currentSlide === index ? "opacity-100 scale-105" : "opacity-0 scale-100"
                    }`}
                  />
                ))}
                
                {/* Floating Glass Badges */}
                <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl shadow-lg border border-white/80 flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[9px] text-slate-500 font-semibold uppercase">Job Selected</p>
                    <p className="text-[10px] sm:text-xs font-bold text-[#111827]">500+ Companies</p>
                  </div>
                </div>

                <div className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl shadow-md border border-white/80">
                  <p className="text-[8px] sm:text-[9px] text-slate-500 font-semibold uppercase">Active Hiring</p>
                  <p className="text-[10px] sm:text-xs font-black text-[#2048BD]">10k+ Live Roles</p>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              SEARCH BAR OVERLAP (RESPONSIVE POSITIONING)
          ========================================== */}
          <div className="max-w-5xl mx-auto relative -mb-36 sm:-mb-40 pt-8 sm:pt-10 z-30">
            <div className="bg-white p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100">
              <Search
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                location={location}
                setLocation={setLocation}
              />
            </div>
          </div>
        </section>

        {/* ==========================================
            STATS SECTION
        ========================================== */}
        <section className="pt-28 sm:pt-32 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="group bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-[#d5e7fe]/40 rounded-bl-full transition-all group-hover:scale-125" />
              <h3 className="text-2xl sm:text-4xl font-black text-[#2048BD]">10K+</h3>
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 mt-1.5 sm:mt-2 uppercase tracking-wider">Active Openings</p>
            </div>

            <div className="group bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-bl-full transition-all group-hover:scale-125" />
              <h3 className="text-2xl sm:text-4xl font-black text-[#111827]">500+</h3>
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 mt-1.5 sm:mt-2 uppercase tracking-wider">Top Employers</p>
            </div>

            <div className="group bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-[#d5e7fe]/40 rounded-bl-full transition-all group-hover:scale-125" />
              <h3 className="text-2xl sm:text-4xl font-black text-[#2048BD]">85K+</h3>
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 mt-1.5 sm:mt-2 uppercase tracking-wider">Candidates</p>
            </div>

            <div className="group bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 rounded-bl-full transition-all group-hover:scale-125" />
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-2xl sm:text-4xl font-black text-[#111827]">98%</h3>
              </div>
              <p className="text-[10px] sm:text-xs font-bold text-slate-500 mt-1.5 sm:mt-2 uppercase tracking-wider">Selection Rate</p>
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
            FEATURED JOBS
        ========================================== */}
        {/* <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 gap-3 sm:gap-4 border-b border-slate-200/80 pb-4 sm:pb-6">
            <div>
              <span className="bg-[#d5e7fe] text-[#1E40AF] text-[10px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest">
                Latest Jobs
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#111827] mt-1.5 sm:mt-2">
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
                className="bg-red-50 text-red-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition shadow-xs"
              >
                Clear Filters ✖
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center py-16 sm:py-20 space-y-3 sm:space-y-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-[#2048BD] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#2048BD] font-bold text-xs sm:text-sm">Fetching verified job posts...</p>
            </div>
          ) : (
            <div className="relative bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-md">
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-28 sm:h-28 bg-[#d5e7fe]/40 rounded-bl-full pointer-events-none" />
              <FeaturedJobs jobs={filteredJobs} />
            </div>
          )}
        </section> */}
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