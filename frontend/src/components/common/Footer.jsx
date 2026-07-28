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
              Find your dream jobs and explore opportunities from top companies
              around the world. Connecting top talent with leading tech
              employers.
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
