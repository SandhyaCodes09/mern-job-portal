import { BrowserRouter, Routes, Route } from "react-router-dom";


// ===============================
// COMMON PAGES
// (User + Employer dono use kar sakte hain)
// ===============================

import Home from "./pages/common/Home";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import JobDetails from "./pages/common/JobDetails";
import Jobs from "./pages/common/Jobs";



// ===============================
// USER PAGES
// (Normal job seeker/candidate)
// ===============================

import UserDashboard from "./pages/user/UserDashboard";
import UserEditProfile from "./pages/user/UpdateProfile";



// ===============================
// EMPLOYER PAGES
// (Company / Recruiter)
// ===============================

import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerCreateJob from "./pages/employer/EmployerCreateJob";
import EmployerEditJob from "./pages/employer/EmployerEditJob";
import EmployerMyJobs from "./pages/employer/EmployerMyJobs";
import EmployerProfile from "./pages/employer/EmployerProfile";
import EmployerEditProfile from "./pages/employer/EmployerEditProfile";
import EmployerApplications from "./pages/employer/EmployerApplications";




function App() {


  return (

    <BrowserRouter>

      <Routes>


        {/* =================================================
            COMMON ROUTES
            Login, Register, Home, Jobs
        ================================================= */}


        <Route 
          path="/" 
          element={<Home />} 
        />


        <Route 
          path="/login" 
          element={<Login />} 
        />


        <Route 
          path="/register" 
          element={<Register />} 
        />


        <Route 
          path="/jobs" 
          element={<Jobs />} 
        />


        <Route 
          path="/jobs/search" 
          element={<Jobs />} 
        />


        <Route 
          path="/jobs/category/:category" 
          element={<Jobs />} 
        />


        <Route 
          path="/job/:id" 
          element={<JobDetails />} 
        />





        {/* =================================================
            USER ROUTES
            Candidate / Job Seeker ke liye
        ================================================= */}


        <Route
          path="/user/dashboard"
          element={<UserDashboard />}
        />


        <Route
          path="/user/profile/edit"
          element={<UserEditProfile />}
        />






        {/* =================================================
            EMPLOYER ROUTES
            Recruiter / Company ke liye
        ================================================= */}



        {/* Employer Dashboard */}
        <Route
          path="/employer"
          element={<EmployerDashboard />}
        />



        {/* Employer Create Job */}
        <Route
          path="/employer/create-job"
          element={<EmployerCreateJob />}
        />



        {/* Employer My Posted Jobs */}
        <Route
          path="/employer/my-jobs"
          element={<EmployerMyJobs />}
        />



        {/* Employer Edit Job */}
        <Route
          path="/employer/edit-job/:id"
          element={<EmployerEditJob />}
        />



        {/* Employer Full Profile Page */}
        <Route
          path="/employer/profile"
          element={<EmployerProfile />}
        />



        {/* Employer Edit Profile */}
        <Route
          path="/employer/profile/edit"
          element={<EmployerEditProfile />}
        />



        {/* Employer Applications */}
        <Route
          path="/employer/applications"
          element={<EmployerApplications />}
        />




      </Routes>


    </BrowserRouter>

  );

}


export default App;