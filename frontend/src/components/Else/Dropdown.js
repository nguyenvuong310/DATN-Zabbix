// Dropdown.js
import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Dropdown = ({ options, selectedOption, onSelect }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 font-be-vietnam-pro rounded bg-gray-500 text-gray-200 flex items-center space-x-2"
      >
        <span>{selectedOption.label}</span>
        <FaChevronDown />
      </button>
      <div
        className={`absolute top-full left-0 w-48 bg-gray-800 rounded-md shadow-lg py-2 mt-2 dropdown-menu ${
          isDropdownVisible ? 'dropdown-enter-active' : 'dropdown-leave-active'
        }`}
      >
        {isDropdownVisible && (
          options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                setIsDropdownVisible(false);
              }}
              className="w-full text-white text-left font-be-vietnam-pro font-bold px-4 py-2 hover:bg-green-600 hover:text-white"
            >
              {option.label}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Dropdown;
