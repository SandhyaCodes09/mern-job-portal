import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { roleLabel } from "../utils/RoleLabel";


export default function Navbar() {


  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState(null);

  // Store selected resume file
const [resumeMenu, setResumeMenu] = useState(false);

  const navigate = useNavigate();

  //===========================================//
  // Upload resume function
  //===========================================// 

  // const handleResumeUpload = async () => {

  //   try {

  //     // Check file selected or not
  //     if (!resumeFile) {

  //       alert("Please select a file");

  //       return;

  //     }

  //     // Create form data
  //     const formData = new FormData();

  //     formData.append("resume", resumeFile);

  //     // Send file to backend
  //     const res = await axios.post(
  //       "http://localhost:5000/api/auth/upload-resume",
  //       formData,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "multipart/form-data"
  //         }
  //       }
  //     );

  //     // Update frontend user state
  //     setUser({
  //       ...user,
  //       resume: res.data.resume
  //     });

  //     setUser(updatedUser);

  //     // Update localStorage also
  //     localStorage.setItem(
  //       "user",
  //       JSON.stringify(updatedUser)
  //     );

  //     alert("Resume uploaded successfully");

  //   } catch (error) {

  //     console.log(error);

  //   }

  // };

  //===========================================//
// Upload resume function
//===========================================//

// const handleResumeUpload = async () => {

//   try {

//     if (!resumeFile) {
//       alert("Please select a file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("resume", resumeFile);

//     const res = await axios.post(
//       "http://localhost:5000/api/auth/upload-resume",
//       formData,
//       {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       }
//     );

//     // Get latest user data
//     const userRes = await axios.get(
//       "http://localhost:5000/api/auth/me",
//       {
//         withCredentials: true
//       }
//     );

//     setUser(userRes.data.user);

//     localStorage.setItem(
//       "user",
//       JSON.stringify(userRes.data.user)
//     );

//     alert("Resume uploaded successfully");

//   } catch (error) {

//     console.log(error);

//     alert("Resume upload failed");

//   }

// };

//   {
// user?.resume && (

// <div className="flex gap-3">

// <a
// href={`http://localhost:5000/uploads/resumes/${user.resume}`}
// target="_blank"
// rel="noreferrer"
// className="text-white underline"
// >
// View Resume
// </a>

// <a
// href={`http://localhost:5000/uploads/resumes/${user.resume}`}
// download
// className="text-yellow-300 underline"
// >
// Download
// </a>

// </div>

// )
// }


  //===========================================// 
  // logout handler with API call to backend
  //===========================================// 



  const handleLogout = async () => {

    try {

      // Call backend logout API
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true
        }
      );

      // Remove user from state
      setUser(null);

      // Redirect to login page
      navigate("/login");

    } catch (error) {

      console.log(error);

    }

  };

  //=====================================//
  //   setuser(null);
  //===========================================// 

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            withCredentials: true
          }
        );

        setUser(res.data.user);

      } catch (error) {

        console.log(error);

      }

    };

    fetchUser();

  }, []);

  return (

    <>
      <header className="bg-blue-800 shadow-md fixed top-0 left-0 w-full z-50">
        {/* <div className="max-w-7xl mx-auto px-5 py-4">

          <div className="flex justify-between items-center">

            <div
              className="text-white text-3xl cursor-pointer md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </div>

            <div>
              <h2 className="text-white text-3xl font-bold ">
                Job Portal
              </h2>
            </div>

            <div>
               <nav
              className={`
                ${menuOpen ? "flex" : "hidden"}
                md:flex
                flex-col md:flex-row
                md:items-center
                md:justify-end
                gap-4 md:gap-6
                md:w-auto
                bg-green-700 md:bg-transparent
                mt-4 md:mt-0
                p-4 md:p-0
                `}
              >

              <Link
                to="/"
                className="text-white hover:text-yellow-300"
              >
                Home
              </Link>

              <Link
                to="/jobs"
                className="text-white hover:text-yellow-300"
              >
                Jobs
              </Link>

              <Link
                to="/login"
                className="text-white hover:text-yellow-300"
              >
                Login
              </Link>

              <button
                className="bg-blue-800 text-white px-3 py-2 rounded hover:bg-blue-900"
                onClick={handleLogout}
              >
                Logout
              </button>

              <div className="flex flex-col md:flex-row gap-2">

                <input
                  type="file"
                  className="border text-white border-gray-300 p-2 rounded"
                />

                <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">
                  Upload Resume
                </button>

              </div>

            </nav>
            </div>

           

          </div>
        </div> */}
        <div className="flex justify-between items-center w-full">

          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-3 m-4">

            <div
              className="text-white text-3xl cursor-pointer md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </div>

            <h2 className="text-white text-3xl font-bold">
              Job Portal
            </h2>
          </div>

          {/* Right: Nav */}
          <nav
            className={`
            ${menuOpen ? "flex" : "hidden"}
            md:flex
            flex-col md:flex-row
            md:items-center
            md:justify-end
            gap-4 md:gap-6
            bg-green-700 md:bg-transparent
            absolute md:static
            top-16 left-0 w-full md:w-auto
            p-4 md:p-0 mx-4 my-4
          `}
          >
            <Link to="/" className="text-white hover:text-yellow-300">Home</Link>
            <Link to="/jobs" className="text-white hover:text-yellow-300">Jobs</Link>
            {/* <Link to="/login" className="text-white hover:text-yellow-300">Login</Link> */}

            {/* // show user info if logged in, otherwise show login link */}

            {/* {
   
              user ? (
                
                // <div className="text-white font-semibold">
                //   {user.first_name} ({user.role})
                // </div>

                <Link to="/profile" className="text-white font-semibold hover:text-yellow-300">
                  {user.first_name} ({roleLabel[user.role]})
                </Link>

              ) : (

                <Link
                  to="/login"
                  className="text-white hover:text-yellow-300"
                >
                  Login
                </Link>

              )
            } */}
{/* 
            {
              user?.role === "employer" && (
                <Link
                  to="/employer"
                  className="text-white hover:text-yellow-300"
                >
                  Employer Dashboard
                </Link>
              )
            } */}

            {
              user ? (

                <Link
                  to={user.role === "employer" ? "/employer" : "/profile"}
                  className="text-white font-semibold hover:text-yellow-300"
                >
                  {user.first_name} ({roleLabel[user.role]})
                </Link>

              ) : (

                <Link
                  to="/login"
                  className="text-white hover:text-yellow-300"
                >
                  Login
                </Link>

              )
            }

            <button
              className="bg-blue-800 text-white px-3 py-2 rounded hover:bg-blue-900"
              onClick={handleLogout}
            >
              Logout
            </button>

            {/* <div className="flex flex-col md:flex-row gap-2">

              <input
                type="file"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="border text-white border-gray-300 p-2 rounded"
              />

              <button
                onClick={handleResumeUpload}
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Upload Resume
              </button>

              {user?.resume && (

              <div className="flex gap-3 mt-2">

                <a
                  href={`http://localhost:5000/uploads/resumes/${user.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white underline"
                >
                  View Resume
                </a>

                <a
                  href={`http://localhost:5000/uploads/resumes/${user.resume}`}
                  download
                  className="text-yellow-300 underline"
                >
                  Download
                </a>

              </div>

            )}

            </div> */}

            <div className="relative">

            <button
              onClick={() => setResumeMenu(!resumeMenu)}
              className="text-white hover:text-yellow-300"
            >
              Resume ▼
            </button>

            {resumeMenu && (

              <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg text-black">

                {user?.resume ? (

                  

                  <>

                    <a
                      href={`http://localhost:5000/uploads/resumes/${user.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      👁 View Resume
                    </a>

                    <a
                      href={`http://localhost:5000/uploads/resumes/${user.resume}`}
                      download
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      ⬇ Download Resume
                    </a>

                    <Link
                      to="/profile/edit"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      ✏ Update Resume
                    </Link>

                  </>

                ) : (

                  <Link
                    to="/profile/edit"
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    Upload Resume
                  </Link>

                )}

              </div>

            )}

          </div>

          </nav>
        </div>
      </header>



      <div className={`${menuOpen ? "h-64" : "h-20"} md:h-20`}></div>

    </>

  );
}