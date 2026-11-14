import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// Firebase imports
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";

// Service imports
import { loginUser, googleLoginUser } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle Google Sign In
  const handleGoogleSignIn = () => {
    // 1. MUST call signInWithPopup synchronously on click - no async delay or setState before this!
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        setLoading(true);
        const { email, displayName, photoURL } = result.user;
        const res = await googleLoginUser({
          email,
          displayName,
          photoURL,
        });

        localStorage.setItem("user", JSON.stringify(res.user));
        window.dispatchEvent(new Event("auth-change"));
        alert("Google Login Successful!");

        if (res.user?.role === "employer") {
          navigate("/employer");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Google Auth Error:", error);

        // Ignore if user manually closed the popup
        if (error.code === "auth/popup-closed-by-user") {
          return;
        }

        alert(error.response?.data?.msg || error.message || "Google Sign-in Failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // State for login form
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await loginUser(form);
      localStorage.setItem("user", JSON.stringify(res.user));
      window.dispatchEvent(new Event("auth-change"));
      alert("Login Successful");

      if (res.user.role === "employer") {
        navigate("/employer");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
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
          <Link
            to="/"
            className="text-3xl font-black text-[#111827] tracking-tight inline-block hover:opacity-90 transition-opacity"
          >
            Talent<span className="text-[#2048BD]">Bridge</span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-800 mt-6">
            Welcome Back! 👋
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-2">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Google Sign In Button (Placed outside the form) */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-xl font-semibold transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {/* Google SVG Icon */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500 font-medium">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              onChange={handleChange}
              disabled={loading}
              required
              className={`w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium placeholder-slate-400 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700">
                Password
              </label>
              <button
                type="button"
                disabled={loading}
                className="text-xs font-bold text-[#2048BD] hover:underline disabled:opacity-50"
              >
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              disabled={loading}
              required
              className={`w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-[#2048BD] focus:border-transparent transition-all outline-none font-medium placeholder-slate-400 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2048BD] hover:bg-[#1E40AF] disabled:opacity-75 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold transition-all shadow-md shadow-blue-500/20 active:scale-95 mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              "Sign In"
            )}
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
