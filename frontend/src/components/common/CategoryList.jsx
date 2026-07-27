// import "../../styles/home.css";
// import { Link } from "react-router-dom";

// export default function Category({ category, setCategory }) {
//   return (
//     <>
//       <section className="bg-gray-100 py-16">
//         <div className="max-w-7xl mx-auto px-5">
//           <h2 className="text-4xl font-bold text-center text-gray-800 mb-3">
//             Job Categories
//           </h2>

//           <p className="text-center text-gray-600 mb-12">
//             Explore various job categories to find your ideal job.
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               "Human Resources",
//               "Project Manager",
//               "Software Development",
//               "IT & Networking",
//               "Finance",
//               "Marketing",
//             ].map((cat, i) => (
//               <div
//                 key={i}
//                 className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300"
//               >
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-3">
//                   {cat}
//                 </h3>

//                 <p className="text-gray-500 mb-5">120+ Jobs Available</p>

//                 <Link
//                   to="/jobs"
//                   className="inline-block bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
//                 >
//                   Explore Jobs
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// ==========================================================================================

// import { useNavigate } from "react-router-dom";

// export default function CategoryList({ category, setCategory }) {
//   const navigate = useNavigate();

//   // Category Items List
//   const categories = [
//     { id: 1, name: "Frontend Developer", label: "Frontend", count: "120+ Jobs", icon: "💻" },
//     { id: 2, name: "Backend Developer", label: "Backend", count: "95+ Jobs", icon: "⚙️" },
//     { id: 3, name: "Full Stack", label: "Full Stack", count: "150+ Jobs", icon: "🚀" },
//     { id: 4, name: "MERN Stack", label: "MERN Stack", count: "80+ Jobs", icon: "🌐" },
//     { id: 5, name: "Mobile App", label: "Mobile App", count: "45+ Jobs", icon: "📱" },
//     { id: 6, name: "UI/UX Design", label: "UI/UX Design", count: "35+ Jobs", icon: "🎨" },
//     { id: 7, name: "DevOps", label: "DevOps", count: "60+ Jobs", icon: "☁️" },
//     { id: 8, name: "Database", label: "Database", count: "40+ Jobs", icon: "🗄️" },
//   ];

//   // Handler for category click + Navigation
//   const handleCategoryClick = (catName) => {
//     setCategory(catName);
//     if (catName) {
//       navigate(`/jobs?category=${encodeURIComponent(catName)}`);
//     } else {
//       navigate("/jobs");
//     }
//   };

//   return (
//     <div className="w-full space-y-6">
//       {/* Category Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
//         {/* All Category Option Button */}
//         <button
//           type="button"
//           onClick={() => handleCategoryClick("")}
//           className={`group p-5 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between relative overflow-hidden ${
//             category === ""
//               ? "bg-[#2048BD] text-white border-[#2048BD] shadow-lg shadow-blue-500/20 scale-[1.02]"
//               : "bg-white text-slate-800 border-slate-100 hover:border-[#2048BD]/40 hover:shadow-xl hover:-translate-y-1.5"
//           }`}
//         >
//           <div
//             className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg mb-3 transition-transform duration-300 group-hover:scale-110 ${
//               category === ""
//                 ? "bg-white/20 text-white"
//                 : "bg-[#d5e7fe] text-[#1E40AF]"
//             }`}
//           >
//             ⚡
//           </div>
//           <div>
//             <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
//               All Categories
//             </h3>
//             <p
//               className={`text-[11px] sm:text-xs mt-1 font-medium ${
//                 category === "" ? "text-blue-100" : "text-slate-400"
//               }`}
//             >
//               Browse All Jobs
//             </p>
//           </div>
//         </button>

//         {/* Dynamic Category List */}
//         {categories.map((cat) => {
//           const isSelected = category === cat.name || category === cat.label;

