import { Button } from "@/components/ui/button";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export const GetApp = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`h-[40vh] w-full overflow-hidden ${
      isDark
        ? "bg-black "
        : "bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 h-full flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Left Content - Text */}
          <div className={isDark ? "text-amber-100" : "text-orange-900"}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-transparent bg-clip-text">
              GET STARTED WITH DOIT! TODAY
            </h2>
            <p className={`text-sm sm:text-base md:text-lg mb-2 max-w-xl ${
              isDark ? "text-amber-200" : "text-orange-700"
            }`}>
              Download the app now and simplify your home maintenance with just a few taps!
            </p>
          </div>

          {/* Right Content - Download Buttons */}
          <div className="flex flex-col sm:flex-row justify-start md:justify-end items-center gap-4">
            <Button
              variant="outline"
              className={`h-14 sm:h-16 w-48 sm:w-52 px-5 py-3 border-2 ${
                isDark
                  ? "border-amber-700 bg-zinc-900 text-amber-100 hover:bg-zinc-800"
                  : "border-orange-300 bg-white text-orange-900 hover:bg-orange-50"
              } shadow transition-all duration-200 rounded-lg flex items-center`}
              onClick={() => window.open('https://play.google.com/store', '_blank')}
            >
              <FaGooglePlay size={24} className="mr-3 text-amber-500" />
              <div className="text-left">
                <div className={`text-xs font-semibold mb-1 ${
                  isDark ? "text-amber-300" : "text-orange-500"
                }`}>GET IT ON</div>
                <div className="text-lg font-bold">Google Play</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className={`h-14 sm:h-16 w-48 sm:w-52 px-5 py-3 border-2 ${
                isDark
                  ? "border-amber-700 bg-zinc-900 text-amber-100 hover:bg-zinc-800"
                  : "border-orange-300 bg-white text-orange-900 hover:bg-orange-50"
              } shadow transition-all duration-200 rounded-lg flex items-center`}
              onClick={() => window.open('https://www.apple.com/app-store/', '_blank')}
            >
              <FaApple size={28} className="mr-3 text-amber-500" />
              <div className="text-left">
                <div className={`text-xs font-semibold mb-1 ${
                  isDark ? "text-amber-300" : "text-orange-500"
                }`}>Download on the</div>
                <div className="text-lg font-bold">App Store</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetApp;