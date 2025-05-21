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
        
        {/* Enhanced background patterns */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {theme === 'dark' ? (
            <>
              {/* Dark theme patterns */}
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
              <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full filter blur-3xl"></div>
            </>
          ) : (
            <>
              {/* Light theme patterns */}
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
              <div className="absolute -top-20 -left-20 w-96 h-96 bg-amber-500/20 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-500/20 rounded-full filter blur-3xl"></div>
              <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-500/20 rounded-full filter blur-3xl"></div>
            </>
          )}
        </div>

        <section className="h-full flex flex-col items-center justify-center relative">
          <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
            <div className={`max-w-5xl flex flex-col items-center justify-center z-10 pt-6 backdrop-blur-sm p-6 rounded-3xl 
              ${theme === 'dark' 
                ? 'bg-gradient-to-br from-zinc-900/60 to-zinc-800/60 border border-zinc-700/30 shadow-[0_8px_32px_rgba(251,191,36,0.25),0_4px_20px_rgba(255,179,0,0.15)]' 
                : 'bg-gradient-to-br from-white/60 to-amber-50/60 border border-white/50 shadow-[0_10px_40px_rgba(251,191,36,0.2),0_6px_25px_rgba(252,211,77,0.15)]'
              } transition-colors duration-300`}>
              <h1 className="text-xl md:text-4xl lg:text-5xl font-extrabold text-center tracking-tight space-x-2 md:space-x-3 lg:space-x-4 m-4">
                <span className={`block ${theme === 'dark' ? 'text-white' : 'text-zinc-900'} text-shadow-md`}>
                  Premium Quality Services
                </span>
                <span className="text-amber-500 text-shadow-md">
                  Excellence in Every Detail
                </span>
              </h1>

              <p className={`text-sm md:text-lg text-center max-w-2xl ${
                theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'
              } leading-relaxed mb-5 text-shadow-sm font-medium px-4 transition-colors duration-300`}>
                Professional services delivered with excellence. Our expert team handles everything you need with precision, reliability, and guaranteed satisfaction for all your service needs.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4 z-20 w-full">
                <button 
                  onClick={() => window.location.href = 'https://booking.d0lt.com'} 
                  className="w-full md:w-[20vw] bg-gradient-to-br from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold px-10 py-3 h-auto rounded-full text-md shadow-[0_8px_30px_rgb(255,153,0,0.4),0_0_10px_rgba(255,179,0,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_35px_rgb(255,153,0,0.5),0_0_15px_rgba(255,179,0,0.3)] border-[3px] border-amber-500/40 hover:border-amber-400/60"
                >
                  Book Now
                </button>
                <button 
                  onClick={scrollToServices} 
                  className="w-full md:w-[20vw] bg-gradient-to-br from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold px-10 py-3 h-auto rounded-full text-md shadow-[0_8px_30px_rgb(255,153,0,0.4),0_0_10px_rgba(255,179,0,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_35px_rgb(255,153,0,0.5),0_0_15px_rgba(255,179,0,0.3)] border-[3px] border-amber-500/40 hover:border-amber-400/60"
                >
                  Our Services
                </button>
              </div>
              <div className={`w-full max-w-2xl mb-6 py-2 px-4 rounded-full flex items-center justify-between flex-wrap gap-2 
                ${theme === 'dark' 
                  ? 'bg-gradient-to-r from-zinc-900/70 to-zinc-800/70 border-amber-500/20' 
                  : 'bg-gradient-to-r from-white/70 to-amber-50/70 border-amber-500/30'
                } 
                backdrop-blur-md border
                ${theme === 'dark'
                  ? 'shadow-[0_8px_25px_rgba(251,191,36,0.15),0_4px_10px_rgba(255,179,0,0.1)]'
                  : 'shadow-[0_10px_25px_rgba(251,191,36,0.2),0_4px_15px_rgba(252,211,77,0.25)]'
                }
                transition-all duration-300 hover:shadow-[0_12px_30px_rgba(251,191,36,0.25),0_6px_20px_rgba(255,179,0,0.15)]`}>
                <div className="flex items-center">
                  <div className="flex -space-x-1">
                    {['#ffb700', '#fa8128', '#f25a5a', '#a259ff'].map((color, i) => (
                      <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white dark:border-zinc-800" style={{backgroundColor: color, transform: `translateX(-${i * 4}px)`}}></div>
                    ))}
                  </div>
                  <span className={`text-xs sm:text-sm font-medium ml-2 ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'}`}>2,000+ happy homes</span>
                </div>
                
                <div className="hidden sm:block h-4 mx-2 border-r border-zinc-300/30 dark:border-zinc-700/30"></div>
                
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-1.5 xs:gap-2 sm:gap-3 md:gap-4 text-[10px] xs:text-xs sm:text-sm w-full">
                  {/* Stats items with proper responsive sizing */}
                  <span className={`inline-flex items-center ${theme === 'dark' ? 'text-green-300' : 'text-green-700'} font-medium px-1.5 py-0.5 rounded-full`}>
                    <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                    Licensed
                  </span>
                  <span className={`inline-flex items-center ${theme === 'dark' ? 'text-amber-300' : 'text-amber-700'} font-medium px-1.5 py-0.5 rounded-full`}>
                    <span className="mr-1">★</span>4.9
                  </span>
                  <span className={`inline-flex items-center ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'} font-medium px-1.5 py-0.5 rounded-full`}>
                    <span className="mr-1">🛡️</span>Insured
                  </span>
                  <span className={`inline-flex items-center ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'} bg-opacity-30 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] xs:text-xs rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'} font-medium`}>
                    100% Satisfaction
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
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-shadow-lg">
                Our Professional Services
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  {
                    title: "Painting",
                    description: "Interior, Exterior, Decorative",
                    icon: "🎨"
                  },
                  {
                    title: "Cleaning",
                    description: "Deep Clean, Regular, Move-out",
                    icon: "✨"
                  },
                  {
                    title: "Repairs",
                    description: "Plumbing, Electrical, General",
                    icon: "🔧"
                  },
                  {
                    title: "Renovation",
                    description: "Kitchen, Bath, Full Home",
                    icon: "🏠"
                  }
                ].map((service, index) => (
                  <div 
                    key={index}
                    className={`
                      ${theme === 'dark' ? 'bg-zinc-900/90' : 'bg-zinc-800/60'} 
                      p-5 rounded-xl backdrop-blur-sm border border-white/10
                      hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]
                      transition-all duration-300 transform hover:translate-y-[-8px]
                      cursor-pointer relative overflow-hidden group
                    `}
                  >
                    {/* Add hover highlight effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 
                      group-hover:from-amber-500/10 group-hover:via-amber-500/20 group-hover:to-amber-500/10
                      transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                    
                    <div className="text-2xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                    <h3 className="text-lg font-semibold mb-2 text-white text-shadow-sm group-hover:text-amber-300 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-zinc-100 leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>
                ))}
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
