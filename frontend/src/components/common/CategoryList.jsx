import "../../styles/home.css";
import { Link } from "react-router-dom";

export default function Category({ category, setCategory }) {
  return (
    <>
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-3">
            Job Categories
          </h2>

          <p className="text-center text-gray-600 mb-12">
            Explore various job categories to find your ideal job.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Human Resources",
              "Project Manager",
              "Software Development",
              "IT & Networking",
              "Finance",
              "Marketing",
            ].map((cat, i) => (
              <div
                key={i}
                className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  {cat}
                </h3>

                <p className="text-gray-500 mb-5">120+ Jobs Available</p>

                <Link
                  to="/jobs"
                  className="inline-block bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  Explore Jobs
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
