export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 ">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-4">Job Portal</h2>

          <p className="text-gray-400 leading-7">
            Find your dream jobs and explore opportunities from top companies
            around the world.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>

            <li>
              <a href="/jobs" className="hover:text-white transition">
                Jobs
              </a>
            </li>

            <li>
              <a href="/login" className="hover:text-white transition">
                Login
              </a>
            </li>

            <li>
              <a href="/register" className="hover:text-white transition">
                Register
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>

          <p className="text-gray-400 mb-2">Email: support@jobportal.com</p>

          <p className="text-gray-400 mb-2">Phone: +91 9876543210</p>

          <p className="text-gray-400">India</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Job Portal. All rights reserved.</p>

        <p className="mt-2">Designed by Sandhya</p>
      </div>
    </footer>
  );
}
