import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onFilterChange?: (category: string) => void;
  onSearchChange?: (query: string) => void;
  value?: string;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({
  onFilterChange,
  onSearchChange,
  value = '',
  placeholder = 'Search for services...',
  className = '',
}: SearchBarProps) => {
  const [localValue, setLocalValue] = useState(value);

  // Keep local state in sync with parent component's state
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onSearchChange?.(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Additional submit logic if needed
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative w-full max-w-3xl mx-auto ${className}`}
    >
      <div className="relative">
        <input
          type="text"
          value={localValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-white/30 bg-white/20 
                   text-white placeholder-white/70 focus:outline-none focus:border-white/50
                   backdrop-blur-sm transition-all"
          style={{ caretColor: 'white' }}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
        
        {localValue && (
          <button
            type="button"
            onClick={() => {
              setLocalValue('');
              onSearchChange?.('');
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 
                     text-white/70 hover:text-white transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
