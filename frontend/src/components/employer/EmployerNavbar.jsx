import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Bell, ChevronDown } from "lucide-react";

export default function EmployerNavbar() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full px-8 lg:px-12">
        {/* ===================== NAVBAR ===================== */}

        <div className="relative flex items-center h-20">
          {/* ================= LEFT ================= */}

          <div className="flex items-center">
            <Link to="/employer" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center text-xl font-bold shadow">
                {user?.first_name?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-blue-700">JobPortal</h2>

                <p className="text-xs text-gray-500">Employer Panel</p>
              </div>
            </Link>
          </div>

          {/* ================= CENTER ================= */}

          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-10">
              <NavLink
                to="/employer"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-blue-700 border-b-2 border-blue-700 pb-1"
                    : "text-gray-700 hover:text-blue-700 transition"
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/employer/create-job"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-blue-700 border-b-2 border-blue-700 pb-1"
                    : "text-gray-700 hover:text-blue-700 transition"
                }
              >
                Post Job
              </NavLink>

              <NavLink
                to="/employer/my-jobs"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-blue-700 border-b-2 border-blue-700 pb-1"
                    : "text-gray-700 hover:text-blue-700 transition"
                }
              >
                My Jobs
              </NavLink>

              <NavLink
                to="/employer/applications"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-blue-700 border-b-2 border-blue-700 pb-1"
                    : "text-gray-700 hover:text-blue-700 transition"
                }
              >
                Applications
              </NavLink>
            </div>
          </div>

          {/* ================= RIGHT ================= */}

          <div className="hidden lg:flex ml-auto items-center gap-6">
            {/* Notification */}

            <button className="relative hover:text-blue-700">
              <Bell size={22} />

              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center">
                0
              </span>
            </button>

            {/* Profile */}

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    user?.profileImage ||
                    `https://ui-avatars.com/api/?name=${user?.first_name}+${user?.last_name}&background=2563eb&color=fff`
                  }
                  alt="profile"
                  className="w-11 h-11 rounded-full border-2 border-blue-600"
                />

                <div className="text-left">
                  <h3 className="font-semibold text-sm">
                    {user?.first_name} {user?.last_name}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {user?.company || "Employer"}
                  </p>
                </div>

                <ChevronDown size={18} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-xl border overflow-hidden">
                  <Link
                    to="/employer/profile"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    👤 My Profile
                  </Link>

                  <Link
                    to="/employer/profile/edit"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    ✏ Edit Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full text-left px-5 py-3 hover:bg-red-50 text-red-600"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}

          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}

        {mobileOpen && (
          <div className="lg:hidden border-t bg-white shadow-lg">
            {/* User Info */}

            <div className="flex items-center gap-3 px-6 py-5 border-b">
              <img
                src={
                  user?.profileImage ||
                  `https://ui-avatars.com/api/?name=${user?.first_name}+${user?.last_name}&background=2563eb&color=fff`
                }
                alt="profile"
                className="w-14 h-14 rounded-full border-2 border-blue-600"
              />

              <div>
                <h3 className="font-semibold text-lg">
                  {user?.first_name} {user?.last_name}
                </h3>

                <p className="text-sm text-gray-500">
                  {user?.company || "Employer"}
                </p>
              </div>
            </div>

            {/* Navigation */}

            <NavLink
              to="/employer"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-4 border-b transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              📊 Dashboard
            </NavLink>

            <NavLink
              to="/employer/create-job"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-4 border-b transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              ➕ Post Job
            </NavLink>

            <NavLink
              to="/employer/my-jobs"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-4 border-b transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              💼 My Jobs
            </NavLink>

            <NavLink
              to="/employer/applications"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-4 border-b transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              📄 Applications
            </NavLink>

            <NavLink
              to="/employer/profile"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-4 border-b transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              👤 My Profile
            </NavLink>

            <NavLink
              to="/employer/profile/edit"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-4 border-b transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              ✏ Edit Profile
            </NavLink>

            {/* Logout */}

            <button
              onClick={logout}
              className="w-full text-left px-6 py-4 text-red-600 hover:bg-red-50"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

// import { useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { Menu, X, Bell, ChevronDown } from "lucide-react";

// export default function EmployerNavbar() {

//     const navigate = useNavigate();

//     const [mobileOpen, setMobileOpen] = useState(false);
//     const [profileOpen, setProfileOpen] = useState(false);

//     const user = JSON.parse(localStorage.getItem("user"));

//     const logout = () => {

//         localStorage.removeItem("user");

//         navigate("/login");

//     };

//     return (

//         <nav className="bg-white shadow-md sticky top-0 z-50">

//             <div className="max-w-7xl mx-auto px-6">

//                 <div className="grid grid-cols-3 items-center h-20">

//                     {/* Logo */}

//                     <Link
//                         to="/employer"
//                         className="flex items-center gap-3"
//                     >

//                         <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center text-xl font-bold">

//                             {user?.first_name?.charAt(0)?.toUpperCase()}

//                         </div>

//                         <div>

//                             <h2 className="text-3xl font-bold text-blue-700">

//                                 Employer Dashboard

//                             </h2>

//                         </div>

//                     </Link>

//                     {/* Desktop Menu */}

//                     <div className="hidden lg:flex items-center gap-8">

//                         <NavLink
//                             to="/employer"
//                             className={({ isActive }) =>
//                                 isActive
//                                     ? "text-blue-700 font-semibold"
//                                     : "text-gray-700 hover:text-blue-700"
//                             }
//                         >
//                             Dashboard
//                         </NavLink>

//                         <NavLink
//                             to="/create-job"
//                             className={({ isActive }) =>
//                                 isActive
//                                     ? "text-blue-700 font-semibold"
//                                     : "text-gray-700 hover:text-blue-700"
//                             }
//                         >
//                             Post Job
//                         </NavLink>

//                         <NavLink
//                             to="/employer/my-jobs"
//                             className={({ isActive }) =>
//                                 isActive
//                                     ? "text-blue-700 font-semibold"
//                                     : "text-gray-700 hover:text-blue-700"
//                             }
//                         >
//                             My Jobs
//                         </NavLink>

//                         <NavLink
//                             to="/employer/applications"
//                             className={({ isActive }) =>
//                                 isActive
//                                     ? "text-blue-700 font-semibold"
//                                     : "text-gray-700 hover:text-blue-700"
//                             }
//                         >
//                             Applications
//                         </NavLink>

//                     </div>

//                     {/* Right */}

//                     <div className="hidden lg:flex items-center gap-6">

//                         <button className="relative">

//                             <Bell size={23} />

//                             <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">

//                                 0

//                             </span>

//                         </button>

//                         <div className="relative">

//                             <button

//                                 onClick={() => setProfileOpen(!profileOpen)}

//                                 className="flex items-center gap-3"

//                             >

//                                 <img

//                                     src={
//                                         user?.profileImage ||
//                                         `https://ui-avatars.com/api/?name=${user?.first_name}+${user?.last_name}&background=2563eb&color=fff`
//                                     }

//                                     alt="profile"

//                                     className="w-12 h-12 rounded-full border-2 border-blue-600"

//                                 />

//                                 <div className="text-left">

//                                     <h3 className="font-semibold">

//                                         {user?.first_name} {user?.last_name}

//                                     </h3>

//                                     <p className="text-sm text-gray-500">

//                                         {user?.company || "Employer"}

//                                     </p>

//                                 </div>

//                                 <ChevronDown size={18} />

//                             </button>

//                             {profileOpen && (

//                                 <div className="absolute right-0 mt-4 w-52 bg-white rounded-xl shadow-xl border">

//                                     <Link
//                                         to="/employer/profile"
//                                         className="block px-5 py-3 hover:bg-gray-100"
//                                     >
//                                         Profile
//                                     </Link>

//                                     <Link
//                                         to="/employer/profile/edit"
//                                         className="block px-5 py-3 hover:bg-gray-100"
//                                     >
//                                         Edit Profile
//                                     </Link>

//                                     <button

//                                         onClick={logout}

//                                         className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50"

//                                     >

//                                         Logout

//                                     </button>

//                                 </div>

//                             )}

//                         </div>

//                     </div>

//                     {/* Mobile Button */}

//                     <button

//                         className="lg:hidden"

//                         onClick={() => setMobileOpen(!mobileOpen)}

//                     >

//                         {mobileOpen ? <X /> : <Menu />}

//                     </button>

//                 </div>

//             </div>

//             {/* Mobile Menu */}

//             {mobileOpen && (

//                 <div className="lg:hidden bg-white border-t">

//                     <NavLink
//                         to="/employer"
//                         className="block px-6 py-4 border-b"
//                     >
//                         Dashboard
//                     </NavLink>

//                     <NavLink
//                         to="/create-job"
//                         className="block px-6 py-4 border-b"
//                     >
//                         Post Job
//                     </NavLink>

//                     <NavLink
//                         to="/employer/my-jobs"
//                         className="block px-6 py-4 border-b"
//                     >
//                         My Jobs
//                     </NavLink>

//                     <NavLink
//                         to="/employer/applications"
//                         className="block px-6 py-4 border-b"
//                     >
//                         Applications
//                     </NavLink>

//                     <NavLink
//                         to="/employer/profile"
//                         className="block px-6 py-4 border-b"
//                     >
//                         Profile
//                     </NavLink>

//                     <button

//                         onClick={logout}

//                         className="block w-full text-left px-6 py-4 text-red-600"

//                     >

//                         Logout

//                     </button>

//                 </div>

//             )}

//         </nav>

//     );

// }
