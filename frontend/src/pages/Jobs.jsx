import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom"
import Navbar from "../components/Navbar";


export default function Jobs() {
   const [jobs, setJobs] = useState([]);
   const [searchParams] = useSearchParams();
   const category = searchParams.get("category");

   useEffect(() => {
      const fetchJobs = async () => {
         try {
            const res = await axios.get("http://localhost:5000/api/jobs");
            setJobs(res.data);
         } catch (error) {
            console.log(error);
         }
      }
      fetchJobs();
   }, []);

   // category filter

   const filteredJobs = category ? jobs.filter(job => job.category === category) : jobs;

   return (

      <>
            <Navbar />
      
         <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-5">

            <div className="max-w-7xl mx-auto mb-12 text-center">

               <h1 className="text-5xl font-extrabold text-gray-800 mb-3">
                  {category ? `${category} Jobs` : "All Jobs"}
               </h1>

               <p className="text-gray-600 text-lg">
                  Explore latest opportunities from top companies
               </p>

            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

               {filteredJobs.map((job) => (

                  <div
                     key={job._id}
                     className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100"
                  >

                     <div className="p-6">

                        <div className="flex justify-between items-center mb-4">

                           <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full">
                              {job.category}
                           </span>

                           <span className="text-green-600 font-bold text-lg">
                              ₹{job.salary}
                           </span>

                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                           {job.title}
                        </h2>

                        <div className="space-y-2 mb-5">

                           <p className="text-gray-600">
                              <span className="font-semibold text-gray-700">
                                 Company:
                              </span>{" "}
                              {job.company}
                           </p>

                           <p className="text-gray-600">
                              <span className="font-semibold text-gray-700">
                                 Location:
                              </span>{" "}
                              {job.location}
                           </p>

                        </div>

                        <p className="text-gray-500 text-sm leading-6 mb-6">
                           {job.description}
                        </p>

                        <Link
                           to={`/job/${job._id}`}
                           className="block text-center bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
                        >
                           View Details
                        </Link>

                     </div>

                  </div>

               ))}

            </div>

         </div>
      </>

   );
}