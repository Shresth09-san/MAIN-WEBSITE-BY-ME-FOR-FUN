import React, { useState, useEffect } from 'react';

const ComingSoon: React.FC = () => {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  // Set launch date to 30 days from now
  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;
      
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
      
      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const [email, setEmail] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the email submission
    console.log('Email submitted:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-gray-800 opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 left-1/2 w-32 h-32 rounded-full bg-gray-800 opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-gray-800 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 rounded-full bg-gray-800 opacity-20 animate-pulse"></div>
      </div>
      
      {/* Main content container */}
      <div className="z-10 max-w-4xl w-full bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-xl p-6 md:p-12 text-center border border-gray-800 shadow-2xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500">
          Coming Soon
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl mb-8">
          We're working hard to bring you something amazing. Stay tuned!
        </p>
        
        {/* Countdown timer */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="bg-gray-800 w-20 h-24 md:w-24 md:h-28 rounded-lg flex flex-col items-center justify-center border border-gray-700">
            <span className="text-gray-200 text-2xl md:text-4xl font-bold">{days}</span>
            <span className="text-gray-400 text-sm">Days</span>
          </div>
          <div className="bg-gray-800 w-20 h-24 md:w-24 md:h-28 rounded-lg flex flex-col items-center justify-center border border-gray-700">
            <span className="text-gray-200 text-2xl md:text-4xl font-bold">{hours}</span>
            <span className="text-gray-400 text-sm">Hours</span>
          </div>
          <div className="bg-gray-800 w-20 h-24 md:w-24 md:h-28 rounded-lg flex flex-col items-center justify-center border border-gray-700">
            <span className="text-gray-200 text-2xl md:text-4xl font-bold">{minutes}</span>
            <span className="text-gray-400 text-sm">Minutes</span>
          </div>
          <div className="bg-gray-800 w-20 h-24 md:w-24 md:h-28 rounded-lg flex flex-col items-center justify-center border border-gray-700">
            <span className="text-gray-200 text-2xl md:text-4xl font-bold">{seconds}</span>
            <span className="text-gray-400 text-sm">Seconds</span>
          </div>
        </div>
        
        {/* Newsletter signup */}
        <div className="max-w-md mx-auto">
          <h3 className="text-gray-300 text-xl mb-4">Get notified when we launch</h3>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow p-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="py-3 px-6 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-200 font-bold transition-all duration-300 border border-gray-700"
            >
              Notify Me
            </button>
          </form>
        </div>
        
        {/* Social media links */}
        <div className="mt-12 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="z-10 mt-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} D0LT. All rights reserved.
      </footer>
    </div>
  );
};

export default ComingSoon;
