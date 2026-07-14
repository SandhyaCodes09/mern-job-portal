export default function EmployerStats({

    totalJobs,
    activeJobs,
    totalApplications

}) {

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Total Jobs */}

            <div className="bg-white rounded-2xl shadow-lg p-6">

                <h3 className="text-gray-500 font-semibold">
                    Total Jobs
                </h3>

                <h1 className="text-4xl font-bold text-blue-700 mt-4">
                    {totalJobs}
                </h1>

            </div>

            {/* Active Jobs */}

            <div className="bg-white rounded-2xl shadow-lg p-6">

                <h3 className="text-gray-500 font-semibold">
                    Active Jobs
                </h3>

                <h1 className="text-4xl font-bold text-green-600 mt-4">
                    {activeJobs}
                </h1>

            </div>

            {/* Applications */}

            <div className="bg-white rounded-2xl shadow-lg p-6">

                <h3 className="text-gray-500 font-semibold">
                    Applications
                </h3>

                <h1 className="text-4xl font-bold text-orange-500 mt-4">
                    {totalApplications}
                </h1>

            </div>

        </div>

    );

}