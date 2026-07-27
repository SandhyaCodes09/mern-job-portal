import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

export default function UserProfile() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");

  const user = {
    name: "Sandhya Verma",
    role: "MERN Stack Developer",
    profileImage: "",
    location: "Kanpur, Uttar Pradesh",
    email: "sandhya@example.com",
    completion: 80,
    bio: "Computer Science Engineer passionate about building scalable web applications using React, Node.js and MongoDB.",
    skills: [
      "React",
      "JavaScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "Git",
    ],
    education: [
      {
        title: "B.Tech Computer Science",
        institute: "AKTU University",
        year: "2026",
      },
      {
        title: "Diploma Computer Science",
        institute: "Computer Science Engineering",
        year: "2023",
      },
    ],
    projects: [
      {
        name: "MERN Job Portal",
        tech: "React | Node | Express | MongoDB",
      },
      {
        name: "Smart LMS Portal",
        tech: "Laravel | MySQL",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Top Navbar */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 mt-6">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Cover Banner with #111827 to #1E40AF Gradient */}
          <div className="h-48 bg-gradient-to-r from-[#111827] via-[#1E40AF] to-[#2048BD]"></div>

          {/* User Details & Larger Avatar */}
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-20 gap-4">
              {/* Profile Image (Bada Size + Theme Border) */}
              <div className="relative inline-block">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="profile"
                    className="w-36 h-36 rounded-full border-4 border-white shadow-xl object-cover bg-white"
                  />
                ) : (
                  <div className="w-36 h-36 rounded-full border-4 border-white shadow-xl bg-[#1E40AF] text-white flex items-center justify-center text-6xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Action Buttons using #2048BD */}
              <div className="flex items-center gap-3 mt-2 sm:mt-0">
                <button
                  onClick={() => navigate("/user/profile/edit")}
                  className="bg-[#2048BD] hover:bg-[#1E40AF] text-white px-6 py-2.5 rounded-xl font-medium transition shadow-md shadow-blue-100"
                >
                  Edit Profile
                </button>

                <label className="cursor-pointer text-[#2048BD] hover:bg-[#d5e7fe]/50 font-medium text-sm bg-[#d5e7fe] px-4 py-2.5 rounded-xl transition">
                  Change Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProfileImage(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Profile Info */}
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-[#111827]">{user.name}</h1>
              <p className="text-[#2048BD] font-semibold text-lg mt-0.5">
                {user.role}
              </p>

              <div className="flex flex-wrap gap-5 text-gray-500 mt-3 text-sm font-medium">
                <span className="flex items-center gap-1.5">
                  📍 {user.location}
                </span>
                <span className="flex items-center gap-1.5">
                  ✉️ {user.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Section Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            <Card title="About Me">
              <p className="text-slate-600 leading-relaxed">{user.bio}</p>
            </Card>

            <Card title="Skills">
              <div className="flex flex-wrap gap-2.5">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#d5e7fe] text-[#1E40AF] rounded-xl text-sm font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>

            <Card title="Education">
              <div className="divide-y divide-slate-100">
                {user.education.map((edu, index) => (
                  <div key={index} className="py-3.5 first:pt-0 last:pb-0">
                    <h3 className="font-semibold text-[#111827]">
                      {edu.title}
                    </h3>
                    <p className="text-slate-600 text-sm mt-0.5">
                      {edu.institute}
                    </p>
                    <p className="text-slate-400 text-xs mt-1 font-medium">
                      {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Projects">
              <div className="space-y-3">
                {user.projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 rounded-2xl p-4 border border-slate-100 hover:border-[#d5e7fe] transition"
                  >
                    <h3 className="font-semibold text-[#111827]">
                      {project.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#2048BD] mt-1">
                      {project.tech}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card title="Profile Completion">
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-slate-600 font-medium">Progress</span>
                <span className="font-bold text-[#2048BD]">
                  {user.completion}%
                </span>
              </div>

              {/* Progress bar with theme background and fill */}
              <div className="h-2.5 bg-[#d5e7fe] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2048BD] rounded-full transition-all duration-300"
                  style={{ width: `${user.completion}%` }}
                ></div>
              </div>

              <p className="text-xs text-slate-500 mt-3">
                Add resume and extra skills to reach 100% visibility.
              </p>
            </Card>

            <Card title="Profile Tips">
              <ul className="text-sm text-slate-600 space-y-2.5">
                <li className="flex items-center gap-2">
                  <span className="text-[#2048BD] font-bold">✔</span> Add latest projects
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2048BD] font-bold">✔</span> Update technical skills
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2048BD] font-bold">✔</span> Upload latest resume
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Card Component
function Card({ title, children }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
      <h2 className="text-xl font-bold text-[#111827] mb-4">{title}</h2>
      {children}
    </div>
  );
}