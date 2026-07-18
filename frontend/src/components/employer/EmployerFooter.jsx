import { Mail, Phone } from "lucide-react";

export default function EmployerFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-gray-300 mt-10">
      <div className="w-full px-8 lg:px-12 py-8">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 gap-8 items-start">
          {/* Logo */}

          <div>
            <h2 className="text-3xl font-bold text-white">JobPortal</h2>

            <p className="text-blue-400 text-sm">Employer Panel</p>

            <p className="mt-3 text-sm text-gray-400 leading-6 max-w-sm">
              Manage jobs, applications and company profile from one powerful
              recruiter dashboard.
            </p>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail size={16} />

                <span>support@jobportal.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} />

                <span>+91 9876543210</span>
              </div>
            </div>
          </div>

          {/* Status */}

          <div>
            <h3 className="text-white font-semibold mb-4">
              Dashboard Features
            </h3>

            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span>✔ Post Jobs</span>

              <span>✔ My Jobs</span>

              <span>✔ Applications</span>

              <span>✔ Secure Panel</span>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="border-t border-gray-700 mt-6 pt-5 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400">
            © {year} JobPortal Employer Panel. All Rights Reserved.
          </p>

          <p className="text-gray-500 mt-2 md:mt-0">Built with MERN Stack</p>
        </div>
      </div>
    </footer>
  );
}
