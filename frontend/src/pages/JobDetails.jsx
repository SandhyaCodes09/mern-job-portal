import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    console.log(id);

    const fetchJob = async () => {
      const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);

      console.log(res.data);

      setJob(res.data);
    };

    fetchJob();
  }, [id]);

  if (!job) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-5">

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Top Section */}
          <div className="bg-blue-600 p-8 text-white">

            <span className="bg-white text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
              {job.category}
            </span>

            <h1 className="text-4xl font-extrabold mt-4">
              {job.title}
            </h1>

            <p className="text-blue-100 text-lg mt-2">
              {job.company}
            </p>

          </div>

          {/* Content */}
          <div className="p-8 space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="bg-gray-100 p-5 rounded-2xl">

                <h3 className="text-gray-500 text-sm mb-1">
                  Location
                </h3>

                <p className="text-gray-800 text-lg font-semibold">
                  {job.location}
                </p>

              </div>

              <div className="bg-gray-100 p-5 rounded-2xl">

                <h3 className="text-gray-500 text-sm mb-1">
                  Salary
                </h3>

                <p className="text-green-600 text-lg font-bold">
                  ₹{job.salary}
                </p>

              </div>

            </div>

            <div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Job Description
              </h2>

              <p className="text-gray-600 leading-8">
                {job.description}
              </p>

            </div>

            <div className="pt-4">

              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition">
                Apply Now
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}
