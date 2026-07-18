export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-28">
      <div className="max-w-7xl mx-auto px-5 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Find Your Dream Job Today
        </h1>

        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
          Explore thousands of opportunities from top companies and build your
          future with confidence.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition">
            Explore Jobs
          </button>

          <button className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition">
            Post a Job
          </button>
        </div>
      </div>
    </section>
  );
}
