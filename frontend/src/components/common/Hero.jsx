import { useState, useEffect } from "react";
// Agar Search component alag file me hai toh import zaroor karna
// import Search from "./Search"; 

export default function Hero({ search, setSearch, category, setCategory, location, setLocation }) {
  // Carousel State & Images
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const bannerImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [bannerImages.length]);

  return (
    <section className="relative bg-gradient-to-br from-[#111827] via-[#1E40AF] to-[#2048BD] pt-8 sm:pt-12 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
        
        {/* Left Column Text Content */}
        <div className="lg:col-span-7 text-left text-white space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20 text-[11px] sm:text-xs font-semibold text-[#d5e7fe]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            #1 Job Portal Platform for Tech Talent
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-100 to-white">Dream Job</span> & Accelerate Career.
          </h1>

          <p className="text-slate-200 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
            Connect with top tech companies, explore verified opportunities, and get hired faster with TalentBridge.
          </p>

          {/* Trust Features */}
          <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3 sm:gap-5 text-[11px] sm:text-xs text-slate-300 font-semibold">
            <span className="flex items-center gap-1.5">✓ 100% Verified Employers</span>
            <span className="flex items-center gap-1.5">✓ Direct Hiring Process</span>
            <span className="flex items-center gap-1.5">✓ Instant Alerts</span>
          </div>
        </div>

        {/* Right Column: Image Banner Carousel */}
        <div className="lg:col-span-5 relative flex justify-center mt-2 lg:mt-0">
          <div className="relative w-full max-w-md sm:max-w-lg aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900">
            {bannerImages.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`TalentBridge Banner ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  currentSlide === index ? "opacity-100 scale-105" : "opacity-0 scale-100"
                }`}
              />
            ))}
            
            {/* Floating Glass Badges */}
            <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl shadow-lg border border-white/80 flex items-center gap-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <div>
                <p className="text-[8px] sm:text-[9px] text-slate-500 font-semibold uppercase">Job Selected</p>
                <p className="text-[10px] sm:text-xs font-bold text-[#111827]">500+ Companies</p>
              </div>
            </div>

            <div className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl shadow-md border border-white/80">
              <p className="text-[8px] sm:text-[9px] text-slate-500 font-semibold uppercase">Active Hiring</p>
              <p className="text-[10px] sm:text-xs font-black text-[#2048BD]">10k+ Live Roles</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
