import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { updateProfile } from "../../services/authService";
import { roleLabel } from "../../utils/RoleLabel";
import Navbar from "../../components/common/Navbar";

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [resume, setResume] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

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

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const formData = new FormData();
      formData.append("first_name", user.first_name);
      formData.append("last_name", user.last_name);
      formData.append("phone_no", user.phone_no);
      formData.append("address", user.address);
      formData.append("gender", user.gender);

      if (resume) {
        formData.append("resume", resume);
      }

      const res = await updateProfile(formData);

      setUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
      
      alert(res.msg);
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#2048BD] border-t-transparent rounded-full animate-spin" />
          <h2 className="text-[#2048BD] font-bold text-sm mt-4 animate-pulse">
            Loading Profile...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <main className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation Back Button */}
        <div className="mb-6">
          <Link
            to={user?.role === "employer" ? "/employer" : "/user"}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#2048BD] transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#111827] to-[#2048BD] px-8 py-8 sm:px-10">
            <h1 className="text-3xl font-black text-white tracking-tight">
              Edit Profile
            </h1>
            <p className="text-blue-100 mt-2 text-sm font-medium">
              Update your personal information to keep your profile fresh.
            </p>
          </div>

          <div className="p-8 sm:p-10 grid lg:grid-cols-3 gap-10">
            
            {/* LEFT: Avatar Display */}
            <div className="flex flex-col items-center text-center">
              <div className="relative group">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=d5e7fe&color=1E40AF&size=150`}
                  className="w-40 h-40 rounded-full border-4 border-[#2048BD] shadow-lg object-cover"
                  alt="Profile Avatar"
                />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-800 mt-5">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-[#2048BD] font-bold text-xs bg-blue-50 px-4 py-1.5 rounded-full mt-2 uppercase tracking-wide">
                {roleLabel[user.role] || user.role}
              </p>
            </div>

            {/* RIGHT: Edit Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">First Name</label>
                  <input
                    name="first_name"
                    value={user.first_name || ""}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Last Name</label>
                  <input
                    name="last_name"
                    value={user.last_name || ""}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <input
                    value={user.email || ""}
                    readOnly
                    className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-xl p-3.5 cursor-not-allowed outline-none font-medium"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Phone Number</label>
                  <input
                    name="phone_no"
                    value={user.phone_no || ""}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Gender</label>
                <select
                  name="gender"
                  value={user.gender || "male"}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium appearance-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Resume Section (Only for non-employers) */}
              {user.role !== "employer" && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Resume / CV</label>
                  
                  {/* Custom Drag & Drop looking Input */}
                  <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-6 bg-slate-50 hover:bg-slate-100 transition-colors text-center group cursor-pointer overflow-hidden">
                    <input
                      type="file"
                      onChange={(e) => setResume(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <span className="text-3xl">📄</span>
                      <p className="text-sm font-bold text-[#2048BD]">
                        {resume ? resume.name : "Click to upload or drag and drop new resume"}
                      </p>
                    </div>
                  </div>

                  {/* Show Current Resume Links */}
                  {user.resume && !resume && (
                    <div className="flex items-center gap-4 text-xs font-bold mt-3 px-2">
                      <span className="text-slate-500">Current File:</span>
                      <a
                        href={`http://localhost:5000/uploads/resumes/${user.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#2048BD] hover:underline flex items-center gap-1"
                      >
                        👁 View
                      </a>
                      <a
                        href={`http://localhost:5000/uploads/resumes/${user.resume}`}
                        download
                        className="text-emerald-600 hover:underline flex items-center gap-1"
                      >
                        ⬇ Download
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Full Address</label>
                <textarea
                  rows="3"
                  name="address"
                  value={user.address || ""}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-wrap items-center gap-4 border-t border-slate-100">
                <Link
                  to={user?.role === "employer" ? "/employer" : "/user"}
                  className="flex-1 sm:flex-none text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-8 py-3.5 rounded-xl transition-all"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 sm:flex-none bg-[#2048BD] hover:bg-[#1E40AF] text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-blue-500/20 active:scale-95 disabled:opacity-70"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}