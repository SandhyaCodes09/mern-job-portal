import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();

  // 🔹 state for login form
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // 🔹 handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      // Store logged in user
      localStorage.setItem("user", JSON.stringify(res.user));
      alert("Login Successful");

      // Redirect according to role
      if (res.user.role === "employer") {
        navigate("/employer");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 relative overflow-hidden font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#2048BD]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#d5e7fe]/50 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10 relative z-10">
        
        {/* Brand & Heading */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-black text-[#111827] tracking-tight inline-block hover:opacity-90 transition-opacity">
            Talent<span className="text-[#2048BD]">Bridge</span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-800 mt-6">
            Welcome Back! 👋
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-2">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium placeholder-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">Password</label>
              <button type="button" className="text-xs font-bold text-[#2048BD] hover:underline">
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium placeholder-slate-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2048BD] hover:bg-[#1E40AF] text-white py-3.5 rounded-xl font-bold transition-all shadow-md shadow-blue-500/20 active:scale-95 mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm font-medium text-slate-500 mt-8">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#2048BD] font-bold hover:underline"
          >
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
}