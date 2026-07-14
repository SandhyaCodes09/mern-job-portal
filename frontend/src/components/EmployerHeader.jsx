import { Link } from "react-router-dom";

const EmployerHeader = ({ user, notificationCount = 0 }) => {
    return (
        // <div className="bg-white shadow sticky top-0 z-50">
        <div className="bg-white shadow px-4 py-2 sticky top-0">
            <div className="w-full px-6 py-4 flex items-center justify-between">

                {/* Left: Logo + Title */}
                <div className="flex items-center gap-3">
                    <div className="bg-blue-700 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl">
                        J
                    </div>
                    <h1 className="text-2xl font-bold text-blue-700 whitespace-nowrap">
                        Employer Dashboard
                    </h1>
                </div>

                {/* Center: Nav Links */}
                <div className="hidden lg:flex items-center gap-6">
                    <Link to="/employer-dashboard" className="text-gray-700 hover:text-blue-700 font-medium transition">
                        Dashboard
                    </Link>
                    <Link to="/post-job" className="text-gray-700 hover:text-blue-700 font-medium transition">
                        Post Job
                    </Link>
                    <Link to="/manage-applications" className="text-gray-700 hover:text-blue-700 font-medium transition">
                        Applications
                    </Link>
                </div>

                {/* Right: Notification + Profile */}
                <div className="flex items-center gap-4">

                    <button className="relative text-gray-600 hover:text-blue-700 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0a3 3 0 11-6 0m6 0H9" />
                        </svg>
                        {notificationCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                {notificationCount}
                            </span>
                        )}
                    </button>

                    <div className="flex items-center gap-2 cursor-pointer">
                        <img
                            src={user?.profileImage || "/default-avatar.png"}
                            alt="profile"
                            className="w-10 h-10 rounded-full object-cover border-2 border-blue-700"
                        />
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-semibold text-gray-800">
                                {user?.name || "Employer"}
                            </p>
                            <p className="text-xs text-gray-500">
                                {user?.companyName || "Company"}
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default EmployerHeader;