//           return (
//             <button
//               key={cat.id}
//               type="button"
//               onClick={() => handleCategoryClick(cat.name)}
//               className={`group p-5 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between relative overflow-hidden ${
//                 isSelected
//                   ? "bg-[#2048BD] text-white border-[#2048BD] shadow-lg shadow-blue-500/20 scale-[1.02]"
//                   : "bg-white text-slate-800 border-slate-100 hover:border-[#2048BD]/40 hover:shadow-xl hover:-translate-y-1.5"
//               }`}
//             >
//               {/* Corner Ambient Glow */}
//               <div
//                 className={`absolute -top-10 -right-10 w-20 h-20 rounded-full transition-all duration-500 group-hover:scale-150 ${
//                   isSelected ? "bg-white/10" : "bg-[#d5e7fe]/40"
//                 }`}
//               />

//               {/* Icon Container */}
//               <div
//                 className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg mb-3 transition-transform duration-300 group-hover:scale-110 relative z-10 ${
//                   isSelected
//                     ? "bg-white/20 text-white"
//                     : "bg-[#d5e7fe] text-[#1E40AF]"
//                 }`}
//               >
//                 {cat.icon}
//               </div>

//               {/* Category Title & Item Counter */}
//               <div className="relative z-10">
//                 <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
//                   {cat.label}
//                 </h3>
//                 <p
//                   className={`text-[11px] sm:text-xs mt-1 font-medium ${
//                     isSelected ? "text-blue-100" : "text-slate-400"
//                   }`}
//                 >
//                   {cat.count}
//                 </p>
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       {/* Explore All Jobs Redirect Button */}
//       <div className="flex justify-center pt-4">
//         <button
//           onClick={() => navigate("/jobs")}
//           className="bg-[#2048BD] hover:bg-[#1E40AF] text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
//         >
//           Explore All Jobs ➔
//         </button>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CategoryList({ category, setCategory }) {
//   const navigate = useNavigate();

//   // State to toggle between showing partial vs all categories on Home page
//   const [showAllCategories, setShowAllCategories] = useState(false);

//   // // Full Category Items List
//   // const categories = [
//   //   { id: 1, name: "Frontend Developer", label: "Frontend", count: "120+ Jobs", icon: "💻" },
//   //   { id: 2, name: "Backend Developer", label: "Backend", count: "95+ Jobs", icon: "⚙️" },
//   //   { id: 3, name: "Full Stack", label: "Full Stack", count: "150+ Jobs", icon: "🚀" },
//   //   { id: 4, name: "MERN Stack", label: "MERN Stack", count: "80+ Jobs", icon: "🌐" },
//   //   { id: 5, name: "Mobile App", label: "Mobile App", count: "45+ Jobs", icon: "📱" },
//   //   { id: 6, name: "UI/UX Design", label: "UI/UX Design", count: "35+ Jobs", icon: "🎨" },
//   //   { id: 7, name: "DevOps", label: "DevOps", count: "60+ Jobs", icon: "☁️" },
//   //   { id: 8, name: "Database", label: "Database", count: "40+ Jobs", icon: "🗄️" },
//   // ];

//   // Dynamic Categories Fetching from Backend
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         // Backend API call (Jahan se DB ka category data aayega)
//         const res = await axios.get("http://localhost:5000/api/jobs/categories");
//         setCategories(res.data); 
//         // Expected format from DB: [{ name: "Frontend", count: 12 }, ...]
//       } catch (error) {
//         console.log("DB connection error, using fallback categories", error);
//         // Fallback static array (agar DB off ho)
//         setCategories([
//           { name: "Frontend Developer", count: 12 },
//           { name: "Backend Developer", count: 8 },
//           { name: "Full Stack", count: 15 },
//           { name: "MERN Stack", count: 10 },
//           { name: "Mobile App", count: 5 },
//         ]);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Logic: Show top 3 categories (+ All Categories = 4 boxes) initially, or ALL when expanded
//   const visibleCategories = showAllCategories ? categories : categories.slice(0, 3);

//   // Category Click Handler -> State set karke Direct /jobs page par redirect
//   const handleCategoryClick = (catName) => {
//     setCategory(catName);
//     if (catName) {
//       navigate(`/jobs?category=${encodeURIComponent(catName)}`);
//     } else {
//       navigate("/jobs");
//     }
//   };

