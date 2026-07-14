import { Link } from "react-router-dom";

export default function EmployerQuickAction() {

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold text-gray-700 mb-6">

                Quick Actions

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Create Job */}

                <Link

                    to="/create-job"

                    className="bg-blue-700 hover:bg-blue-800 text-white rounded-xl p-5 text-center transition"

                >

                    <div className="text-3xl mb-2">
                        ➕
                    </div>

                    <h3 className="font-semibold">

                        Post New Job

                    </h3>

                </Link>

                <Link

                    to="/view-applications"

                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl p-5 text-center transition"

                >

                    <div className="text-3xl mb-2">
                        📄
                    </div>

                    <h3 className="font-semibold">

                        View Applications

                    </h3>

                </Link>

                {/* My Jobs */}

                <Link

                    to="/my-jobs"

                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-5 text-center transition"

                >

                    <div className="text-3xl mb-2">
                        📂
                    </div>

                    <h3 className="font-semibold">

                        My Jobs

                    </h3>

                </Link>

                {/* Profile */}

                {/* <Link

                    to="/profile"

                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl p-5 text-center transition"

                >

                    <div className="text-3xl mb-2">
                        👤
                    </div>

                    <h3 className="font-semibold">

                        View Profile

                    </h3>

                </Link> */}

            </div>

        </div>

    );

}