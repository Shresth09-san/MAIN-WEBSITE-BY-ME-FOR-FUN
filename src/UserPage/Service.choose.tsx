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
import { useTheme } from "@/context/ThemeContext";

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
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isScrollingPaused, setIsScrollingPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<gsap.core.Tween | null>(null);
  const { theme } = useTheme();

  /**
   * Redirects the user to the booking platform
   * Handles loading state and error handling
   */
  const redirectToPrebooking = () => {
    if (isRedirecting) return; // Prevent multiple clicks
    
    setIsRedirecting(true);
    try {
      // Track the redirection attempt
      toast.loading("Redirecting to booking site...", { id: "redirect-toast" });
      
      // Add a small delay to allow toast to show before redirect
      setTimeout(() => {
        window.location.href = 'https://booking.d0lt.com';
        toast.dismiss("redirect-toast");
      }, 300);
    } catch (error) {
      setIsRedirecting(false);
      console.error('Redirection error:', error);
      toast.error("Failed to redirect. Please try again or visit booking.d0lt.com directly.");
    }
  };

  // Add manual scrolling functionality
  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; // Increased scroll amount for larger cards
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const newScrollLeft = direction === 'left' 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Check if we're on mobile
  const isMobileView = () => {
    return window.innerWidth < 768;
  };

  // Optimized drag scrolling implementation
  const enableDragScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || isMobileView()) return;
    
    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    
    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      
      // Pause any auto-scroll animation
      pauseScrollAnimation();
    };
    
    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      container.style.cursor = 'grab';
      
      // Resume animation if applicable
      resumeScrollAnimation();
    };
    
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      container.scrollLeft = scrollLeft - walk;
    };
    
    // Add and remove event listeners properly to prevent memory leaks
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mouseleave', onMouseUp);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    
    // Return cleanup function
    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mouseleave', onMouseUp);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
    };
  };

  /**
   * Maps service names to their categories for efficient filtering
   * @returns Record mapping service names to category strings
   */
  const serviceToCategory = useMemo<Record<string, string>>(() => {
    const mapping: Record<string, string> = {};
    allServices.forEach(service => {
      if (service?.name && service?.category) {
        mapping[service.name] = service.category;
      }
    });
    return mapping;
  }, []);

  /**
   * Retrieves subservices for a given service name
   * @param serviceName The name of the service to look up
   * @returns Array of subservice strings
   */
  const getSubservicesForService = (serviceName: string): string[] => {
    if (!serviceName) return [];
    const service = allServices.find(s => s.name === serviceName);
    return service?.subServices || [];
  };

  /**
   * Pauses the GSAP animation when called
   */
  const pauseScrollAnimation = () => {
    if (scrollAnimationRef.current) {
      scrollAnimationRef.current.pause();
      setIsScrollingPaused(true);
    }
  };

  /**
   * Resumes the GSAP animation if not in search mode
   */
  const resumeScrollAnimation = () => {
    // Only resume if we have an animation and we're in the default view
    if (
      scrollAnimationRef.current && 
      selectedCategory === "All" && 
      searchQuery === ""
    ) {
      // Resume the animation
      scrollAnimationRef.current.play();
      setIsScrollingPaused(false);
    }
  };

  /**
   * Starts or restarts the GSAP scrolling animation
   */
  const startScrollAnimation = () => {
    if (!scrollRef.current || !scrollContainerRef.current) return;
    
    // Kill any existing animation
    if (scrollAnimationRef.current) {
      scrollAnimationRef.current.kill();
      scrollAnimationRef.current = null;
    }
    
    // Don't animate if we're searching or filtering
    if (searchQuery !== "" || selectedCategory !== "All") {
      return;
    }
    
    try {
      const totalWidth = scrollRef.current.scrollWidth;
      const visibleWidth = scrollContainerRef.current.offsetWidth;
      
      if (totalWidth > visibleWidth) {
        const newAnimation = gsap.fromTo(
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
        
        scrollAnimationRef.current = newAnimation;
      }
    } catch (error) {
      console.error("Error starting scroll animation:", error);
    }
  };

  const handleSearchChange = (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    
    // Kill any active GSAP animations
    if (scrollAnimationRef.current) {
      scrollAnimationRef.current.kill();
      scrollAnimationRef.current = null;
    }
    
    if (scrollRef.current) {
      gsap.killTweensOf(scrollRef.current);
      // Reset scroll position
      gsap.set(scrollRef.current, { x: 0 });
    }
    
    setTimeout(() => {
      setIsLoading(false);
      
      // Only restart animation if search is cleared and category is All
      if (query === "" && selectedCategory === "All") {
        startScrollAnimation();
      }
    }, 300);
  };

  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    
    // Kill any active GSAP animations
    if (scrollAnimationRef.current) {
      scrollAnimationRef.current.kill();
      scrollAnimationRef.current = null;
    }
    
    if (scrollRef.current) {
      gsap.killTweensOf(scrollRef.current);
      // Reset scroll position
      gsap.set(scrollRef.current, { x: 0 });
    }
    
    setTimeout(() => {
      setIsLoading(false);
      
      // Only restart animation if category is All and search is empty
      if (category === "All" && searchQuery === "") {
        startScrollAnimation();
      }
    }, 300);
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
    // Enable drag scrolling when component mounts
    const cleanupDragScroll = enableDragScroll();

    if (!scrollRef.current || !scrollContainerRef.current) return;
    
    const cleanup = () => {
      if (scrollAnimationRef.current) {
        scrollAnimationRef.current.kill();
        scrollAnimationRef.current = null;
      }
      
      if (scrollRef.current) {
        gsap.killTweensOf(scrollRef.current);
      }
    };
    
    try {
      // Clear any existing animations
      cleanup();
      
      // Remove any existing clones
      const existingClones = scrollRef.current.querySelectorAll('.clone-item');
      existingClones.forEach(clone => clone.remove());
      
      // Only add clones and start animation if we're in the default view
      if (selectedCategory === "All" && searchQuery === "" && filteredServices.length > 3) {
        const originalItems = Array.from(scrollRef.current.children);
        const itemCount = originalItems.length;
        
        // Only clone if we don't have many items
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
        
        // Start the animation
        startScrollAnimation();
      } else {
        // Reset scroll position if not animating
        gsap.set(scrollRef.current, { x: 0 });
      }
    } catch (error) {
      console.error("Error in scroll animation setup:", error);
      if (scrollRef.current) {
        gsap.set(scrollRef.current, { x: 0 });
      }
    }
    
    return () => {
      // Clean up drag scroll
      if (cleanupDragScroll) cleanupDragScroll();
      
      cleanup();
    };
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
    <div className={
      theme === 'dark' 
        ? "min-h-screen bg-zinc-900 text-white flex flex-col overflow-hidden relative"
        : "min-h-screen bg-gray-100 text-zinc-900 flex flex-col overflow-hidden relative"
    }>
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? "bg-gradient-to-b from-black via-zinc-900 to-black opacity-90" 
          : "bg-gradient-to-b from-white via-gray-100 to-white opacity-80"
      }`}></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl animate-pulse ${
          theme === 'dark'
            ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10"
            : "bg-gradient-to-r from-amber-500/5 to-orange-500/5"
        }`}></div>
        <div className={`absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl animate-pulse ${
          theme === 'dark'
            ? "bg-gradient-to-r from-orange-500/10 to-amber-500/10"
            : "bg-gradient-to-r from-orange-500/5 to-amber-500/5"
        }`}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex-grow flex flex-col relative z-10 py-4 md:py-8">
        <div className={`${
          theme === 'dark'
            ? "bg-black/40 backdrop-blur-xl border-zinc-800/50"
            : "bg-white/60 backdrop-blur-xl border-gray-200/70"
        } rounded-3xl shadow-2xl overflow-hidden flex flex-col flex-grow border`}>
          {/* Header with search and filters */}
          <div className="p-4 sm:p-6">
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 ${
              theme === 'dark' ? "text-white" : "text-gray-900"
            }`}>
              {selectedCategory === "All" ? (
                <>Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Service</span></>
              ) : (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">{selectedCategory}</span> Services
                </>
              )}
            </h1>
            <p className={`text-center text-sm mb-4 sm:mb-6 ${
              theme === 'dark' ? "text-zinc-400" : "text-gray-600"
            }`}>
              {selectedCategory === "All" 
                ? "Select from our wide range of professional services" 
                : `Browse our professional ${selectedCategory.toLowerCase()} services`}
            </p>
            
            <div className="max-w-3xl mx-auto">
              <div className={`${
                theme === 'dark'
                  ? "bg-black/50 backdrop-blur-sm border-zinc-800/50"
                  : "bg-white/80 backdrop-blur-sm border-gray-200"
              } p-3 sm:p-4 rounded-2xl border shadow-lg`}>
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    theme === 'dark' ? "text-zinc-400" : "text-gray-400"
                  }`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search services..."
                    className={`w-full rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all ${
                      theme === 'dark'
                        ? "bg-zinc-900/50 border-zinc-800 text-white placeholder-zinc-500"
                        : "bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500"
                    }`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => handleSearchChange("")}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-amber-500 transition-colors ${
                        theme === 'dark' ? "text-zinc-400" : "text-gray-400"
                      }`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                <div className="flex mt-3 sm:mt-4 relative overflow-x-auto hide-scrollbar pb-2">
                  <button 
                    onClick={() => handleCategoryChange("All")}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex-shrink-0 ${
                      selectedCategory === "All" 
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg" 
                        : theme === 'dark'
                          ? "bg-zinc-900/50 text-white hover:bg-zinc-800/50 border border-zinc-800"
                          : "bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-200"
                    }`}
                  >
                    All Services
                  </button>
                  
                  <div className="overflow-x-auto flex gap-1 sm:gap-2 ml-1 sm:ml-2 hide-scrollbar">
                    {serviceCategories.map(category => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                          selectedCategory === category 
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg" 
                            : theme === 'dark'
                              ? "bg-zinc-900/50 text-white hover:bg-zinc-800/50 border border-zinc-800"
                              : "bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-200"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-2 sm:mt-3 text-center">
                  <span className={`text-xs ${theme === 'dark' ? "text-zinc-400" : "text-gray-500"}`}>
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 border-2 border-amber-500 rounded-full animate-spin"></div>
                        Filtering services...
                      </span>
                    ) : (
                      <>Found <span className={`font-semibold ${theme === 'dark' ? "text-white" : "text-gray-900"}`}>{filteredServices.length}</span> service{filteredServices.length !== 1 ? 's' : ''}</>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Services display area */}
          <div className="p-4 sm:p-6 flex-grow overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="w-8 h-8 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {filteredServices.length > 0 ? (
                  <div className="relative w-full">
                    {/* Only show manual scroll buttons on desktop */}
                    <div className="hidden md:block">
                      <button 
                        onClick={() => handleManualScroll('left')}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full ${
                          theme === 'dark' 
                            ? "bg-black/60 text-white hover:bg-black/80" 
                            : "bg-white/60 text-black hover:bg-white/80"
                        } shadow-lg transition-all`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                      
                      <button 
                        onClick={() => handleManualScroll('right')}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full ${
                          theme === 'dark' 
                            ? "bg-black/60 text-white hover:bg-black/80" 
                            : "bg-white/60 text-black hover:bg-white/80"
                        } shadow-lg transition-all`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>
                    
                    {/* Desktop horizontal scroll view */}
                    <div 
                      ref={scrollContainerRef}
                      className="w-full md:overflow-x-auto hide-scrollbar px-2 cursor-grab hidden md:block"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      <div 
                        ref={scrollRef}
                        className="flex flex-nowrap gap-6 py-4 px-2"
                        style={{ willChange: 'transform' }}
                      >
                        {/* Render services horizontally for desktop */}
                        {filteredServices.map((service, index) => renderServiceCard(service, index))}
                      </div>
                    </div>
                    
                    {/* Mobile grid view */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                      {filteredServices.map((service, index) => renderServiceCard(service, index, true))}
                    </div>
                  </div>
                ) : (
                  <div className={`${
                    theme === 'dark'
                      ? "bg-black/40 backdrop-blur-sm border-zinc-800/50"
                      : "bg-white/70 backdrop-blur-sm border-gray-200"
                  } p-6 sm:p-8 rounded-2xl text-center border`}>
                    <div className={`text-lg sm:text-xl font-medium mb-2 ${
                      theme === 'dark' ? "text-white" : "text-gray-900"
                    }`}>No matching services found</div>
                    <p className={`text-xs sm:text-sm mb-4 sm:mb-6 ${
                      theme === 'dark' ? "text-zinc-400" : "text-gray-600"
                    }`}>Try adjusting your search or category filters</p>
                    <div className="flex gap-2 justify-center">
                      <Button 
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black py-2 sm:py-2.5 h-auto text-xs sm:text-sm rounded-xl"
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

  // Helper function to render service cards consistently
  function renderServiceCard(service: Service, index: number, isMobile: boolean = false) {
    const serviceCategory = serviceToCategory[service.name] || "Other";
    const isMatchedCategory = selectedCategory !== "All" && serviceCategory === selectedCategory;
    
    return (
      <div
        key={`${service.id || service.name}-${index}`}
        className={`${
          theme === 'dark'
            ? "bg-black/40 backdrop-blur-sm"
            : "bg-white/70 backdrop-blur-sm"
        } rounded-2xl shadow-lg hover:shadow-xl transition-all border
          flex flex-col ${isMobile ? 'w-full h-full min-h-[360px]' : 'w-[320px] h-[380px]'} flex-shrink-0 group
          ${isMatchedCategory ? 
            "border-amber-500/50 ring-2 ring-amber-500/20" 
            : theme === 'dark' 
              ? "border-zinc-800/50"
              : "border-gray-200"
          }`}
        style={{
          transform: isMatchedCategory ? "translateY(-5px)" : "none"
        }}
        onMouseEnter={!isMobile ? pauseScrollAnimation : undefined}
        onMouseLeave={!isMobile ? resumeScrollAnimation : undefined}
      >
        <div className="p-4 sm:p-6 flex flex-col h-full justify-between">
          {/* Content Section - Fixed Height */}
          <div className="flex flex-col items-center w-full min-h-[200px] sm:min-h-[220px]">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
              {(() => {
                const IconComponent = getIconComponent(service.name);
                return <IconComponent size={isMobile ? 24 : 28} className="text-white" />;
              })()}
            </div>
            <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-center group-hover:text-amber-500 transition-colors line-clamp-2 ${
              theme === 'dark' ? "text-white" : "text-gray-900"
            }`}>
              {searchQuery ? highlightMatch(service.name, searchQuery) : service.name}
            </h3>
            <p className={`text-center text-xs sm:text-sm mb-3 sm:mb-5 line-clamp-3 w-full ${
              theme === 'dark' ? "text-zinc-300" : "text-gray-600"
            }`}>
              {searchQuery && service.description
                ? highlightMatch(service.description, searchQuery)
                : (service.description || "Professional service available on demand")}
            </p>
            <span className={`px-3 py-1 rounded-full text-xs sm:text-sm
              ${isMatchedCategory 
                ? "bg-amber-500/20 text-amber-500 font-medium" 
                : theme === 'dark'
                  ? "bg-zinc-800/50 text-zinc-300"
                  : "bg-gray-200/70 text-gray-600"
              }`}>
              {serviceCategory}
            </span>
          </div>
          
          {/* Button Section - Always at Bottom */}
          <div className="w-full mt-auto pt-3 sm:pt-4 flex-shrink-0">
            <Button 
              className={`w-full font-medium rounded-xl 
              shadow-md hover:shadow-lg transition-all py-2.5 sm:py-3 h-auto text-sm sm:text-base
              ${isMatchedCategory 
                ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black" 
                : theme === 'dark'
                  ? "bg-zinc-900/50 hover:bg-zinc-800/50 text-white border border-zinc-800"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-900 border border-gray-300"
              }`}
              onClick={redirectToPrebooking}
            >
              {getSubservicesForService(service.name).length === 0 ? 'Request Service' : 'Select Options'}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

// Add these styles to help with scrolling categories and custom scrollbar
const styles = document.createElement('style');
styles.innerHTML = `
.hide-scrollbar::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
@media (max-width: 768px) {
  .flex-wrap {
    justify-content: center;
  }
}`;
document.head.appendChild(styles);

export default ServiceChoose;
