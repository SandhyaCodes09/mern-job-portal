import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { updateJob } from "../../services/JobService";

export default function EditJob() {
  // Get job id from URL
  const { id } = useParams();

  // Redirect after update
  const navigate = useNavigate();

  // Store job data
  const [job, setJob] = useState({
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

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);

        setJob({
          ...res.data,
          skills: res.data.skills.join(", "),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchJob();
  }, [id]);

  // ======================================
  // Handle Input Change
  // ======================================

  const handleChange = (e) => {
    setJob({
      ...job,

      [e.target.name]: e.target.value,
    });
  };

  // ======================================
  // Update Job
  // ======================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateJob(
        id,

        {
          ...job,

          // Convert comma separated string into array
          skills: job.skills.split(",").map((skill) => skill.trim()),
        },
      );

      alert("Job updated successfully");

      navigate("/employer");
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">Edit Job</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={job.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={job.company}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={job.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={job.location}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={job.salary}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={job.experience}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <select
            name="jobType"
            value={job.jobType}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Job Type</option>

            <option value="Full Time">Full Time</option>

            <option value="Part Time">Part Time</option>

            <option value="Internship">Internship</option>

            <option value="Remote">Remote</option>
          </select>

          <input
            type="text"
            name="skills"
            placeholder="React, Node, MongoDB"
            value={job.skills}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            rows="5"
            name="description"
            placeholder="Description"
            value={job.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
