import { Link } from "react-router-dom";
import { PlusCircle, FileText, Briefcase, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function EmployerQuickAction({ totalJobs = 0, totalApplications = 0 }) {
  const actions = [
    {
      title: "Post New Job",
      desc: "Create and publish a new position",
      badge: "Fast Track",
      icon: PlusCircle,
      link: "/employer/create-job",
      gradient: "from-blue-600 via-indigo-600 to-indigo-700",
      glow: "hover:shadow-indigo-500/20",
    },
    {
      title: "View Applications",
      desc: "Review candidate profiles & resumes",
      badge: `${totalApplications} Received`,
      icon: FileText,
      link: "/employer/applications",
      gradient: "from-amber-500 via-orange-500 to-orange-600",
      glow: "hover:shadow-orange-500/20",
    },
    {
      title: "My Jobs",
      desc: "Manage existing active job posts",
      badge: `${totalJobs} Active`,
      icon: Briefcase,
      link: "/employer/my-jobs",
      gradient: "from-emerald-500 via-teal-600 to-teal-700",
      glow: "hover:shadow-emerald-500/20",
    },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
            <p className="text-xs text-slate-500">Frequently used employer tools</p>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                to={action.link}
                className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br ${action.gradient} text-white shadow-md transition-all duration-300 hover:shadow-xl ${action.glow} overflow-hidden h-full border border-white/20`}
              >
                {/* Decorative Overlay Glow */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                {/* Top Section */}
                <div className="flex justify-between items-start relative z-10">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl group-hover:rotate-6 transition-transform duration-300 border border-white/30">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-black/20 backdrop-blur-sm rounded-full border border-white/20 text-white">
                    {action.badge}
                  </span>
                </div>

                {/* Bottom Section */}
                <div className="mt-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold tracking-wide text-white">{action.title}</h3>
                    <ArrowUpRight className="w-4 h-4 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-white/85 mt-1 font-medium line-clamp-1">{action.desc}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}