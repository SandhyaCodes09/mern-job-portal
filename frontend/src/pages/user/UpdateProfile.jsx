import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { updateProfile } from "../../services/authService";
import { roleLabel } from "../../utils/RoleLabel";

export default function EditProfile() {

  const [user, setUser] = useState(null);

  const [resume, setResume] = useState(null);

  useEffect(() => {

    fetchUser();

  }, []);

  const fetchUser = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/auth/me",
      {
        withCredentials: true
      }
    );

    setUser(res.data.user);

  };

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };

  // const handleSubmit = async (e) => {

  //   e.preventDefault();

  //   alert("Profile Updated");

  // };

  // Handle profile update
// const handleSubmit = async (e) => {

//   e.preventDefault();

//   try {

//     // Update profile details
//     await updateProfile({

//       first_name: user.first_name,
//       last_name: user.last_name,
//       phone_no: user.phone_no,
//       address: user.address,
//       gender: user.gender

//     });

//     alert("Profile Updated Successfully");

//     // Refresh latest user data
//     fetchUser();

//   } catch (error) {

//     console.log(error);

//     alert("Something went wrong");

//   }

// };

// const handleSubmit = async (e) => {

//   e.preventDefault();

//   try {

//     const res = await updateProfile({
//       first_name: user.first_name,
//       last_name: user.last_name,
//       phone_no: user.phone_no,
//       address: user.address,
//       gender: user.gender
//     });

//     // Update local state
//     setUser(res.user);

//     // Update localStorage
//     localStorage.setItem(
//       "user",
//       JSON.stringify(res.user)
//     );

//     alert(res.msg);

//   } catch (error) {

//     console.log(error);

//     alert(error.response?.data?.msg || "Something went wrong");

//   }

// };

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const formData = new FormData();

        formData.append("first_name", user.first_name);
        formData.append("last_name", user.last_name);
        formData.append("phone_no", user.phone_no);
        formData.append("address", user.address);
        formData.append("gender", user.gender);

        if (resume) {
            formData.append("resume", resume);
        }

        const res = await updateProfile(formData);

        setUser(res.user);

        localStorage.setItem(
            "user",
            JSON.stringify(res.user)
        );

        alert(res.msg);

    } catch (error) {

        console.log(error);

        alert("Update Failed");

    }

};

  if (!user) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-2xl font-semibold text-blue-700">
        Loading...
      </h2>
    </div>
  );
}

  return (

    <div className="min-h-screen bg-blue-50 py-12">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-blue-700 mb-10">
          Edit Profile
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT */}

          <div className="flex flex-col items-center">

            <img
              src={`https://ui-avatars.com/api/?name=${user.first_name}`}
              className="w-40 h-40 rounded-full border-4 border-blue-600"
              alt=""
            />

            <h2 className="text-2xl font-bold mt-5">

              {user.first_name} {user.last_name}

            </h2>

            <p className="text-gray-500">

             {roleLabel[user.role]}


            </p>

          </div>

          {/* RIGHT */}

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-5"
          >

            <input
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              className="w-full border rounded-xl p-4"
            />

            <input
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              className="w-full border rounded-xl p-4"
            />

            <input
              value={user.email}
              readOnly
              className="w-full border rounded-xl p-4 bg-gray-100"
            />

            <input
              name="phone_no"
              value={user.phone_no}
              onChange={handleChange}
              className="w-full border rounded-xl p-4"
            />

            <textarea
              rows="4"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="w-full border rounded-xl p-4"
            />

            <select
              name="gender"
              value={user.gender}
              onChange={handleChange}
              className="w-full border rounded-xl p-4"
            >

              <option value="male">Male</option>

              <option value="female">Female</option>

              <option value="other">Other</option>

            </select>

            {/* Resume */}

            <div>

              <h3 className="font-semibold mb-3">
                Current Resume
              </h3>

              {

                user.resume ?

                <div className="flex gap-4">

                  <a
                    href={`http://localhost:5000/uploads/resumes/${user.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Resume
                  </a>

                  <a
                    href={`http://localhost:5000/uploads/resumes/${user.resume}`}
                    download
                    className="text-green-600 underline"
                  >
                    Download
                  </a>

                </div>

                :

                <p>No Resume Uploaded</p>

              }

            </div>

            <input
              type="file"
              onChange={(e)=>setResume(e.target.files[0])}
            />

            <div className="flex gap-5">

              <Link
                to="/profile"
                className="bg-gray-400 text-white px-8 py-3 rounded-xl"
              >
                Cancel
              </Link>

              <button type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl"
              >
                Save Changes
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}