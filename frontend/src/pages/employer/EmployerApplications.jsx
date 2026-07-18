import EmployerNavbar from "../../components/employer/EmployerNavbar";

export default function EmployerApplications() {
  return (
    <>
      <EmployerNavbar />

      <div className="min-h-screen bg-slate-100 p-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          Job Applications
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-600">Total</h3>

            <h2 className="text-4xl font-bold mt-3">0</h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-600">Pending</h3>

            <h2 className="text-4xl font-bold text-orange-500 mt-3">0</h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-600">Selected</h3>

            <h2 className="text-4xl font-bold text-green-600 mt-3">0</h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-600">Rejected</h3>

            <h2 className="text-4xl font-bold text-red-600 mt-3">0</h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">
            Candidate Applications
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="p-4 text-left">Candidate</th>

                  <th className="p-4 text-left">Job</th>

                  <th className="p-4 text-left">Experience</th>

                  <th className="p-4 text-left">Status</th>

                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">
                    No Applications Found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
