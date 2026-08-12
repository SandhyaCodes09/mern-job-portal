import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { roleLabel } from "../../utils/RoleLabel";

export default function Navbar() {
  // States
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeMenu, setResumeMenu] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Fetch Logged In User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

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
      setUser(null);
      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-[#0f172a]/95 backdrop-blur-md border-b border-indigo-900/50 shadow-md">
      {/* Container Layout */}
      <div className="w-full px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* ================= LEFT CORNER: LOGO ================= */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-1 shrink-0 group"
        >
          Talent<span className="text-indigo-400 group-hover:text-cyan-400 transition-colors">Bridge</span>
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-slate-300 hover:text-white text-2xl md:hidden p-1.5 focus:outline-none cursor-pointer"
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* ================= RIGHT CORNER: NAV LINKS ================= */}
        <nav
          className={`
            ${menuOpen ? "flex" : "hidden"}
            md:flex
            flex-col md:flex-row
            items-start md:items-center
            gap-4 md:gap-7
            absolute md:static
            top-full left-0
            w-full md:w-auto
            bg-[#0f172a] md:bg-transparent
            px-6 py-6 md:p-0
            border-b border-indigo-900/40 md:border-none
            shadow-xl md:shadow-none
            transition-all duration-300
          `}
        >
          {/* Home Link */}
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-sm font-bold transition-colors outline-none focus:outline-none ${
                isActive
                  ? "text-indigo-400 border-b-2 border-indigo-400 pb-0.5"
                  : "text-slate-300 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>

          {/* Jobs Link */}
          <NavLink
            to="/jobs"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-sm font-bold transition-colors outline-none focus:outline-none ${
                isActive
                  ? "text-indigo-400 border-b-2 border-indigo-400 pb-0.5"
                  : "text-slate-300 hover:text-white"
              }`
            }
          >
            Jobs
          </NavLink>

          {/* Logged In User Section */}
          {user ? (
            <>
              {/* Dashboard Link */}
              <NavLink
                to={user.role === "employer" ? "/employer" : "/user"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all outline-none focus:outline-none ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                  }`
                }
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {user.first_name} ({roleLabel[user.role] || user.role})
              </NavLink>

              {/* Resume Dropdown (Job Seekers Only) */}
              {user.role !== "employer" && (
                <div className="relative w-full md:w-auto">
                  <button
                    onClick={() => setResumeMenu(!resumeMenu)}
                    className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white flex items-center gap-1.5 py-1 cursor-pointer focus:outline-none"
                  >
                    <span>📄 Resume</span>
                    <span className="text-[10px]">▼</span>
                  </button>

                  {resumeMenu && (
                    <div className="md:absolute right-0 mt-2 w-56 rounded-2xl bg-white text-slate-800 shadow-2xl border border-slate-100 overflow-hidden z-50">
                      {user.resume ? (
                        <>
                          <a
                            href={`http://localhost:5000/uploads/resumes/${user.resume}`}
                            target="_blank"
                            rel="noreferrer"
                            className="block px-4 py-3 text-xs font-bold hover:bg-slate-50 transition border-b border-slate-100"
                          >
                            👁 View Resume
                          </a>

                          <a
                            href={`http://localhost:5000/uploads/resumes/${user.resume}`}
                            download
                            className="block px-4 py-3 text-xs font-bold hover:bg-slate-50 transition border-b border-slate-100"
                          >
                            ⬇ Download Resume
                          </a>

                          <Link
                            to="/user/profile/edit"
                            onClick={() => {
                              setResumeMenu(false);
                              setMenuOpen(false);
                            }}
                            className="block px-4 py-3 text-xs font-bold hover:bg-slate-50 transition text-indigo-600"
                          >
                            ✏ Update Resume
                          </Link>
                        </>
                      ) : (
                        <Link
                          to="/user/profile/edit"
                          onClick={() => {
                            setResumeMenu(false);
                            setMenuOpen(false);
                          }}
                          className="block px-4 py-3 text-xs font-bold hover:bg-slate-50 transition text-indigo-600"
                        >
                          ⬆ Upload Resume
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            /* Guest Login CTA */
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-md shadow-indigo-600/30 active:scale-95"
            >
              Login / Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}