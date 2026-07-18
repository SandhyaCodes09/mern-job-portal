import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import { roleLabel } from "../../utils/RoleLabel";

export default function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            withCredentials: true
          }
        );

        console.log(res.data.user); 

        setUser(res.data.user);

      } catch (error) {

        console.log(error);

      }

    };

    fetchUser();

  }, []);

  if (!user) {

    return (
      <div className="min-h-screen flex justify-center items-center bg-blue-50">
        <h1 className="text-2xl font-bold text-blue-700">
          Loading Profile...
        </h1>
      </div>
    );

  }
  
  return (

    <div className="min-h-screen bg-blue-50">

      <div className="grid grid-cols-1 lg:grid-cols-6 min-h-screen">

        {/* LEFT SIDEBAR */}

        <div className="bg-blue-800 text-white p-8">

          <div className="flex flex-col items-center">

            <img
              src={`https://ui-avatars.com/api/?name=${user.first_name}&background=ffffff&color=2563eb&size=200`}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-white"
            />

            <h2 className="text-3xl font-bold mt-5">
              {user.first_name}{user.last_name && ` ${user.last_name}`}
            </h2>

           <p className="text-blue-200 mt-1">
              {/* {user.role === "user" ? "Job Seeker" : "Employer"} */}
              {roleLabel?.[user?.role] || "Job Seeker"}
            </p>

          </div>

          <div className="mt-10 space-y-6">


            <div>
              <p className="text-blue-200 text-sm">
                Role
              </p>

           <p className="font-medium">
             {roleLabel?.[user?.role] || "Job Seeker"}</p>
          

            </div>

          <div>
              <p className="text-blue-200 text-sm">
                Email
              </p>

              <p className="font-medium">
                {user.email}
              </p>

            </div>
        

            <div>
              <p className="text-blue-200 text-sm">
                Phone
              </p>

              <p className="font-medium">
                {user.phone_no}
              </p>

            </div>

            <div>

            <p className="text-blue-200 text-sm">
            Gender
            </p>

            <p className="font-medium">
            {user.gender}
            </p>

            </div>

            
            <div>
              <p className="text-blue-200 text-sm">
                Address
              </p>

              <p className="font-medium">
                {user.address}
              </p>

            </div>

            <div>
            <p className="text-blue-200 text-sm">
              Joined
            </p>

            <p className="font-medium">
              {user.created_at
                ? new Date(user.created_at).toLocaleDateString("en-IN")
                : "Not Available"}
            </p>
          </div>

            {user.resume && (

              <div>

                <p className="text-blue-200 text-sm mb-3">
                  Resume
                </p>

                <div className="flex gap-3">

                  <a
                    href={`http://localhost:5000/uploads/resumes/${user.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium"
                  >
                    View
                  </a>

                  <a
                    href={`http://localhost:5000/uploads/resumes/${user.resume}`}
                    download
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Download
                  </a>

                </div>

              </div>

            )}

            {/* <button className="w-full bg-white text-blue-700 py-3 rounded-lg font-semibold hover:bg-blue-100 transition">
              Edit Profile
            </button> */}

            <Link
                to="/profile/edit"
                className="w-full bg-white text-blue-700 py-3 rounded-lg font-semibold hover:bg-blue-100 transition text-center block"
            >
                Edit Profile
            </Link>

          </div>

        </div>

        {/* RIGHT CONTENT */}

        <div className="lg:col-span-5 p-8">

          <h1 className="text-4xl font-bold text-blue-800 mb-8">
            Dashboard
          </h1>

          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600">
              <p className="text-gray-500">Applied Jobs</p>
              <h2 className="text-4xl font-bold text-blue-700 mt-2">
                12
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
              <p className="text-gray-500">Responses</p>
              <h2 className="text-4xl font-bold text-green-600 mt-2">
                5
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
              <p className="text-gray-500">Interviews</p>
              <h2 className="text-4xl font-bold text-orange-500 mt-2">
                2
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
              <p className="text-gray-500">Saved Jobs</p>
              <h2 className="text-4xl font-bold text-purple-600 mt-2">
                8
              </h2>
            </div>

          </div>

          {/* RECENT APPLICATIONS */}

          <div className="bg-white rounded-2xl shadow-lg mt-8 p-6">

            <h2 className="text-2xl font-bold text-blue-800 mb-5">
              Recent Applications
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between items-center border rounded-xl p-4">

                <div>
                  <h3 className="font-semibold">
                    MERN Stack Developer
                  </h3>

                  <p className="text-gray-500">
                    Google
                  </p>
                </div>

                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                  Pending
                </span>

              </div>

              <div className="flex justify-between items-center border rounded-xl p-4">

                <div>
                  <h3 className="font-semibold">
                    React Developer
                  </h3>

                  <p className="text-gray-500">
                    Microsoft
                  </p>
                </div>

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                  Shortlisted
                </span>

              </div>

              <div className="flex justify-between items-center border rounded-xl p-4">

                <div>
                  <h3 className="font-semibold">
                    Frontend Developer
                  </h3>

                  <p className="text-gray-500">
                    Amazon
                  </p>
                </div>

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                  Interview
                </span>

              </div>

            </div>

          </div>

          {/* ACTIVITY */}

          <div className="bg-white rounded-2xl shadow-lg mt-8 p-6">

            <h2 className="text-2xl font-bold text-blue-800 mb-5">
              Activity & Notifications
            </h2>

            <div className="space-y-4">

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                Resume uploaded successfully
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                Application submitted for MERN Developer
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                Microsoft viewed your profile
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                Interview scheduled for Frontend Developer
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

