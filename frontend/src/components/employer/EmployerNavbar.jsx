import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Menu,
  X,
  Bell,
  ChevronDown,
  User,
  Edit3,
  LogOut,
  LayoutDashboard,
  PlusSquare,
  Briefcase,
  FileText,
} from "lucide-react";

export default function EmployerNavbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Retrieve user object from Local Storage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Comprehensive async Logout handler to clear Backend cookies and Frontend storage
  const logout = async () => {
    try {
      // Step 1: Request backend to destroy HTTP-only session cookies
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout API request failed:", error);
    } finally {
      // Step 2: Clear user payload from localStorage
      localStorage.removeItem("user");
      localStorage.clear();

      // Step 3: Redirect user to the login screen
      navigate("/login");
    }
  };

  // NavLink CSS class generator for Desktop menu
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 text-xs font-semibold transition-all duration-200 ${
      isActive
        ? "text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl shadow-xs"
        : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100/80 px-3 py-1.5 rounded-xl"
    }`;

  // NavLink CSS class generator for Mobile drawer
  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition ${
      isActive
        ? "bg-indigo-600 text-white shadow-sm"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <>
      {/* Pinned Fixed Top Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-800 shadow-xs">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo & Portal Name */}
            <div className="flex items-center shrink-0">
              <Link to="/employer" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-indigo-800 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                  {user?.first_name ? user.first_name.charAt(0).toUpperCase() : "E"}
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight leading-none">
                    TalentBridge
                  </h2>
                  <p className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-600 mt-0.5">
                    Employer Portal
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center justify-center gap-1.5">
              <NavLink to="/employer" end className={navLinkClass}>
                <LayoutDashboard size={15} />
                Dashboard
              </NavLink>

              <NavLink to="/employer/create-job" className={navLinkClass}>
                <PlusSquare size={15} />
                Post Job
              </NavLink>

              <NavLink to="/employer/my-jobs" className={navLinkClass}>
                <Briefcase size={15} />
                My Jobs
              </NavLink>

              <NavLink to="/employer/applications" className={navLinkClass}>
                <FileText size={15} />
                Applications
              </NavLink>
            </div>

            {/* Right Header Actions: Notifications & Profile Trigger */}
            <div className="hidden lg:flex items-center justify-end gap-3 shrink-0">
              <button className="relative p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition cursor-pointer">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
              </button>

              <div className="h-5 w-px bg-slate-200" />

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition cursor-pointer"
                >
                  <img
                    src={
                      user?.profileImage ||
                      `https://ui-avatars.com/api/?name=${user?.first_name || "Employer"}+${user?.last_name || ""}&background=4f46e5&color=fff`
                    }
                    alt="Profile Avatar"
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/20"
                  />
                  <div className="text-left hidden sm:block">
                    <h3 className="font-bold text-xs text-slate-900 leading-tight">
                      {user?.first_name} {user?.last_name}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {user?.company || "Employer"}
                    </p>
                  </div>
                  <ChevronDown
                    size={15}
                    className={`text-slate-400 transition-transform duration-200 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {profileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-lg py-2 z-50 text-slate-700"
                    onMouseLeave={() => setProfileOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-900">
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate font-medium">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      to="/employer/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600 font-bold transition"
                    >
                      <User size={15} /> My Profile
                    </Link>

                    <Link
                      to="/employer/profile/edit"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600 font-bold transition"
                    >
                      <Edit3 size={15} /> Edit Profile
                    </Link>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-bold transition text-left cursor-pointer"
                    >
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Drawer Navigation Trigger */}
            <button
              className="lg:hidden p-1.5 rounded-xl text-slate-600 hover:bg-slate-100"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-md">
            <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
              <img
                src={
                  user?.profileImage ||
                  `https://ui-avatars.com/api/?name=${user?.first_name || "Employer"}+${user?.last_name || ""}&background=4f46e5&color=fff`
                }
                alt="Profile Avatar"
                className="w-10 h-10 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  {user?.first_name} {user?.last_name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {user?.company || "Employer"}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <NavLink
                to="/employer"
                end
                onClick={() => setMobileOpen(false)}
                className={mobileNavLinkClass}
              >
                <LayoutDashboard size={16} /> Dashboard
              </NavLink>

              <NavLink
                to="/employer/create-job"
                onClick={() => setMobileOpen(false)}
                className={mobileNavLinkClass}
              >
                <PlusSquare size={16} /> Post Job
              </NavLink>

              <NavLink
                to="/employer/my-jobs"
                onClick={() => setMobileOpen(false)}
                className={mobileNavLinkClass}
              >
                <Briefcase size={16} /> My Jobs
              </NavLink>

              <NavLink
                to="/employer/applications"
                onClick={() => setMobileOpen(false)}
                className={mobileNavLinkClass}
              >
                <FileText size={16} /> Applications
              </NavLink>

              <NavLink
                to="/employer/profile"
                onClick={() => setMobileOpen(false)}
                className={mobileNavLinkClass}
              >
                <User size={16} /> My Profile
              </NavLink>

              <NavLink
                to="/employer/profile/edit"
                onClick={() => setMobileOpen(false)}
                className={mobileNavLinkClass}
              >
                <Edit3 size={16} /> Edit Profile
              </NavLink>
            </div>

            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition cursor-pointer"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </header>

      {/* Invisible Spacer Element to prevent Content Overlapping */}
      <div className="h-16 w-full shrink-0" />
    </>
  );
}

