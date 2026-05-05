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
    <div className="auth-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit} className="auth-form">

        <input name="first_name" placeholder="First Name" onChange={handleChange} required />
        <input name="last_name" placeholder="Last Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone_no" placeholder="Phone Number" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />

        {/* Gender */}
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

        {/* Role */}
        <select name="role" onChange={handleChange}>
          <option value="user">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}