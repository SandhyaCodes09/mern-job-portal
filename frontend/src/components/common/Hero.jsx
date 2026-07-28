// import { Link } from "react-router-dom";

//   // Carousel Images
// const bannerImages = [
//   // 1. Team Workspace (Perfect Wide Angle)
//   "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  
//   // 2. Tech Developer Working on Laptop
//   "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",

//   // 3. Corporate Tech Interview Scene
//   "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1200&q=80",
// ];

// export default function Hero() {
//   return (
//     // <section className="relative bg-[#111827] text-white py-28 sm:py-36 overflow-hidden">
      
//     //   {/* Background Ambient Glow */}
//     //   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full bg-[#2048BD]/20 blur-[120px] rounded-full pointer-events-none" />

//     //   <div className="max-w-7xl mx-auto px-5 text-center relative z-10">
//     //     <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
//     //       Find Your <span className="text-[#d5e7fe]">Dream Job</span> Today
//     //     </h1>

//     //     <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-medium">
//     //       Explore thousands of opportunities from top companies and build your
//     //       future with confidence.
//     //     </p>

//     //     <div className="flex flex-col sm:flex-row justify-center gap-4">
//     //       <Link 
//     //         to="/jobs" 
//     //         className="bg-[#2048BD] hover:bg-[#1E40AF] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 active:scale-95"
//     //       >
//     //         Explore Jobs
//     //       </Link>

//     //       <Link 
//     //         to="/register" // Ya /employer agar specifically employer ke liye route ho
//     //         className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-8 py-4 rounded-xl font-bold transition-all active:scale-95"
//     //       >
//     //         Post a Job
//     //       </Link>
//     //     </div>
//     //   </div>
//     // </section>

//           <section className="relative bg-gradient-to-br from-[#111827] via-[#1E40AF] to-[#2048BD] pt-8 sm:pt-12 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8">
//               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
                
//                 {/* Left Column Text Content */}
//                 <div className="lg:col-span-7 text-left text-white space-y-4 sm:space-y-6">
//                   <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20 text-[11px] sm:text-xs font-semibold text-[#d5e7fe]">
//                     <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
//                     #1 Job Portal Platform for Tech Talent
//                   </div>
    
//                   <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
//                     Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-100 to-white">Dream Job</span> & Accelerate Career.
//                   </h1>
    
//                   <p className="text-slate-200 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
//                     Connect with top tech companies, explore verified opportunities, and get hired faster with TalentBridge.
//                   </p>
    
//                   {/* Trust Features */}
//                   <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3 sm:gap-5 text-[11px] sm:text-xs text-slate-300 font-semibold">
//                     <span className="flex items-center gap-1.5">✓ 100% Verified Employers</span>
//                     <span className="flex items-center gap-1.5">✓ Direct Hiring Process</span>
//                     <span className="flex items-center gap-1.5">✓ Instant Alerts</span>
//                   </div>
//                 </div>
    
//                 {/* Right Column: Image Banner Carousel */}
//                 <div className="lg:col-span-5 relative flex justify-center mt-2 lg:mt-0">
//                   <div className="relative w-full max-w-md sm:max-w-lg aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900">
//                     {bannerImages.map((imgUrl, index) => (
//                       <img
//                         key={index}
//                         src={imgUrl}
//                         alt={`TalentBridge Banner ${index + 1}`}
//                         className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
//                           currentSlide === index ? "opacity-100 scale-105" : "opacity-0 scale-100"
//                         }`}
//                       />
//                     ))}
                    
//                     {/* Floating Glass Badges */}
//                     <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl shadow-lg border border-white/80 flex items-center gap-2">
//                       <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
//                         ✓
//                       </div>
//                       <div>
//                         <p className="text-[8px] sm:text-[9px] text-slate-500 font-semibold uppercase">Job Selected</p>
//                         <p className="text-[10px] sm:text-xs font-bold text-[#111827]">500+ Companies</p>
//                       </div>
//                     </div>
    
//                     <div className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl shadow-md border border-white/80">
//                       <p className="text-[8px] sm:text-[9px] text-slate-500 font-semibold uppercase">Active Hiring</p>
//                       <p className="text-[10px] sm:text-xs font-black text-[#2048BD]">10k+ Live Roles</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
    
//               {/* ==========================================
//                   SEARCH BAR OVERLAP (RESPONSIVE POSITIONING)
//               ========================================== */}
//               <div className="max-w-5xl mx-auto relative -mb-36 sm:-mb-40 pt-8 sm:pt-10 z-30">
//                 <div className="bg-white p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100">
//                   <Search
//                     search={search}
//                     setSearch={setSearch}
//                     category={category}
//                     setCategory={setCategory}
//                     location={location}
//                     setLocation={setLocation}
//                   />
//                 </div>
//               </div>
//                </section>
//   );
// }

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

      {/* ==========================================
          SEARCH BAR OVERLAP (RESPONSIVE POSITIONING)
      ========================================== */}
 
    </section>
  );
}


    //  <div className="max-w-5xl mx-auto relative -mb-36 sm:-mb-40 pt-8 sm:pt-10 z-30">
    //     <div className="bg-white p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100">
          
    //       {/* Ensure you have the Search component imported correctly above */}
    //       {/* <Search
    //         search={search}
    //         setSearch={setSearch}
    //         category={category}
    //         setCategory={setCategory}
    //         location={location}
    //         setLocation={setLocation}
    //       /> */}
          
    //       {/* Temporary placeholder if Search component is missing */}
    //       <div className="text-center text-slate-500 py-4 font-bold">
    //         Search Bar Component Will Render Here
    //       </div>
          
    //     </div>
    //   </div>