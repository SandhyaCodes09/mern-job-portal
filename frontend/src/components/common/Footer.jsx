// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-white py-10 ">
//       <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div>
//           <h2 className="text-3xl font-bold mb-4">Job Portal</h2>

//           <p className="text-gray-400 leading-7">
//             Find your dream jobs and explore opportunities from top companies
//             around the world.
//           </p>
//         </div>

//         <div>
//           <h3 className="text-xl font-semibold mb-4">Quick Links</h3>

//           <ul className="space-y-3 text-gray-400">
//             <li>
//               <a href="/" className="hover:text-white transition">
//                 Home
//               </a>
//             </li>

//             <li>
//               <a href="/jobs" className="hover:text-white transition">
//                 Jobs
//               </a>
//             </li>

//             <li>
//               <a href="/login" className="hover:text-white transition">
//                 Login
//               </a>
//             </li>

//             <li>
//               <a href="/register" className="hover:text-white transition">
//                 Register
//               </a>
//             </li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-xl font-semibold mb-4">Contact</h3>

//           <p className="text-gray-400 mb-2">Email: support@jobportal.com</p>

//           <p className="text-gray-400 mb-2">Phone: +91 9876543210</p>

//           <p className="text-gray-400">India</p>
//         </div>
//       </div>

//       <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
//         <p>© {new Date().getFullYear()} Job Portal. All rights reserved.</p>

//         <p className="mt-2">Designed by Sandhya</p>
//       </div>
//     </footer>
//   );
// }

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Mission Section */}
          <div className="md:col-span-2 space-y-4">
            <Link
              to="/"
              className="text-2xl sm:text-3xl font-black text-white tracking-tight inline-block"
            >
              Talent<span className="text-[#d5e7fe]">Bridge</span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
              Find your dream jobs and explore opportunities from top companies around the world. Connecting top talent with leading tech employers.
            </p>

            {/* Social Links Badges */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#github"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#2048BD] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 text-sm"
                aria-label="GitHub"
              >
                🌐
              </a>
              <a
                href="#linkedin"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#2048BD] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 text-sm"
                aria-label="LinkedIn"
              >
                💼
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#2048BD] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 text-sm"
                aria-label="Twitter"
              >
                🐦
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-white font-extrabold text-base tracking-wide uppercase text-xs text-slate-400">
              Quick Links
            </h3>

            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link
                  to="/"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/jobs"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Jobs
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-white font-extrabold text-base tracking-wide uppercase text-xs text-slate-400">
              Get In Touch
            </h3>

            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-center gap-2.5 text-slate-400">
                <span className="text-[#d5e7fe]">✉️</span>
                <span>support@talentbridge.com</span>
              </li>

              <li className="flex items-center gap-2.5 text-slate-400">
                <span className="text-[#d5e7fe]">📞</span>
                <span>+91 9876543210</span>
              </li>

              <li className="flex items-center gap-2.5 text-slate-400">
                <span className="text-[#d5e7fe]">📍</span>
                <span>Lucknow, Uttar Pradesh, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-semibold gap-3">
          <p>© {new Date().getFullYear()} TalentBridge. All rights reserved.</p>

          <p className="flex items-center gap-1.5 text-slate-400">
            <span>Designed with ❤️ by</span>
            <span className="text-[#d5e7fe] font-extrabold tracking-wide">
              talentbridge
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
