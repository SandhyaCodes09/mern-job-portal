import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/JobService";

export default function CreateJob() {

    const navigate = useNavigate();

    // =====================================
    // Form State
    // =====================================

    const [formData, setFormData] = useState({

        title: "",
        company: "",
        category: "",
        location: "",
        salary: "",
        experience: "",
        jobType: "",
        skills: "",
        description: ""

    });

    // Loading state
    const [loading, setLoading] = useState(false);

    // =====================================
    // Handle Input Change
    // =====================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    // =====================================
    // Handle Form Submit
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await createJob({

                ...formData,

                skills: formData.skills
                    .split(",")
                    .map((item) => item.trim())

            });

            alert("Job Created Successfully");

            navigate("/my-jobs");

        } catch (error) {

            // console.log(error);

            // alert(
            //     error.response?.data?.message ||
            //     "Something went wrong"
            // );

            console.log("ERROR =>", error);

            console.log("Response =>", error.response);

            console.log("Data =>", error.response?.data);

            alert(error.response?.data?.message || error.message);


        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-blue-50 py-10">

            <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10">

                {/* Heading */}

                <h1 className="text-4xl font-bold text-blue-700 mb-2">

                    Create New Job

                </h1>

                <p className="text-gray-500 mb-10">

                    Fill all details carefully before posting the job.

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-2 gap-6"
                >

                    {/* Job Title */}

                    <div>

                        <label className="font-semibold">

                            Job Title

                        </label>

                        <input

                            type="text"

                            name="title"

                            value={formData.title}

                            onChange={handleChange}

                            placeholder="React Developer"

                            required

                            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"

                        />

                    </div>

                    {/* Company */}

                    <div>

                        <label className="font-semibold">

                            Company Name

                        </label>

                        <input

                            type="text"

                            name="company"

                            value={formData.company}

                            onChange={handleChange}

                            placeholder="Google"

                            required

                            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"

                        />

                    </div>

                    {/* Category */}

                    <div>

                        <label className="font-semibold">

                            Category

                        </label>

                        <input

                            type="text"

                            name="category"

                            value={formData.category}

                            onChange={handleChange}

                            placeholder="IT"

                            required

                            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"

                        />

                    </div>

                    {/* Location */}

                    <div>

                        <label className="font-semibold">

                            Location

                        </label>

                        <input

                            type="text"

                            name="location"

                            value={formData.location}

                            onChange={handleChange}

                            placeholder="Noida"

                            required

                            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"

                        />

                    </div>

                    {/* Salary */}

                    <div>

                        <label className="font-semibold">

                            Annual Salary

                        </label>

                        <input

                            type="number"

                            name="salary"

                            value={formData.salary}

                            onChange={handleChange}

                            placeholder="600000"

                            required

                            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"

                        />

                    </div>

                    {/* Experience */}

                    <div>

                        <label className="font-semibold">

                            Experience

                        </label>

                        <select

                            name="experience"

                            value={formData.experience}

                            onChange={handleChange}

                            required

                            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"

                        >

                            <option value="">

                                Select Experience

                            </option>

                            <option>

                                Fresher

                            </option>

                            <option>

                                1-2 Years

                            </option>

                            <option>

                                2-4 Years

                            </option>

                            <option>

                                5+ Years

                            </option>

                        </select>

                    </div>
                                        {/* Job Type */}

                    <div>

                        <label className="font-semibold">

                            Job Type

                        </label>

                        <select

                            name="jobType"

                            value={formData.jobType}

                            onChange={handleChange}

                            required

                            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"

                        >

                            <option value="">

                                Select Job Type

                            </option>

                            <option value="Full Time">

                                Full Time

                            </option>

                            <option value="Part Time">

                                Part Time

                            </option>

                            <option value="Internship">

                                Internship

                            </option>

                            <option value="Remote">

                                Remote

                            </option>

                        </select>

                    </div>

                    {/* Skills */}

                    <div>

                        <label className="font-semibold">

                            Required Skills

                        </label>

                        <input

                            type="text"

                            name="skills"

                            value={formData.skills}

                            onChange={handleChange}

                            placeholder="React, Node.js, MongoDB"

                            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"

                        />

                        <p className="text-gray-500 text-sm mt-1">

                            Separate multiple skills using comma (,)

                        </p>

                    </div>

                    {/* Company Logo */}

                    <div>

                        <label className="font-semibold">

                            Company Logo

                        </label>

                        <input

                            type="file"

                            accept="image/*"

                            className="w-full mt-2 border rounded-xl p-3"

                        />

                        <p className="text-gray-500 text-sm mt-1">

                            Optional (PNG / JPG)

                        </p>

                    </div>

                    {/* Description */}

                    <div className="md:col-span-2">

                        <label className="font-semibold">

                            Job Description

                        </label>

                        <textarea

                            rows="7"

                            name="description"

                            value={formData.description}

                            onChange={handleChange}

                            required

                            placeholder="Write complete job description..."

                            className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"

                        />

                    </div>

                    {/* Buttons */}

                    <div className="md:col-span-2 flex justify-end gap-4 mt-4">

                        <button

                            type="button"

                            onClick={() => navigate("/employer")}

                            className="px-8 py-3 rounded-xl bg-gray-500 text-white hover:bg-gray-600 transition"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            disabled={loading}

                            className="px-10 py-3 rounded-xl bg-blue-700 text-white hover:bg-blue-800 transition"

                        >

                            {

                                loading

                                ?

                                "Creating Job..."

                                :

                                "Create Job"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}