import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

 // 1. Static Fallback Array (Unique Icons & Pre-formatted Text)
  const staticCategories = [
    {
      name: "Frontend Developer",
      label: "Frontend",
      count: "120+",
      icon: "💻",
    },
    { name: "Backend Developer", label: "Backend", count: "95+", icon: "⚙️" },
    { name: "Full Stack", label: "Full Stack", count: "150+", icon: "🚀" },
    { name: "MERN Stack", label: "MERN Stack", count: "80+", icon: "🌐" },
    { name: "Mobile App", label: "Mobile App", count: "45+", icon: "📱" },
    { name: "UI/UX Design", label: "UI/UX Design", count: "35+", icon: "🎨" },
    { name: "DevOps", label: "DevOps", count: "60+", icon: "☁️" },
    { name: "Database", label: "Database", count: "40+", icon: "🗄️" },
  ];

export default function CategoryList({ category, setCategory }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [loading, setLoading] = useState(true);


  // 2. Dynamic Fetching from Database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/jobs/categories",
        );

        // Agar DB se categories ka array mile aur khali na ho
        if (res.data && res.data.length > 0) {
          setCategories(res.data);
        } else {
          setCategories(staticCategories);
        }
      } catch (error) {
        console.warn(
          "DB disconnect / Error fetching categories, using static fallback:",
          error,
        );
        setCategories(staticCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Show 3 Categories initially (+ All Categories = 4 Boxes), or ALL when expanded
  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 3);

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
              category === ""
                ? "bg-white/20 text-white"
                : "bg-[#d5e7fe] text-[#1E40AF]"
            }`}
          >
            ⚡
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
              All Categories
            </h3>
            <p
              className={`text-[11px] sm:text-xs mt-1 font-medium ${category === "" ? "text-blue-100" : "text-slate-400"}`}
            >
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
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-[#d5e7fe] text-[#1E40AF]"
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
                  {typeof cat.count === "number"
                    ? `${cat.count} Jobs`
                    : `${cat.count} Jobs`}
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
            {showAllCategories
              ? "Show Less Categories ▲"
              : "View All Categories ▼"}
          </button>
        </div>
      )}
    </div>
  );
}
