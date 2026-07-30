import { Mail, Phone, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

export default function EmployerFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 mt-16 font-sans">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 items-start">
          
          {/* Brand & Info Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-md shadow-indigo-500/20">
                T
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  TalentBridge
                </h2>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 -mt-1">
                  Employer Portal
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Manage jobs, review candidate applications, and streamline your recruitment workflow from one powerful dashboard.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 pt-1">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Empowering Modern Recruiters</span>
            </div>
          </div>

          {/* Quick Contact */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Support & Contact
            </h3>
            <div className="space-y-3 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>support@talentbridge.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Lucknow, Uttar Pradesh</span>
              </div>
            </div>
          </div>

          {/* Key Features / Status */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Recruiter Tools
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Job Posting</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Applicant Tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Profile Management</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Secure Authentication</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Tech Stack */}
        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-medium gap-3">
          <p>
            © {year} <span className="text-slate-300 font-bold">TalentBridge</span> Employer Portal. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            Built with <span className="text-indigo-400 font-bold">React & Node.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
