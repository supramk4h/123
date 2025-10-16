
import React, { useState, useEffect, useRef } from 'react';

interface AutoCompleteInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
}

export const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({ label, value, onChange, suggestions }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    const filtered = suggestions.filter(
      suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    onChange(userInput);
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };
  
  const onClick = (suggestion: string) => {
    onChange(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        onChange={handleChange}
        value={value}
        onFocus={() => setShowSuggestions(true)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        required
      />
      {showSuggestions && value && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => onClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-secondary hover:text-white"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
