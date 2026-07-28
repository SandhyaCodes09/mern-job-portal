import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css"; // Keeping your CSS import intact
import { registerUser } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  // 🔹 form state
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    address: "",
    gender: "",
    password: "",
    role: "user",
  });

  // 🔹 handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(form); // 🔥 API call

      alert(res.msg || "Registration Successful! Please login.");

      // redirect after success
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Error occurred during registration");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 relative overflow-hidden font-sans py-12">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#2048BD]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#d5e7fe]/50 rounded-full blur-3xl pointer-events-none" />

      {/* Main Register Card */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10 relative z-10">
        
        {/* Brand & Heading */}
        <div className="text-center mb-10">
          <Link to="/" className="text-3xl font-black text-[#111827] tracking-tight inline-block hover:opacity-90 transition-opacity">
            Talent<span className="text-[#2048BD]">Bridge</span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-800 mt-6">
            Create your account ✨
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-2">
            Join thousands of professionals finding their dream jobs.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* First Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">First Name</label>
              <input
                name="first_name"
                placeholder="e.g. John"
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium placeholder-slate-400"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Last Name</label>
              <input
                name="last_name"
                placeholder="e.g. Doe"
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium placeholder-slate-400"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="name@example.com"
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium placeholder-slate-400"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Phone Number</label>
              <input
                name="phone_no"
                placeholder="+91 9876543210"
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium placeholder-slate-400"
              />
            </div>
            
            {/* Gender */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Gender</label>
              <select
                name="gender"
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium appearance-none cursor-pointer"
              >
                <option value="" disabled selected className="text-slate-400">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">I am a...</label>
              <select
                name="role"
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium appearance-none cursor-pointer"
              >
                <option value="user">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Complete Address</label>
            <input
              name="address"
              placeholder="123 Street, City, Country"
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium placeholder-slate-400"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create a strong password"
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium placeholder-slate-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2048BD] hover:bg-[#1E40AF] text-white py-4 rounded-xl font-bold transition-all shadow-md shadow-blue-500/20 active:scale-95 mt-4"
          >
            Register Now
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm font-medium text-slate-500 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#2048BD] font-bold hover:underline"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}

