import { Card } from "@/components/ui/card";
import Carousel from "./Carousel";
import { useTheme } from "@/context/ThemeContext";

const testimonials = [
  {
    title: "20% Business Growth",
    button: "Learn More",
    src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    backgroundColor: "#FF5733", // Red
  },
  {
    title: "Improved Efficiency",
    button: "Discover",
    src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    backgroundColor: "#33FF57", // Green
  },
  {
    title: "Enhanced Collaboration",
    button: "Explore",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    backgroundColor: "#3357FF", // Blue
  },
  {
    title: "Customer Satisfaction",
    button: "Join Now",
    src: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
    <section className={theme === 'dark' ? 'bg-black' : 'bg-gray-50'}>
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className={`text-3xl sm:text-4xl md:text-7xl font-bold ml-0 sm:ml-8 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-red-500">
                Offer Quick
              </span>
              <br />
              and Effective
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-red-500 underline">
                Maintenance
              </span>
            </h2>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-zinc-300 max-w-xl">
              See how top companies have grown and improved with our platform. Explore real results and join the leaders in business transformation.
            </p>
          </div>
          <div className="relative flex flex-col items-center">
            <div className="w-full flex flex-col items-center">
              <div className="w-full max-w-[370px] sm:max-w-[420px] md:max-w-[480px] mx-auto relative">
                <Carousel slides={testimonials} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 sm:mt-20">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-red-500">
            Trusted by Industry Leaders
          </h3>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-10 items-center">
            {companyLogos.map((company, index) => (
              <div 
                key={index}
                className={`relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-100 dark:bg-gray-800 transition-colors duration-200`}
              >
                <span className={`text-xs sm:text-sm font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};