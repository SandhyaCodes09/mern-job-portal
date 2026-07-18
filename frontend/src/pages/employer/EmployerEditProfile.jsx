import { useState } from "react";
import EmployerNavbar from "../../components/employer/EmployerNavbar";

export default function EmployerEditProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone_no: user?.phone_no || "",
    company: user?.company || "",
    website: user?.website || "",
    linkedin: user?.linkedin || "",
    address: user?.address || "",
    about: user?.about || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Backend API connect karni hai.");
  };

  return (
    <>
      <EmployerNavbar />

      <div className="min-h-screen bg-slate-100 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10">
          <h2 className="text-3xl font-bold text-blue-700 mb-8">
            Edit Employer Profile
          </h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="border p-3 rounded-lg"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              className="border p-3 rounded-lg bg-gray-100"
            />

            <input
              type="text"
              name="phone_no"
              value={form.phone_no}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="Website"
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn"
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="border p-3 rounded-lg"
            />

            <textarea
              rows="5"
              name="about"
              value={form.about}
              onChange={handleChange}
              placeholder="About Company"
              className="border p-3 rounded-lg md:col-span-2"
            />

            <button className="bg-blue-700 text-white py-3 rounded-lg md:col-span-2 hover:bg-blue-800">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