//   return (
//     <div className="w-full space-y-6">
//       {/* Category Cards Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        
//         {/* 1. All Categories Box */}
//         <button
//           type="button"
//           onClick={() => handleCategoryClick("")}
//           className={`group p-5 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between relative overflow-hidden ${
//             category === ""
//               ? "bg-[#2048BD] text-white border-[#2048BD] shadow-lg shadow-blue-500/20 scale-[1.02]"
//               : "bg-white text-slate-800 border-slate-100 hover:border-[#2048BD]/40 hover:shadow-xl hover:-translate-y-1.5"
//           }`}
//         >
//           <div
//             className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg mb-3 transition-transform duration-300 group-hover:scale-110 ${
//               category === ""
//                 ? "bg-white/20 text-white"
//                 : "bg-[#d5e7fe] text-[#1E40AF]"
//             }`}
//           >
//             ⚡
//           </div>
//           <div>
//             <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
//               All Categories
//             </h3>
//             <p
//               className={`text-[11px] sm:text-xs mt-1 font-medium ${
//                 category === "" ? "text-blue-100" : "text-slate-400"
//               }`}
//             >
//               Browse All Jobs
//             </p>
//           </div>
//         </button>

//         {/* 2. Dynamic Categories (Initial: 3 Boxes, Expanded: All Boxes) */}
//         {visibleCategories.map((cat) => {
//           const isSelected = category === cat.name || category === cat.label;

//           return (
//             <button
//               key={cat.id}
//               type="button"
//               onClick={() => handleCategoryClick(cat.name)}
//               className={`group p-5 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between relative overflow-hidden ${
//                 isSelected
//                   ? "bg-[#2048BD] text-white border-[#2048BD] shadow-lg shadow-blue-500/20 scale-[1.02]"
//                   : "bg-white text-slate-800 border-slate-100 hover:border-[#2048BD]/40 hover:shadow-xl hover:-translate-y-1.5"
//               }`}
//             >
//               {/* Corner Ambient Glow */}
//               <div
//                 className={`absolute -top-10 -right-10 w-20 h-20 rounded-full transition-all duration-500 group-hover:scale-150 ${
//                   isSelected ? "bg-white/10" : "bg-[#d5e7fe]/40"
//                 }`}
//               />

//               {/* Icon */}
//               <div
//                 className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg mb-3 transition-transform duration-300 group-hover:scale-110 relative z-10 ${
//                   isSelected
//                     ? "bg-white/20 text-white"
//                     : "bg-[#d5e7fe] text-[#1E40AF]"
//                 }`}
//               >
//                 {cat.icon}
//               </div>

