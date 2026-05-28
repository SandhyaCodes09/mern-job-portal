import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetails from "./pages/JobDetails";
import Jobs from "./pages/Jobs";

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

        {/* <Route path="/jobs" element={<Jobs />} /> */}
      </Routes>
    </BrowserRouter>

    </>
    
  );
}

export default App;