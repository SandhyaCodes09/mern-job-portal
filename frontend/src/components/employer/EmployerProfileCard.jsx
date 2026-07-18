import { Link } from "react-router-dom";

export default function EmployerProfileCard({ user }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Avatar */}

      <div className="flex justify-center">
        <div className="w-40 h-40 rounded-full bg-blue-700 text-white flex items-center justify-center text-5xl font-bold">
          {user?.first_name?.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Name */}

      <h2 className="text-2xl font-bold text-center mt-5">
        {user?.first_name} {user?.last_name}
      </h2>

      <p className="text-center text-blue-600 font-semibold">Employer</p>

      <hr className="my-6" />

      {/* Details */}

      <div className="space-y-3">
        <p>
          <strong>Email :</strong>

          <br />

          {user?.email}
        </p>

        <p>
          <strong>Phone :</strong>

          <br />

          {user?.phone_no}
        </p>

        <p>
          <strong>Address :</strong>

          <br />

          {user?.address}
        </p>
      </div>

      <Link
        to="/employer/profile/edit"
        className="block mt-8 bg-blue-700 text-white text-center py-3 rounded-lg hover:bg-blue-800"
      >
        Edit Profile
      </Link>

      <Link
        to="/settings"
        className="block mt-4 bg-gray-600 text-white text-center py-3 rounded-lg hover:bg-gray-700"
      >
        Settings
      </Link>
    </div>
  );
}
