import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, UserCheck, Edit3, Settings, ShieldCheck } from "lucide-react";

export default function EmployerProfileCard({ user }) {
  const displayName = user?.name || `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || "Employer";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-50/70 rounded-full blur-2xl pointer-events-none" />

      {/* Top Animated Badge */}
      <div className="flex justify-end mb-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Employer
        </span>
      </div>

      {/* Avatar with Live Pulse */}
      <div className="flex justify-center my-3">
        <div className="relative group cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center text-4xl font-extrabold shadow-lg shadow-indigo-500/20 border-2 border-white"
          >
            {initial}
          </motion.div>
          <span className="absolute bottom-1 right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
          </span>
        </div>
      </div>

      {/* Name & Role Badge (Bada Font) */}
      <div className="text-center mt-3">
        <h2 className="text-xl font-extrabold text-slate-800 capitalize tracking-wide">
          {displayName}
        </h2>
        
        <div className="mt-2.5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 shadow-2xs">
            <UserCheck className="w-4 h-4 text-indigo-600" />
            Employer Account
          </span>
        </div>
      </div>

      <div className="my-6 border-t border-slate-100" />

      {/* User Info Items (Better Font Sizes & Padding) */}
      <div className="space-y-4">
        <div className="flex items-center gap-3.5 text-slate-700 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
            <Mail className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Email</p>
            <p className="font-semibold text-slate-800 text-sm truncate">{user?.email || "Not Provided"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 text-slate-700 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Phone</p>
            <p className="font-semibold text-slate-800 text-sm">{user?.phone_no || user?.phone || "Not Provided"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 text-slate-700 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Address</p>
            <p className="font-semibold text-slate-800 text-sm capitalize">{user?.address || "Not Provided"}</p>
          </div>
        </div>
      </div>

      {/* Buttons (Bada Text & Proper Padding) */}
      <div className="mt-6 flex flex-col gap-3">
        <Link
          to="/employer/profile/edit"
          className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-3 rounded-xl transition-all shadow-md shadow-indigo-200 active:scale-[0.98]"
        >
          <Edit3 className="w-4 h-4" />
          Edit Profile
        </Link>

        <Link
          to="/settings"
          className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold py-3 rounded-xl transition-all active:scale-[0.98]"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </div>
    </motion.div>
  );
}