import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, Users } from "lucide-react";

export default function EmployerStats({
  totalJobs = 0,
  activeJobs = 0,
  totalApplications = 0,
}) {
  const stats = [
    {
      title: "Total Jobs",
      value: totalJobs,
      icon: Briefcase,
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "hover:border-indigo-300",
      glowColor: "hover:shadow-indigo-500/10",
    },
    {
      title: "Active Jobs",
      value: activeJobs,
      icon: CheckCircle2,
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "hover:border-emerald-300",
      glowColor: "hover:shadow-emerald-500/10",
    },
    {
      title: "Applications",
      value: totalApplications,
      icon: Users,
      textColor: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "hover:border-amber-300",
      glowColor: "hover:shadow-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`group relative bg-white border border-slate-200/80 ${stat.borderColor} rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-xl ${stat.glowColor} overflow-hidden`}
          >
            {/* Background Light Glow */}
            <div className={`absolute -right-8 -top-8 w-28 h-28 ${stat.bgColor} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />

            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {stat.title}
                </p>
                <h1 className="text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
                  {stat.value}
                </h1>
              </div>

              {/* Icon Container */}
              <div className={`p-3.5 rounded-xl ${stat.bgColor} ${stat.textColor} border border-slate-100 transition-transform duration-300 group-hover:scale-110`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>Real-time Update</span>
              <span className={`font-bold ${stat.textColor}`}>
                Live Count
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
