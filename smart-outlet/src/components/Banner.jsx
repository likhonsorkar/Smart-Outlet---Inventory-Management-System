import React from 'react';

const Banner = () => {
  return (
    <div className="container mx-auto px-4 my-16">
      <div className="relative w-full max-w-5xl mx-auto h-[120px] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl shadow-blue-600/20">
        {/* Modern Mesh Gradient Background */}
        <div className="absolute inset-0 bg-[#0A0A0A]">
          <div className="absolute top-[-50%] left-[-10%] w-[70%] h-[200%] bg-blue-600 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-[-50%] right-[-10%] w-[60%] h-[180%] bg-indigo-600 rounded-full blur-[100px] opacity-20 animate-pulse transition-all duration-1000 group-hover:opacity-40"></div>
        </div>

        <div className="relative h-full flex items-center justify-between px-10 md:px-16 text-white border border-white/10 rounded-[2.5rem]">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
            <div>
              <span className="text-blue-500 font-black text-xs uppercase tracking-[0.3em] mb-1 block">Limited Time</span>
              <h3 className="text-2xl md:text-4xl font-black tracking-tighter">FLASH <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">SALE</span></h3>
            </div>
            <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
            <div>
              <p className="text-white/60 text-xs md:text-sm font-medium uppercase tracking-widest mb-1">Use Code</p>
              <p className="text-xl font-black font-mono tracking-tighter text-blue-400">NEXTGEN26</p>
            </div>
          </div>

          <div className="hidden sm:block">
            <button className="bg-white text-black px-8 py-3 rounded-2xl font-black text-sm transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 shadow-xl">
              CLAIM NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
