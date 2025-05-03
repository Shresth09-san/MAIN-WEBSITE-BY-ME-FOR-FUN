import React, { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { allServices, serviceCategories } from '@/data/allServices';
import { services } from '@/data/services';
import SearchBar from "@/components/Navbar/SearchBar";
import gsap from "gsap";
import Cookies from 'js-cookie';
import { toast } from "react-hot-toast"; 
import { 
  Wrench, Plug, Hammer, Shield, 
  Home, Brush, Cog, Car, Smartphone, Calendar,
  Shirt, Settings, Lock, Search, X
} from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Define Service type
interface Service {
  id?: string;
  name: string;
  description?: string;
  category?: string;
  subServices?: string[];
}

// Map service names to Lucide icons
const iconMap = {
  "CLEANING SERVICE": Home,
  "PLUMBING SERVICES": Wrench,
  "ELECTRICAL SERVICES": Plug,
  "CARPENTRY SERVICES": Hammer,
  "HOME APPLIANCE REPAIR": Wrench,
  "PAINTING SERVICES": Brush,
  "PEST CONTROL": Cog,
  "GARDENING & LANDSCAPING": Home,
  "HOME RENOVATION SERVICES": Settings,
  "AC & HVAC SERVICES": Cog,
  "HANDYMAN SERVICES": Wrench,
  "HOME SECURITY SERVICES": Lock,
  "MOVING & RELOCATION": Car,
  "LAUNDRY SERVICES": Shirt,
  "VEHICLE SERVICES": Car,
  "SMART HOME SERVICES": Smartphone,
  "IT & TECHNICAL SUPPORT": Settings,
  "EVENT SUPPORT SERVICES": Calendar,
  "SPECIALIZED SERVICES": Settings,
  "WELLNESS & LIFESTYLE": Shield
};

// Helper function to get the appropriate icon component
const getIconComponent = (serviceName: string) => {
  return iconMap[serviceName.toUpperCase() as keyof typeof iconMap] || Settings;
};

export const ServiceChoose = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = async () => {
    const token = Cookies.get('token');
    
    try {
      const response = await axios.post(
        `${API_URL}/api/getusers/login`,
        {},
        { 
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.status === 200;
    } catch (error) {
      console.error('Authentication check failed:', error);
      return false;
    }
  };

  const redirectToPrebooking = async () => {
    if (!await isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    window.location.href = 'https://booking.d0lt.com';
  };

  // Map service names to categories for robust filtering
  const serviceToCategory = useMemo(() => {
    const mapping: Record<string, string> = {};
    allServices.forEach(service => {
      if (service.name && service.category) {
        mapping[service.name] = service.category;
      }
    });
    return mapping;
  }, []);

  const getSubservicesForService = (serviceName: string) => {
    const service = allServices.find(s => s.name === serviceName);
    return service?.subServices || [];
  };

  const handleSearchChange = (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    if (scrollRef.current) {
      gsap.set(scrollRef.current, { x: 0 });
    }
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    if (scrollRef.current) {
      gsap.set(scrollRef.current, { x: 0 });
    }
    setTimeout(() => setIsLoading(false), 300);
  };

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const serviceCategory = serviceToCategory[service.name] || "Other";
      const matchesCategory = selectedCategory === "All" || serviceCategory === selectedCategory;
      if (!searchQuery) return matchesCategory;
      const searchLower = searchQuery.toLowerCase().trim();
      const nameMatch = service.name.toLowerCase().includes(searchLower);
      const descMatch = service.description && service.description.toLowerCase().includes(searchLower);
      const categoryMatch = serviceCategory.toLowerCase().includes(searchLower);
      return matchesCategory && (nameMatch || descMatch || categoryMatch);
    });
  }, [selectedCategory, searchQuery, serviceToCategory]);

  useEffect(() => {
    if (!scrollRef.current || !scrollContainerRef.current) return;
    
    const cleanup = () => {
      if (scrollRef.current) {
        gsap.killTweensOf(scrollRef.current);
      }
    };
    
    try {
      gsap.killTweensOf(scrollRef.current);
      
      const existingClones = scrollRef.current.querySelectorAll('.clone-item');
      existingClones.forEach(clone => clone.remove());
      
      if (selectedCategory === "All" && searchQuery === "" && filteredServices.length > 3) {
        const originalItems = Array.from(scrollRef.current.children);
        const itemCount = originalItems.length;
        
        if (itemCount < 10 && itemCount > 0) {
          originalItems.forEach(item => {
            const clone = (item as HTMLElement).cloneNode(true) as HTMLElement;
            clone.classList.add('clone-item');
            
            const button = clone.querySelector('button');
            if (button) {
              button.onclick = redirectToPrebooking;
            }
            
            scrollRef.current?.appendChild(clone);
          });
        }
        
        const totalWidth = scrollRef.current.scrollWidth;
        const visibleWidth = scrollContainerRef.current.offsetWidth;
        
        if (totalWidth > visibleWidth) {
          gsap.fromTo(
            scrollRef.current,
            { x: 0 },
            { 
              x: `-${Math.min(totalWidth / 2, 2000)}px`,
              duration: Math.min(totalWidth / 80, 30),
              ease: "linear",
              repeat: -1,
              repeatRefresh: true,
              onRepeat: () => {
                if (scrollRef.current) {
                  gsap.set(scrollRef.current, { x: "0" });
                }
              }
            }
          );
        }
      } else {
        gsap.set(scrollRef.current, { x: 0 });
      }
    } catch (error) {
      console.error("Error in scroll animation:", error);
      if (scrollRef.current) {
        gsap.set(scrollRef.current, { x: 0 });
      }
    }
    
    return cleanup;
  }, [filteredServices.length, selectedCategory, searchQuery]);

  const highlightMatch = (text: string, query: string) => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="bg-yellow-200 text-yellow-800">{part}</span> : 
        part
    );
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col overflow-hidden relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black opacity-90"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl flex-grow flex flex-col relative z-10">
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col flex-grow border border-zinc-800/50">
          {/* Header with search and filters */}
          <div className="p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Service</span>
            </h1>
            <p className="text-zinc-400 text-center text-sm mb-6">Select from our wide range of professional services</p>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-black/50 backdrop-blur-sm p-4 rounded-2xl border border-zinc-800/50 shadow-lg">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search services..."
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => handleSearchChange("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                <div className="flex mt-4 relative overflow-x-auto hide-scrollbar pb-2">
                  <button 
                    onClick={() => handleCategoryChange("All")}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex-shrink-0
                      ${selectedCategory === "All" 
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg" 
                        : "bg-zinc-900/50 text-white hover:bg-zinc-800/50 border border-zinc-800"}`}
                  >
                    All Services
                  </button>
                  
                  <div className="overflow-x-auto flex gap-2 ml-2 hide-scrollbar">
                    {serviceCategories.map(category => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0
                          ${selectedCategory === category 
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg" 
                            : "bg-zinc-900/50 text-white hover:bg-zinc-800/50 border border-zinc-800"}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-3 text-center">
                  <span className="text-zinc-400 text-xs">
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 border-2 border-amber-500 rounded-full animate-spin"></div>
                        Filtering services...
                      </span>
                    ) : (
                      <>Found <span className="font-semibold text-white">{filteredServices.length}</span> service{filteredServices.length !== 1 ? 's' : ''}</>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Services display area */}
          <div className="p-6 flex-grow overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="w-8 h-8 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {filteredServices.length > 0 ? (
                  <div 
                    ref={scrollContainerRef}
                    className="relative w-full overflow-hidden"
                    style={{ 
                      maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                      WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                    }}
                  >
                    <div 
                      ref={scrollRef}
                      className="flex gap-6 py-4"
                      style={{ willChange: 'transform' }}
                    >
                      {filteredServices.map((service, index) => {
                        const serviceCategory = serviceToCategory[service.name] || "Other";
                        const isMatchedCategory = selectedCategory !== "All" && serviceCategory === selectedCategory;
                        
                        return (
                          <div
                            key={`${service.id || service.name}-${index}`}
                            className={`bg-black/40 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all border
                              flex flex-col w-[280px] h-[320px] flex-shrink-0 group
                              ${isMatchedCategory ? 
                                "border-amber-500/50 ring-2 ring-amber-500/20" : "border-zinc-800/50"}`}
                            style={{
                              transform: isMatchedCategory ? "translateY(-5px)" : "none"
                            }}
                          >
                            <div className="p-6 flex flex-col items-center justify-between h-full">
                              <div className="flex flex-col items-center w-full">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
                                  {(() => {
                                    const IconComponent = getIconComponent(service.name);
                                    return <IconComponent size={28} className="text-white" />;
                                  })()}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2 text-center group-hover:text-amber-500 transition-colors">
                                  {searchQuery ? highlightMatch(service.name, searchQuery) : service.name}
                                </h3>
                                <p className="text-zinc-400 text-center text-sm mb-4 line-clamp-2 w-full">
                                  {searchQuery && service.description
                                    ? highlightMatch(service.description, searchQuery)
                                    : (service.description || "Professional service available on demand")}
                                </p>
                                <span className={`px-3 py-1 rounded-full text-xs mb-4
                                  ${isMatchedCategory ?
                                    "bg-amber-500/20 text-amber-500 font-medium" : "bg-zinc-800/50 text-zinc-400"}`}>
                                  {serviceCategory}
                                </span>
                              </div>
                              
                              <Button 
                                className={`w-full font-medium rounded-xl 
                                shadow-md hover:shadow-lg transition-all mt-auto py-2.5 h-auto text-sm
                                ${isMatchedCategory ? 
                                  "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black" : 
                                  "bg-zinc-900/50 hover:bg-zinc-800/50 text-white border border-zinc-800"}`}
                                onClick={redirectToPrebooking}
                              >
                                {getSubservicesForService(service.name).length === 0 ? 'Request Service' : 'Select Options'}
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl text-center border border-zinc-800/50">
                    <div className="text-white text-xl font-medium mb-2">No matching services found</div>
                    <p className="text-zinc-400 text-sm mb-6">Try adjusting your search or category filters</p>
                    <div className="flex gap-2 justify-center">
                      <Button 
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black py-2.5 h-auto text-sm rounded-xl"
                        onClick={() => {
                          handleCategoryChange("All");
                          setSearchQuery("");
                        }}
                      >
                        Reset All Filters
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Add these styles to help with scrolling categories
const styles = document.createElement('style');
styles.innerHTML = `
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}`;
document.head.appendChild(styles);

export default ServiceChoose;
