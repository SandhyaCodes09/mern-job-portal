import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { registerUser } from "../services/authService";

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
    role: "user"
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

      alert(res.msg);

      // redirect after success
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-5 py-10">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-2xl">

        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <input
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="phone_no"
            placeholder="Phone Number"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
            className="md:col-span-2 border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="gender"
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>

          </select>

          <select
            name="role"
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="user">Job Seeker</option>
            <option value="employer">Employer</option>

          </select>

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="md:col-span-2 border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="md:col-span-2 w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}