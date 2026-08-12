// ===============================================
// React & Router Imports
// ===============================================
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// ===============================================
// Icons & Utils
// ===============================================
import {
  Bell,
  Heart,
  Briefcase,
  User,
  ChevronDown,
  Menu,
  X,
  // LogOut,
  UserCheck,
} from "lucide-react";
import { roleLabel } from "../../utils/RoleLabel";

// ===============================================
// User Dashboard Component
// ===============================================
export default function UserDashboard() {
  // ---------------------------------------------
  // States
  // ---------------------------------------------
  const navigate = useNavigate();
  // const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // ---------------------------------------------
  // Fetch Logged In User
  // ---------------------------------------------
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  // Logout Handler
//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/auth/logout",
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       setUser(null);
//       setMenuOpen(false);
//       navigate("/login");
//     } catch (error) {
//       console.log(error);
//     }
//   };

// Logout Handler
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      // setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      // Agar backend logout API fail bhi ho jaye, toh bhi user ko login page par bhejne ke liye:
      localStorage.removeItem("user");
      navigate("/login");
    }
  };



  // ---------------------------------------------
  // Loading Screen
  // ---------------------------------------------
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#2048BD] border-t-transparent rounded-full animate-spin" />
        <h1 className="text-[#2048BD] font-bold text-sm mt-4 animate-pulse">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  // ---------------------------------------------
  // JSX
  // ---------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 w-full flex flex-col font-sans">
      
      {/* ==========================================
          NAVBAR (TalentBridge Theme - Full Width)
      ========================================== */}
      <header className="sticky top-0 z-50 bg-[#111827]/95 backdrop-blur-xl shadow-lg border-b border-slate-800 w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 h-20 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-1">
            Talent<span className="text-[#d5e7fe]">Bridge</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/jobs" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
              Jobs
            </Link>
            <Link to="/companies" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
              Companies
            </Link>
          </nav>

          {/* Header Action Section */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* Notification Icon */}
            <button className="relative p-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </button>

            {/* Saved Jobs Icon */}
            <button className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-red-400 transition-all hidden sm:block">
              <Heart size={20} />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 focus:outline-none bg-slate-800 hover:bg-slate-700 pl-2 pr-3 py-1.5 rounded-full transition-all"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=2048BD&color=fff`}
                  alt="profile"
                  className="w-8 h-8 rounded-full border border-[#2048BD]"
                />
                <div className="hidden md:block text-left">
                  <h3 className="font-bold text-xs text-white leading-tight">
                    {user.first_name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {roleLabel[user.role] || "User"}
                  </p>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {/* Minimal Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                  <Link
                    to="/user/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <UserCheck size={16} className="text-[#2048BD]" />
                    My Profile
                  </Link>

        

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 text-left px-4 py-3 text-sm font-bold hover:bg-red-50 text-red-600 transition border-t border-slate-100"
                    >
                    Logout
                    </button>
                
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-slate-300 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          MAIN DASHBOARD BODY (Full Width)
      ========================================== */}
      <main className="w-full flex-grow px-4 sm:px-8 lg:px-12 py-8 space-y-10">
        
        {/* HERO SECTION */}
        <section className="w-full">
          <div className="bg-gradient-to-br from-[#111827] via-[#1E40AF] to-[#2048BD] rounded-3xl p-8 sm:p-12 text-white shadow-lg relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2048BD]/50 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Welcome Back, {user.first_name}! 👋
              </h1>
              <p className="mt-3 text-sm sm:text-base font-medium text-blue-200 max-w-xl">
                Track your job applications, explore new opportunities, and manage your professional profile effortlessly.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/jobs"
                  className="bg-white text-[#2048BD] px-6 py-3 rounded-xl font-extrabold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Browse Jobs
                </Link>
                {/* <Link
                  to="/user/profile"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl font-extrabold text-sm hover:bg-white/20 transition-all"
                >
                  Edit Profile
                </Link> */}
              </div>
            </div>
          </div>
        </section>

        {/* DASHBOARD STATS */}
        <section className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:border-[#2048BD]/30 hover:shadow-md transition-all">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Applied Jobs</p>
                  <h2 className="text-3xl font-black text-slate-800 mt-1">12</h2>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2048BD] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase size={24} />
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:border-red-400/30 hover:shadow-md transition-all">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Saved Jobs</p>
                  <h2 className="text-3xl font-black text-slate-800 mt-1">8</h2>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart size={24} />
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:border-emerald-400/30 hover:shadow-md transition-all">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Interviews</p>
                  <h2 className="text-3xl font-black text-slate-800 mt-1">3</h2>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <User size={24} />
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:border-amber-400/30 hover:shadow-md transition-all">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Alerts</p>
                  <h2 className="text-3xl font-black text-slate-800 mt-1">5</h2>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bell size={24} />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* RECENT APPLICATIONS */}
        <section className="w-full">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <span>📄</span> Recent Applications
              </h2>
              <Link to="/applications" className="text-[#2048BD] font-bold text-xs hover:underline bg-blue-50 px-3 py-1.5 rounded-lg">
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="py-3 font-bold pr-6">Company</th>
                    <th className="py-3 font-bold pr-6">Position</th>
                    <th className="py-3 font-bold pr-6">Location</th>
                    <th className="py-3 font-bold pr-6">Status</th>
                    <th className="py-3 font-bold">Applied On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  
                  <tr className="hover:bg-slate-50/50 transition">
                    <td className="py-4 font-bold text-slate-800 pr-6">Google</td>
                    <td className="py-4 font-medium text-slate-600 pr-6">MERN Stack Developer</td>
                    <td className="py-4 text-slate-500 pr-6">Bangalore</td>
                    <td className="py-4 pr-6">
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Pending</span>
                    </td>
                    <td className="py-4 text-slate-400 font-medium">15 Jul 2026</td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 transition">
                    <td className="py-4 font-bold text-slate-800 pr-6">Microsoft</td>
                    <td className="py-4 font-medium text-slate-600 pr-6">React Developer</td>
                    <td className="py-4 text-slate-500 pr-6">Hyderabad</td>
                    <td className="py-4 pr-6">
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Shortlisted</span>
                    </td>
                    <td className="py-4 text-slate-400 font-medium">10 Jul 2026</td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 transition">
                    <td className="py-4 font-bold text-slate-800 pr-6">Amazon</td>
                    <td className="py-4 font-medium text-slate-600 pr-6">Frontend Developer</td>
                    <td className="py-4 text-slate-500 pr-6">Noida</td>
                    <td className="py-4 pr-6">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">Interview</span>
                    </td>
                    <td className="py-4 text-slate-400 font-medium">08 Jul 2026</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* RECOMMENDED JOBS */}
        <section className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <span>🎯</span> Recommended Jobs
            </h2>
            <Link to="/jobs" className="text-[#2048BD] font-bold text-xs hover:underline bg-blue-50 px-3 py-1.5 rounded-lg">
              Explore More
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {/* Job Card 1 */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 hover:shadow-md hover:border-[#2048BD]/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black text-slate-800">MERN Developer</h3>
                    <p className="text-[#2048BD] font-bold text-sm mt-0.5">Google</p>
                  </div>
                  <button className="text-slate-300 hover:text-red-500 transition-colors">
                    <Heart size={20} />
                  </button>
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Full Time</span>
                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Remote</span>
                </div>
                <p className="mt-4 text-slate-800 text-sm font-extrabold">₹12 LPA</p>
              </div>
              <Link to="/jobs" className="mt-6 block bg-[#2048BD] text-white text-center py-2.5 rounded-xl text-sm font-bold hover:bg-[#1E40AF] transition-colors shadow-md shadow-blue-500/20">
                Apply Now
              </Link>
            </div>

            {/* Job Card 2 */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 hover:shadow-md hover:border-[#2048BD]/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black text-slate-800">React Developer</h3>
                    <p className="text-[#2048BD] font-bold text-sm mt-0.5">Microsoft</p>
                  </div>
                  <button className="text-slate-300 hover:text-red-500 transition-colors">
                    <Heart size={20} />
                  </button>
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Hybrid</span>
                  <span className="bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Experienced</span>
                </div>
                <p className="mt-4 text-slate-800 text-sm font-extrabold">₹15 LPA</p>
              </div>
              <Link to="/jobs" className="mt-6 block bg-[#2048BD] text-white text-center py-2.5 rounded-xl text-sm font-bold hover:bg-[#1E40AF] transition-colors shadow-md shadow-blue-500/20">
                Apply Now
              </Link>
            </div>

            {/* Job Card 3 */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 hover:shadow-md hover:border-[#2048BD]/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black text-slate-800">Node.js Developer</h3>
                    <p className="text-[#2048BD] font-bold text-sm mt-0.5">Infosys</p>
                  </div>
                  <button className="text-slate-300 hover:text-red-500 transition-colors">
                    <Heart size={20} />
                  </button>
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Full Time</span>
                  <span className="bg-purple-50 text-purple-600 border border-purple-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Fresher</span>
                </div>
                <p className="mt-4 text-slate-800 text-sm font-extrabold">₹8 LPA</p>
              </div>
              <Link to="/jobs" className="mt-6 block bg-[#2048BD] text-white text-center py-2.5 rounded-xl text-sm font-bold hover:bg-[#1E40AF] transition-colors shadow-md shadow-blue-500/20">
                Apply Now
              </Link>
            </div>

          </div>
        </section>

        {/* ACTIVITY & TIPS */}
        <section className="w-full">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">
              <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                <span>🔔</span> Activity Log
              </h2>
              <div className="space-y-6">
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                    📄
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-700">Resume Uploaded Successfully</h3>
                    <p className="text-slate-400 text-xs font-medium mt-0.5">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
                    💼
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-700">Applied for React Developer</h3>
                    <p className="text-slate-400 text-xs font-medium mt-0.5">Yesterday</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
                    ✏️
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-700">Profile Updated</h3>
                    <p className="text-slate-400 text-xs font-medium mt-0.5">3 Days Ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Career Tips */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">
              <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                <span>💡</span> Career Tips
              </h2>
              <div className="space-y-4">
                
                <div className="bg-[#d5e7fe]/40 rounded-2xl p-5 border border-[#d5e7fe]">
                  <h3 className="font-bold text-[#1E40AF] text-sm flex items-center gap-2">
                    Complete Your Profile
                  </h3>
                  <p className="text-slate-600 text-xs font-medium mt-2 leading-relaxed">
                    Recruiters are more likely to contact candidates with a 100% complete profile. Add your skills and latest experience!
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                  <h3 className="font-bold text-emerald-700 text-sm flex items-center gap-2">
                    Tailor Your Resume
                  </h3>
                  <p className="text-slate-600 text-xs font-medium mt-2 leading-relaxed">
                    Always update your resume to highlight the skills matching the job description before applying.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ==========================================
          FOOTER (TalentBridge Theme - Full Width)
      ========================================== */}
      <footer className="bg-[#111827] text-slate-400 w-full mt-auto py-8">
        <div className="w-full px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-black text-white tracking-tight">
              Talent<span className="text-[#d5e7fe]">Bridge</span>
            </h2>
            <p className="text-xs font-medium mt-1 text-slate-500">
              © {new Date().getFullYear()} Designed with ❤️ by Sandhya.
            </p>
          </div>

          <div className="flex gap-6 text-sm font-bold">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/jobs" className="hover:text-white transition-colors">Jobs</Link>
            <Link to="/user/profile" className="hover:text-white transition-colors">Profile</Link>
          </div>

        </div>
      </footer>
    </div>
  );
}
