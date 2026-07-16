import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetails from "./pages/JobDetails";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import EmployerDashboard from "./pages/EmployerDashboard";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";


function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
          {/* <Route path="/jobs" element={<Home />} /> */}
          <Route path="/jobs/search" element={<Jobs />} />

        <Route path="/jobs/category/:category" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />

        {/* Profile route */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Update Profile route */}  
        <Route
          path="/profile/edit"
          element={<UpdateProfile />}
        />

     {/* Employer Dashboard route */}
      <Route
      path="/employer"
      element={<EmployerDashboard />}
      />

      {/* Create Job route */}
      <Route
      path="/create-job"
      element={<CreateJob />}
      />

      {/* Edit Job route */}
      <Route
      path="/edit-job/:id"
      element={<EditJob />}
      />

      </Routes>

     

    </BrowserRouter>

    </>
    
  );
}

export default App;