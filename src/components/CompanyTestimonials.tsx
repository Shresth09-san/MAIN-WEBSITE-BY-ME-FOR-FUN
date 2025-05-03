import { Card } from "@/components/ui/card";
import Carousel from "./Carousel";
import { useTheme } from "@/context/ThemeContext";

const testimonials = [
  {
    title: "20% Business Growth",
    button: "Learn More",
    src: "",
    backgroundColor: "#FF5733", // Red
  },
  {
    title: "Improved Efficiency",
    button: "Discover",
    src: "",
    backgroundColor: "#33FF57", // Green
  },
  {
    title: "Enhanced Collaboration",
    button: "Explore",
    src: "",
    backgroundColor: "#3357FF", // Blue
  },
  {
    title: "Customer Satisfaction",
    button: "Join Now",
    src: "",
    backgroundColor: "#F3FF33", // Yellow
  },
];

const companyLogos = [
  { name: "Discord", logo: "discord" },
  { name: "NCR", logo: "ncr" },
  { name: "Monday", logo: "monday" },
  { name: "TED", logo: "ted" },
  { name: "Dropbox", logo: "dropbox" },
  { name: "Omega Energy", logo: "omega" },
  { name: "Greenhouse", logo: "greenhouse" },
  { name: "Vice", logo: "vice" },
  { name: "IDEO", logo: "ideo" }
];

export const CompanyTestimonials = () => {
  const { theme } = useTheme();
  
  return (
    <section className={theme === 'dark' ? 'bg-black' : 'bg-gray-100'}>
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={`text-4xl md:text-7xl font-bold ml-8 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-red-500">
                Offer Quick
              </span>
              <br />
              and Effective
              <br />
              <span className="underline decoration-yellow-400 decoration-4">
                Maintenance
              </span>
            </h2>
          </div>
          
          <div className="relative">
            <div className={`rounded-lg p-6 shadow-lg overflow-hidden ${
              theme === 'dark' ? 'bg-zinc-900 text-white' : 'bg-white text-gray-900'
            }`}>
              <h3 className="text-2xl font-bold mb-6 text-center">
                The best companies Services on DOIT
              </h3>
              
              <div className="mx-auto max-w-3xl">
                <Carousel slides={testimonials} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-red-500">
            Trusted by Industry Leaders
          </h3>
          
          <div className="flex flex-wrap justify-center gap-10 items-center">
            {companyLogos.map((company, index) => (
              <div 
                key={index} 
                className="group relative cursor-pointer"
                style={{
                  animation: `pulse-${index % 3} 3s infinite ${index * 0.3}s ease-in-out`
                }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-red-500 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                <div className={`relative px-4 py-2 rounded-lg transform transition-all duration-300 group-hover:scale-110 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                }`}>
                  <span className={`text-sm group-hover:text-yellow-300 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{company.name}</span>
                </div>
              </div>
            ))}
          </div>
          
          <style>{`
            @keyframes pulse-0 {
              0%, 100% { opacity: 0.5; transform: translateY(0); }
              50% { opacity: 0.9; transform: translateY(-5px); }
            }
            @keyframes pulse-1 {
              0%, 100% { opacity: 0.5; transform: translateY(0); }
              50% { opacity: 0.8; transform: translateY(-3px); }
            }
            @keyframes pulse-2 {
              0%, 100% { opacity: 0.5; transform: scale(1); }
              50% { opacity: 0.9; transform: scale(1.05); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};