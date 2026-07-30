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
  Save,
} from "lucide-react";

import EmployerNavbar from "../../components/employer/EmployerNavbar";
import EmployerFooter from "../../components/employer/EmployerFooter";
import { updateEmployerProfile } from "../../services/authService";

export default function EmployerEditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Initial Form State
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    company: "",
    website: "",
    linkedin: "",
    address: "",
    about: "",
  });

  // Fetch current profile data using cookie authentication on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setFetching(true);
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true, // Includes httpOnly cookie in request
        });

        const userData = res.data?.user || res.data;

        setForm({
          first_name: userData?.first_name || "",
          last_name: userData?.last_name || "",
          email: userData?.email || "",
          phone_no: userData?.phone_no || userData?.phone || "",
          company: userData?.company || "",
          website: userData?.website || "",
          linkedin: userData?.linkedin || "",
          address: userData?.address || "",
          about: userData?.about || "",
        });
      } catch (error) {
        console.error("Error fetching profile details:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchUser();
  }, []);

  // Handle text input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission using FormData for multipart/form-data support
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Construct FormData object
      const formData = new FormData();
      formData.append("first_name", form.first_name);
      formData.append("last_name", form.last_name);
      formData.append("phone_no", form.phone_no);
      formData.append("company", form.company);
      formData.append("website", form.website);
      formData.append("linkedin", form.linkedin);
      formData.append("address", form.address);
      formData.append("about", form.about);

      // Append combined full name for dashboard compatibility
      const combinedName = `${form.first_name} ${form.last_name}`.trim();
      formData.append("name", combinedName);

      // Execute profile update API service call
      await updateEmployerProfile(formData);

      alert("Profile updated successfully!");

      // Redirect back to Employer Dashboard
      navigate("/employer");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Failed to update profile details!");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <EmployerNavbar />
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
          <p className="text-sm font-semibold">Loading profile details...</p>
        </div>
        <EmployerFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white w-full overflow-x-hidden">
      <EmployerNavbar />

      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Back Button */}
        <button
          onClick={() => navigate("/employer")}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 mb-6 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Dashboard
        </button>

        {/* Hero Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-900 border-b border-indigo-800 rounded-3xl p-8 sm:p-10 shadow-lg mb-8 text-white"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300">
              <UserCog className="w-10 h-10" />
            </div>

            <div>
              <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold mb-1 tracking-wider uppercase">
                <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
                <span>Account Settings</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">Edit Profile Details</h1>
              <p className="mt-1 text-blue-100 text-sm">
                Update your contact details, company profile, and public information.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Edit Profile Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {/* First Name Field */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-indigo-600" />
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Last Name Field */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-indigo-600" />
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Email Field (Disabled) */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                disabled
                className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-xl px-4 py-3 text-sm font-medium cursor-not-allowed outline-none"
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-indigo-600" />
                Phone Number
              </label>
              <input
                type="text"
                name="phone_no"
                value={form.phone_no}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Company Name Field */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Acme Corporation"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Website URL Field */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-indigo-600" />
                Website URL
              </label>
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* LinkedIn Profile URL Field */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-indigo-600 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                LinkedIn URL
              </label>
              <input
                type="text"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Address Field */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                Address / Location
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Lucknow, UP"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* About Company Field */}
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                About Company
              </label>
              <textarea
                rows="5"
                name="about"
                value={form.about}
                onChange={handleChange}
                placeholder="Write a brief overview about your company..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none resize-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-2 mt-2 flex justify-end items-center gap-4 border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={() => navigate("/employer")}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-200 transition-all disabled:opacity-50 active:scale-[0.98] cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      <EmployerFooter />
    </div>
  );
}
