import {useState} from "react";
import "../styles/home.css";
import { Link } from "react-router-dom";


export default function Category({ category, setCategory }) {
    return (
        <>
            <section className="category-section">
        <div className="container">
          <h2>Job Categories</h2>
          <p>Explore various job categories to find your ideal job.</p>

          <div className="category-item">
            {[
              "Human Resources",
              "Project Manager",
              "Software Development",
              "IT & Networking",
              "Finance",
              "Marketing",
            ].map((cat, i) => (
              <div key={i} className="category">
                <h3>{cat}</h3>
                <p>120+ Jobs Available</p>
                <Link to="/jobs">Explore Jobs</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
        </>
    )
}