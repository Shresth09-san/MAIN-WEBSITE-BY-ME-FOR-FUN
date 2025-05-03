import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-full transition-colors duration-300",
        theme === 'dark' 
          ? "bg-white/20 hover:bg-white/30" 
          : "bg-black/20 hover:bg-black/30",
        className
      )}
      aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === 'dark' ? (
        <FaSun className="text-yellow-300 text-xl" />
      ) : (
        <FaMoon className="text-slate-800 text-xl" />
      )}
    </button>
  );
}
