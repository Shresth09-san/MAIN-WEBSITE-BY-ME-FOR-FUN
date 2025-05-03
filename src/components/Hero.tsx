import { ServiceChoose } from "@/UserPage/Service.choose";
import { useEffect, useRef, useState } from "react";

export const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const serviceChooseRef = useRef(null);
  const imageSectionRef = useRef(null);

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
        
        {/* Grid pattern overlay */}

        <section className="h-full flex flex-col items-center justify-center relative">
          <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
            <div className="max-w-5xl flex flex-col items-center justify-center z-10 pt-8 backdrop-blur-[2px] p-8 rounded-3xl bg-zinc-900/50">
              <h1 className="text-2xl md:text-5xl lg:text-7xl font-extrabold text-center tracking-tight space-x-2 md:space-x-3 lg:space-x-4 m-6">
                <span className="block text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                  Your One-Stop Solution
                </span>
                <span className="text-amber-500 drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                  For All Home Services
                </span>
              </h1>

              <p className="text-base md:text-xl text-center max-w-2xl text-zinc-400 leading-relaxed mb-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] font-medium px-4">
                From repairs to renovations, cleaning to painting - we've got you covered. Professional services, guaranteed quality, and 24/7 support.
              </p>

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
            className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-1000 ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="text-center text-white max-w-4xl px-8">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Professional Home Services
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-zinc-900/50 p-4 rounded-lg backdrop-blur-sm hover:bg-zinc-900/70 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-2 text-white">Repairs</h3>
                  <p className="text-sm text-zinc-400">Plumbing, Electrical, HVAC</p>
                </div>
                <div className="bg-zinc-900/50 p-4 rounded-lg backdrop-blur-sm hover:bg-zinc-900/70 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-2 text-white">Cleaning</h3>
                  <p className="text-sm text-zinc-400">Deep Cleaning, Regular Maintenance</p>
                </div>
                <div className="bg-zinc-900/50 p-4 rounded-lg backdrop-blur-sm hover:bg-zinc-900/70 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-2 text-white">Painting</h3>
                  <p className="text-sm text-zinc-400">Interior, Exterior, Decorative</p>
                </div>
                <div className="bg-zinc-900/50 p-4 rounded-lg backdrop-blur-sm hover:bg-zinc-900/70 transition-all duration-300">
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
