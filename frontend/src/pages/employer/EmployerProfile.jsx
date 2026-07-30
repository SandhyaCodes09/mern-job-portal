import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Building2,
  Globe,
  MapPin,
  FileText,
  UserCog,
  Sparkles,
  ArrowLeft,
  Loader2,
  Edit,
  ExternalLink,
} from "lucide-react";

import EmployerNavbar from "../../components/employer/EmployerNavbar";
import EmployerFooter from "../../components/employer/EmployerFooter";

export default function EmployerProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setFetching(true);
        // Cookie-based user profile fetch
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });

        if (isMounted) {
          const userData = res.data?.user || res.data || {};
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching employer profile:", error);
        // Fallback to local data if API fails
        const fallbackUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (isMounted) {
          setUser(fallbackUser);
        }
      } finally {
        if (isMounted) {
          setFetching(false); // Ensures loading spinner always stops
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <EmployerNavbar />
        <div className="flex flex-col items-center justify-center py-24 text-slate-500 gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
          <p className="text-sm font-semibold text-slate-600">
            Loading profile details...
          </p>
        </div>
        <EmployerFooter />
      </div>
    );
  }

  const fullName =
    user?.name ||
    `${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
    "Employer";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white w-full overflow-x-hidden">
      <EmployerNavbar />

      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/employer")}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 mb-6 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Dashboard
        </button>

        {/* Hero Banner Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-900 border-b border-indigo-800 rounded-3xl p-8 sm:p-10 shadow-lg mb-8 text-white"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300">
                <UserCog className="w-10 h-10" />
              </div>

              <div>
                <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold mb-1 tracking-wider uppercase">
                  <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
                  <span>Employer Profile</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  {fullName}
                </h1>
                <p className="mt-1 text-blue-100 text-sm">
                  {user?.company || "Company Representative"}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/employer/profile/edit")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 text-xs font-extrabold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Profile Information Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-indigo-600" /> Full Name
              </span>
              <p className="text-sm font-bold text-slate-800">{fullName}</p>
            </div>

            {/* Email */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4 text-indigo-600" /> Email Address
              </span>
              <p className="text-sm font-bold text-slate-800">
                {user?.email || "N/A"}
              </p>
            </div>

            {/* Phone */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-1">
                <Phone className="w-4 h-4 text-indigo-600" /> Phone Number
              </span>
              <p className="text-sm font-bold text-slate-800">
                {user?.phone_no || user?.phone || "Not provided"}
              </p>
            </div>

            {/* Company Name */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4 text-indigo-600" /> Company Name
              </span>
              <p className="text-sm font-bold text-slate-800">
                {user?.company || "Not provided"}
              </p>
            </div>

            {/* Website */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4 text-indigo-600" /> Website URL
              </span>
              {user?.website ? (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-bold text-indigo-600 hover:underline inline-flex items-center gap-1"
                >
                  {user.website} <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <p className="text-sm font-bold text-slate-800">Not provided</p>
              )}
            </div>

            {/* Address */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-indigo-600" /> Location / Address
              </span>
              <p className="text-sm font-bold text-slate-800">
                {user?.address || "Not provided"}
              </p>
            </div>

            {/* About Company */}
            <div className="md:col-span-2 p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-indigo-600" /> About Company
              </span>
              <p className="text-sm font-medium text-slate-700 whitespace-pre-line leading-relaxed">
                {user?.about || "No company description added yet."}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <EmployerFooter />
    </div>
  );
}