//               {/* Title & Count */}
//               <div className="relative z-10">
//                 <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
//                   {cat.label}
//                 </h3>
//                 <p
//                   className={`text-[11px] sm:text-xs mt-1 font-medium ${
//                     isSelected ? "text-blue-100" : "text-slate-400"
//                   }`}
//                 >
//                   {cat.count}
//                 </p>
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       {/* Single Toggle View All Categories Button */}
//       <div className="flex justify-center pt-2">
//         <button
//           type="button"
//           onClick={() => setShowAllCategories(!showAllCategories)}
//           className="bg-[#2048BD] hover:bg-[#1E40AF] text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
//         >
//           {showAllCategories ? "Show Less Categories ▲" : "View All Categories ▼"}
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function CategoryList({ category, setCategory }) {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [showAllCategories, setShowAllCategories] = useState(false);

//   // Dynamic Categories Fetching from Backend
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         // Backend API call (Jahan se DB ka category data aayega)
//         const res = await axios.get("http://localhost:5000/api/jobs/categories");
//         setCategories(res.data); 
//         // Expected format from DB: [{ name: "Frontend", count: 12 }, ...]
//       } catch (error) {
//         console.log("DB connection error, using fallback categories", error);
//         // Fallback static array (agar DB off ho)
//      setCategories([
//   {
//     id: 1,
//     name: "Frontend Developer",
//     label: "Frontend",
//     count: "120+ Jobs",
//     icon: "💻",
//     description: "React, Vue, Tailwind UIs"
//   },
//   {
//     id: 2,
//     name: "Backend Developer",
//     label: "Backend",
//     count: "95+ Jobs",
//     icon: "⚙️",
//     description: "Node.js, Express, REST APIs"
//   },
//   {
//     id: 3,
//     name: "Full Stack",
//     label: "Full Stack",
//     count: "150+ Jobs",
//     icon: "🚀",
//     description: "Complete Web Engineering"
//   },
//   {
//     id: 4,
//     name: "MERN Stack",
//     label: "MERN Stack",
//     count: "80+ Jobs",
//     icon: "🌐",
//     description: "Mongo, Express, React, Node"
//   },
//   {
//     id: 5,
//     name: "Mobile App",
//     label: "Mobile App",
//     count: "45+ Jobs",
//     icon: "📱",
//     description: "React Native & Flutter"
//   },
//   {
//     id: 6,
//     name: "UI/UX Design",
//     label: "UI/UX Design",
//     count: "35+ Jobs",
//     icon: "🎨",
//     description: "Figma & Product Design"
//   },
//   {
//     id: 7,
//     name: "DevOps",
//     label: "DevOps",
//     count: "60+ Jobs",
//     icon: "☁️",
//     description: "AWS, Docker, CI/CD"
//   },
//   {
//     id: 8,
//     name: "Database",
//     label: "Database",
//     count: "40+ Jobs",
//     icon: "🗄️",
//     description: "MongoDB, PostgreSQL, SQL"
//   }
// ]);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const visibleCategories = showAllCategories ? categories : categories.slice(0, 3);

//   const handleCategoryClick = (catName) => {
//     setCategory(catName);
//     if (catName) {
//       navigate(`/jobs?category=${encodeURIComponent(catName)}`);
//     } else {
//       navigate("/jobs");
//     }
//   };

//   return (
//     <div className="w-full space-y-6">
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
//         {/* All Categories Option */}
//         <button
//           type="button"
//           onClick={() => handleCategoryClick("")}
//           className={`group p-5 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between relative overflow-hidden ${
//             category === ""
//               ? "bg-[#2048BD] text-white border-[#2048BD] shadow-lg shadow-blue-500/20 scale-[1.02]"
//               : "bg-white text-slate-800 border-slate-100 hover:border-[#2048BD]/40 hover:shadow-xl hover:-translate-y-1.5"
//           }`}
//         >
//           <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg mb-3 bg-[#d5e7fe] text-[#1E40AF]">
//             ⚡
//           </div>
//           <div>
//             <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
//               All Categories
//             </h3>
//             <p className="text-[11px] sm:text-xs mt-1 font-medium text-slate-400">
//               Browse All Jobs
//             </p>
//           </div>
//         </button>

//         {/* Dynamic MongoDB Categories */}
//         {visibleCategories.map((cat, index) => {
//           const isSelected = category === cat.name;

//           return (
//             <button
//               key={index}
//               type="button"
//               onClick={() => handleCategoryClick(cat.name)}
//               className={`group p-5 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between relative overflow-hidden ${
//                 isSelected
//                   ? "bg-[#2048BD] text-white border-[#2048BD] shadow-lg shadow-blue-500/20 scale-[1.02]"
//                   : "bg-white text-slate-800 border-slate-100 hover:border-[#2048BD]/40 hover:shadow-xl hover:-translate-y-1.5"
//               }`}
//             >
//               <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg mb-3 bg-[#d5e7fe] text-[#1E40AF]">
//                 💼
//               </div>

//               <div>
//                 <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
//                   {cat.name}
//                 </h3>
//                 <p className={`text-[11px] sm:text-xs mt-1 font-medium ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
//                   {cat.count} {cat.count === 1 ? "Job" : "Jobs"}
//                 </p>
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       {/* Toggle View Button */}
//       {categories.length > 3 && (
//         <div className="flex justify-center pt-2">
//           <button
//             type="button"
//             onClick={() => setShowAllCategories(!showAllCategories)}
//             className="bg-[#2048BD] hover:bg-[#1E40AF] text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
//           >
//             {showAllCategories ? "Show Less Categories ▲" : "View All Categories ▼"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CategoryList({ category, setCategory }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Static Fallback Array (Unique Icons & Pre-formatted Text)
  const staticCategories = [
    { name: "Frontend Developer", label: "Frontend", count: "120+", icon: "💻" },
    { name: "Backend Developer", label: "Backend", count: "95+", icon: "⚙️" },
    { name: "Full Stack", label: "Full Stack", count: "150+", icon: "🚀" },
    { name: "MERN Stack", label: "MERN Stack", count: "80+", icon: "🌐" },
    { name: "Mobile App", label: "Mobile App", count: "45+", icon: "📱" },
    { name: "UI/UX Design", label: "UI/UX Design", count: "35+", icon: "🎨" },
    { name: "DevOps", label: "DevOps", count: "60+", icon: "☁️" },
    { name: "Database", label: "Database", count: "40+", icon: "🗄️" },
  ];

  // 2. Dynamic Fetching from Database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs/categories");
        
        // Agar DB se categories ka array mile aur khali na ho
        if (res.data && res.data.length > 0) {
          setCategories(res.data);
        } else {
          setCategories(staticCategories);
        }
      } catch (error) {
        console.warn("DB disconnect / Error fetching categories, using static fallback:", error);
        setCategories(staticCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Show 3 Categories initially (+ All Categories = 4 Boxes), or ALL when expanded
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 3);

  // Category Click Handler -> Navigation to /jobs
  const handleCategoryClick = (catName) => {
    setCategory(catName);
    if (catName) {
      navigate(`/jobs?category=${encodeURIComponent(catName)}`);
    } else {
      navigate("/jobs");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-4 border-[#2048BD] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        
        {/* All Categories Option Box */}
        <button
          type="button"
          onClick={() => handleCategoryClick("")}
          className={`group p-5 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between relative overflow-hidden ${
            category === ""
              ? "bg-[#2048BD] text-white border-[#2048BD] shadow-lg shadow-blue-500/20 scale-[1.02]"
              : "bg-white text-slate-800 border-slate-100 hover:border-[#2048BD]/40 hover:shadow-xl hover:-translate-y-1.5"
          }`}
        >
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg mb-3 ${
              category === "" ? "bg-white/20 text-white" : "bg-[#d5e7fe] text-[#1E40AF]"
            }`}
          >
            ⚡
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
              All Categories
            </h3>
            <p className={`text-[11px] sm:text-xs mt-1 font-medium ${category === "" ? "text-blue-100" : "text-slate-400"}`}>
              Browse All Jobs
            </p>
          </div>
        </button>

        {/* Categories (Dynamic DB + Static Fallback) */}
        {visibleCategories.map((cat, index) => {
          const catName = cat.name || cat.label;
          const isSelected = category === catName || category === cat.label;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleCategoryClick(catName)}
              className={`group p-5 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between relative overflow-hidden ${
                isSelected
                  ? "bg-[#2048BD] text-white border-[#2048BD] shadow-lg shadow-blue-500/20 scale-[1.02]"
                  : "bg-white text-slate-800 border-slate-100 hover:border-[#2048BD]/40 hover:shadow-xl hover:-translate-y-1.5"
              }`}
            >
              {/* Corner Ambient Glow */}
              <div
                className={`absolute -top-10 -right-10 w-20 h-20 rounded-full transition-all duration-500 group-hover:scale-150 ${
                  isSelected ? "bg-white/10" : "bg-[#d5e7fe]/40"
                }`}
              />

              {/* Dynamic Icon */}
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg mb-3 transition-transform duration-300 group-hover:scale-110 relative z-10 ${
                  isSelected ? "bg-white/20 text-white" : "bg-[#d5e7fe] text-[#1E40AF]"
                }`}
              >
                {cat.icon || "💼"}
              </div>

              {/* Title & Jobs Count */}
              <div className="relative z-10">
                <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
                  {cat.label || cat.name}
                </h3>
                <p
                  className={`text-[11px] sm:text-xs mt-1 font-medium ${
                    isSelected ? "text-blue-100" : "text-slate-400"
                  }`}
                >
                  {typeof cat.count === "number" ? `${cat.count} Jobs` : `${cat.count} Jobs`}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Toggle View All Categories Button */}
      {categories.length > 3 && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="bg-[#2048BD] hover:bg-[#1E40AF] text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
          >
            {showAllCategories ? "Show Less Categories ▲" : "View All Categories ▼"}
          </button>
        </div>
      )}
    </div>
  );
}