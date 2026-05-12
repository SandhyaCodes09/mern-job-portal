import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <>
    <header className="navbar-section">
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className="logo">
        <h2>Job Portal</h2>
      </div>

      <nav className={`navbar ${menuOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/job/${job._id}">Jobs</Link>
        <Link to="/login">Login</Link>
        <button onClick={handleLogout}>Logout</button>

        <div className="form">
          <input type="file" />
          <button>Upload Resume</button>
        </div>
      </nav>
    </header>
    
    {/* ================= HERO ================= */}

    <section className="heading">
        <h1>Welcome to the Job Portal</h1>
        <p>Find your dream job today!</p>
      </section>
    </>
    

    
  );
}