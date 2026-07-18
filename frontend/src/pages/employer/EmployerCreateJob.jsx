import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Building2,
  MapPin,
  IndianRupee,
  GraduationCap,
  Clock3,
  Wrench,
  FileText,
  Image,
  PlusCircle,
} from "lucide-react";

import EmployerNavbar from "../../components/employer/EmployerNavbar";
import EmployerFooter from "../../components/employer/EmployerFooter";

import { createJob } from "../../services/JobService";

export default function CreateJob() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    category: "",
    location: "",
    salary: "",
    experience: "",
    jobType: "",
    skills: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createJob({
        ...formData,

        skills: formData.skills.split(",").map((skill) => skill.trim()),
      });

      alert("Job Created Successfully");

      navigate("/employer/my-jobs");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <EmployerNavbar />

      <div className="min-h-screen bg-slate-100 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}

          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl text-white p-10 shadow-xl">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center">
                <PlusCircle size={42} />
              </div>

              <div>
                <h1 className="text-4xl font-bold">Create New Job</h1>

                <p className="mt-2 text-blue-100">
                  Fill all required information to publish a professional job
                  listing.
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}

          <div className="bg-white rounded-3xl shadow-xl mt-8 p-10">
            <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-7">
              {/* Job Title */}

              <div>
                <label className="font-semibold flex items-center gap-2 mb-2">
                  <Briefcase size={18} />
                  Job Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Frontend Developer"
                  required
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Company */}

              <div>
                <label className="font-semibold flex items-center gap-2 mb-2">
                  <Building2 size={18} />
                  Company Name
                </label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Google"
                  required
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Category */}

              <div>
                <label className="font-semibold flex items-center gap-2 mb-2">
                  <Briefcase size={18} />
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="IT"
                  required
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Location */}

              <div>
                <label className="font-semibold flex items-center gap-2 mb-2">
                  <MapPin size={18} />
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Noida"
                  required
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Salary */}

              <div>
                <label className="font-semibold flex items-center gap-2 mb-2">
                  <IndianRupee size={18} />
                  Annual Salary
                </label>

                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="600000"
                  required
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Experience */}

              <div>
                <label className="font-semibold flex items-center gap-2 mb-2">
                  <GraduationCap size={18} />
                  Experience
                </label>

                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select Experience</option>

                  <option>Fresher</option>

                  <option>1-2 Years</option>

                  <option>2-4 Years</option>

                  <option>5+ Years</option>
                </select>
              </div>

              {/* Job Type */}

              <div>
                <label className="font-semibold flex items-center gap-2 mb-2">
                  <Clock3 size={18} />
                  Job Type
                </label>

                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select Job Type</option>

                  <option value="Full Time">Full Time</option>

                  <option value="Part Time">Part Time</option>

                  <option value="Internship">Internship</option>

                  <option value="Remote">Remote</option>
                </select>
              </div>

              {/* Skills */}

              <div>
                <label className="font-semibold flex items-center gap-2 mb-2">
                  <Wrench size={18} />
                  Required Skills
                </label>

                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                />

                <p className="text-sm text-gray-500 mt-2">
                  Separate skills using comma (,)
                </p>
              </div>

              {/* Company Logo */}

              <div className="lg:col-span-2">
                <label className="font-semibold flex items-center gap-2 mb-2">
                  <Image size={18} />
                  Company Logo
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-600 transition">
                  <input type="file" accept="image/*" className="w-full" />

                  <p className="mt-3 text-sm text-gray-500">
                    Upload PNG / JPG Logo (Optional)
                  </p>
                </div>
              </div>

              {/* Description */}

              <div className="lg:col-span-2">
                <label className="font-semibold flex items-center gap-2 mb-2">
                  <FileText size={18} />
                  Job Description
                </label>

                <textarea
                  rows="8"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write detailed job description..."
                  required
                  className="w-full border rounded-2xl px-4 py-4 outline-none resize-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Buttons */}

              <div className="lg:col-span-2 mt-4 flex justify-end gap-5 border-t pt-8">
                <button
                  type="button"
                  onClick={() => navigate("/employer")}
                  className="px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-lg transition"
                >
                  {loading ? "Creating Job..." : "Create Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <EmployerFooter />
    </>
  );
}
