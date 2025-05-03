import { useState, useEffect, memo } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import axios from "axios";
import Logo from "@/assests/logoR.png";
import { Link } from "react-router-dom";

const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { title: "Home", to: "hero", type: "home" },
    { title: "Services", to: "services", type: "scroll" },
    { title: "Enterprise", to: "/coming-soon", type: "comingSoon" },
    { title: "Blog", to: "/coming-soon", type: "comingSoon" },
    { title: "Support", to: "/coming-soon", type: "comingSoon" },
    { title: "Contact Us", to: "contact", type: "scroll" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderNavLink = (link, index, isMobile = false) => {
    const className = isMobile 
      ? "text-gray-700 hover:text-red-500 transition-colors w-full text-center py-2.5 text-sm font-medium border-b border-gray-100 last:border-0"
      : `relative px-2 py-1 font-medium text-sm cursor-pointer group ${
          scrolled ? 'text-gray-800 dark:text-gray-300' : 'text-white/90'
        }`;

    if (link.type === "home") {
      return isHomePage ? (
        <ScrollLink
          key={index}
          to="hero"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className={className}
          onClick={() => isMobile && setIsOpen(false)}
        >
          <span className="relative z-10">{link.title}</span>
          {!isMobile && (
            <>
              <span className="absolute inset-0 bg-red-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out z-0 opacity-0 group-hover:opacity-100"></span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </>
          )}
        </ScrollLink>
      ) : (
        <Link
          key={index}
          to="/"
          className={className}
          onClick={() => isMobile && setIsOpen(false)}
        >
          <span className="relative z-10">{link.title}</span>
          {!isMobile && (
            <>
              <span className="absolute inset-0 bg-red-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out z-0 opacity-0 group-hover:opacity-100"></span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </>
          )}
        </Link>
      );
    }
    
    if (link.type === "comingSoon") {
      return (
        <Link
          key={index}
          to={link.to}
          className={className}
          onClick={() => isMobile && setIsOpen(false)}
        >
          <span className="relative z-10">{link.title}</span>
          {!isMobile && (
            <>
              <span className="absolute inset-0 bg-red-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out z-0 opacity-0 group-hover:opacity-100"></span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </>
          )}
        </Link>
      );
    }
    
    return isHomePage ? (
      <ScrollLink
        key={index}
        to={link.to}
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        className={className}
        onClick={() => isMobile && setIsOpen(false)}
      >
        <span className="relative z-10">{link.title}</span>
        {!isMobile && (
          <>
            <span className="absolute inset-0 bg-red-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out z-0 opacity-0 group-hover:opacity-100"></span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </>
        )}
      </ScrollLink>
    ) : (
      <Link
        key={index}
        to="/"
        className={className}
        onClick={() => isMobile && setIsOpen(false)}
      >
        <span className="relative z-10">{link.title}</span>
        {!isMobile && (
          <>
            <span className="absolute inset-0 bg-red-100 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out z-0 opacity-0 group-hover:opacity-100"></span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </>
        )}
      </Link>
    );
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white dark:bg-gray-900 shadow-md py-2' : 'bg-transparent py-3 shadow-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-10">
          <Link to="/" className="flex items-center">
            <img className="h-10 w-auto" src={Logo} alt="logo" />
          </Link>

          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              {navLinks.map((link, index) => renderNavLink(link, index))}
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className={`p-1.5 rounded-full ${
                scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'
              } transition-colors`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <a
              href="https://prebooking.d0lt.com/login"
              className="relative overflow-hidden group"
            >
              <span className={`relative z-10 font-bold text-sm ${
                scrolled ? 'text-red-600 dark:text-red-400' : 'text-white'
              }`}>Log in</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>

            <a
              href="https://prebooking.d0lt.com/signup"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-red-700 font-medium px-5 py-2 text-sm rounded-full transition-all transform hover:-translate-y-0.5 hover:shadow-lg inline-block"
            >
              Join Us - It's Free
            </a>
          </div>
          
          <div className="lg:hidden flex items-center">
            <button 
              onClick={toggleTheme}
              className={`p-1.5 rounded-full mr-2 ${
                scrolled ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'
              } transition-colors`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              className={`p-1.5 rounded-md transition-colors ${
                scrolled ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 animate-fade-in flex flex-col space-y-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 rounded-b-lg shadow-lg">
            <div className="flex flex-col space-y-1 items-center pt-2">
              {navLinks.map((link, index) => renderNavLink(link, index, true))}
            </div>
            
            <div className="flex flex-col gap-3 px-6 pt-2 pb-4">
              <a
                href="https://prebooking.d0lt.com/login"
                className="bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 border border-red-500 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm py-2.5 font-medium text-center rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Log in
              </a>
  
              <a 
                href="https://prebooking.d0lt.com/signup"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-red-700 text-sm py-2.5 font-medium text-center rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Join Us - It's Free
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});

export default Navbar;
