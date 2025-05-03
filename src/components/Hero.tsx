import { ServiceChoose } from "@/UserPage/Service.choose";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaSun, FaMoon } from 'react-icons/fa';

export const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const serviceChooseRef = useRef(null);
  const imageSectionRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const scrollToServices = () => {
    serviceChooseRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (imageSectionRef.current) {
        const rect = imageSectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsScrolled(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">

      {/* Initial Content Section */}
      <div className="relative h-screen w-full overflow-hidden bg-transparent">
        
        {/* Background elements */}
        <div className="absolute inset-0 w-full h-full">
          {theme === 'light' ? (
            <div className="w-full h-full"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, rgba(255, 204, 0, 0.5) 0%, rgba(255, 183, 77, 0.4) 40%, rgba(255, 255, 255, 0.5) 70%, transparent 100%),
                  radial-gradient(circle at 70% 70%, rgba(255, 140, 0, 0.3) 0%, rgba(255, 193, 7, 0.4) 40%, rgba(255, 255, 255, 0.3) 70%, transparent 100%)
                `,
                backgroundBlendMode: 'overlay'
              }}>
            </div>
          ) : (
            <div className="w-full h-full"></div>
          )}
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 z-0">
          <div className={`absolute bottom-0 left-0 right-0 top-0 ${
            theme === 'dark' 
              ? 'bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]' 
              : ''
          } bg-[size:14px_24px]`}></div>
        </div>

        <section className="h-full flex flex-col items-center justify-center relative">
          <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
            <div className={`max-w-5xl flex flex-col items-center justify-center z-10 pt-8 backdrop-blur-[2px] p-8 rounded-3xl ${
              theme === 'dark' ? 'bg-zinc-900/50' : 'bg-zinc-100/20'
            } transition-colors duration-300`}>
              <h1 className="text-2xl md:text-5xl lg:text-7xl font-extrabold text-center tracking-tight space-x-2 md:space-x-3 lg:space-x-4 m-6">
                <span className={`block ${theme === 'dark' ? 'text-white' : 'text-zinc-900'} drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]`}>
                  Your One-Stop Solution
                </span>
                <span className="text-amber-500 drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                  For All Home Services
                </span>
              </h1>

              <p className={`text-base md:text-xl text-center max-w-2xl ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'
              } leading-relaxed mb-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] font-medium px-4 transition-colors duration-300`}>
                From repairs to renovations, cleaning to painting - we've got you covered. Professional services, guaranteed quality, and 24/7 customer support with a 100% satisfaction guarantee.
              </p>

              {/* Trust Indicators - Single Line Design */}
              

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4 z-20 w-full">
                <button 
                  onClick={() => window.location.href = 'https://booking.d0lt.com'} 
                  className="w-full md:w-[20vw] bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-10 py-4 h-auto rounded-full text-lg shadow-[0_8px_30px_rgb(255,193,7,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_35px_rgb(255,193,7,0.45)] border-b-4 border-orange-600 border-2 border-white/30"
                >
                  Get Started
                </button>
                <button 
                  onClick={scrollToServices} 
                  className="w-full md:w-[20vw] bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-10 py-4 h-auto rounded-full text-lg shadow-[0_8px_30px_rgb(255,193,7,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_35px_rgb(255,193,7,0.45)] border-b-4 border-orange-600 border-2 border-white/30"
                >
                  Book a Service
                </button>
                
              </div>
              <div className={`w-full max-w-2xl mb-8 py-3 px-5 rounded-full flex items-center justify-between flex-wrap gap-2 ${theme === 'dark' ? 'bg-gradient-to-r from-zinc-900/70 to-zinc-800/70' : 'bg-gradient-to-r from-white/70 to-amber-50/70'} backdrop-blur-md shadow-lg border ${theme === 'dark' ? 'border-amber-500/20' : 'border-amber-500/30'}`}>
                <div className="flex items-center">
                  <div className="flex -space-x-1">
                    {['#ffb700', '#fa8128', '#f25a5a', '#a259ff'].map((color, i) => (
                      <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white dark:border-zinc-800" style={{backgroundColor: color, transform: `translateX(-${i * 4}px)`}}></div>
                    ))}
                  </div>
                  <span className={`text-xs sm:text-sm font-medium ml-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>20K+ users</span>
                </div>
                
                <div className="hidden sm:block h-4 mx-2 border-r border-zinc-300/30 dark:border-zinc-700/30"></div>
                
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
                  <span className={`inline-flex items-center ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                    Verified
                  </span>
                  <span className={`inline-flex items-center ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>
                    <span className="mr-1">★</span>4.9
                  </span>
                  <span className={`inline-flex items-center ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    <span className="mr-1">🛡️</span>Insured
                  </span>
                  <span className={`inline-flex items-center ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'} bg-opacity-30 px-2 py-1 text-xs rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'}`}>
                    100% Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Image Section */}
      <div 
        ref={imageSectionRef}
        className="relative h-screen w-full bg-transparent"
      >
        <div 
          className={`absolute inset-0 overflow-hidden transition-all duration-1000 ease-in-out ${
            isScrolled ? 'scale-100' : 'scale-75'
          }`}
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Modern Home Interior"
            className="w-full h-full object-cover"
          />
          <div 
            className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/50' : 'bg-black/30'} flex items-center justify-center transition-opacity duration-1000 ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="text-center text-white max-w-4xl px-8">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Professional Home Services
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className={`${theme === 'dark' ? 'bg-zinc-900/50' : 'bg-zinc-800/60'} p-4 rounded-lg backdrop-blur-sm ${
                  theme === 'dark' ? 'hover:bg-zinc-900/70' : 'hover:bg-zinc-800/80'
                } transition-all duration-300`}>
                  <h3 className="text-xl font-semibold mb-2 text-white">Repairs</h3>
                  <p className="text-sm text-zinc-400">Plumbing, Electrical, HVAC</p>
                </div>
                <div className={`${theme === 'dark' ? 'bg-zinc-900/50' : 'bg-zinc-800/60'} p-4 rounded-lg backdrop-blur-sm ${
                  theme === 'dark' ? 'hover:bg-zinc-900/70' : 'hover:bg-zinc-800/80'
                } transition-all duration-300`}>
                  <h3 className="text-xl font-semibold mb-2 text-white">Cleaning</h3>
                  <p className="text-sm text-zinc-400">Deep Cleaning, Regular Maintenance</p>
                </div>
                <div className={`${theme === 'dark' ? 'bg-zinc-900/50' : 'bg-zinc-800/60'} p-4 rounded-lg backdrop-blur-sm ${
                  theme === 'dark' ? 'hover:bg-zinc-900/70' : 'hover:bg-zinc-800/80'
                } transition-all duration-300`}>
                  <h3 className="text-xl font-semibold mb-2 text-white">Painting</h3>
                  <p className="text-sm text-zinc-400">Interior, Exterior, Decorative</p>
                </div>
                <div className={`${theme === 'dark' ? 'bg-zinc-900/50' : 'bg-zinc-800/60'} p-4 rounded-lg backdrop-blur-sm ${
                  theme === 'dark' ? 'hover:bg-zinc-900/70' : 'hover:bg-zinc-800/80'
                } transition-all duration-300`}>
                  <h3 className="text-xl font-semibold mb-2 text-white">Renovation</h3>
                  <p className="text-sm text-zinc-400">Home Improvement, Remodeling</p>
                </div>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>

      {/* Service Choose component */}
      <div ref={serviceChooseRef} className="w-full z-10">
        <ServiceChoose />
      </div>
    </div>
  );
};
