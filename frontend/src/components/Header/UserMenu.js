import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfilePic from '../../assets/w17.png';
import { doLogout } from '../../redux/action/userAction';

const UserOptionButton = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserInfor = () => {
    navigate('/userInfor');
    setIsDropdownVisible(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isPolicyShown'); // Clear the flag on logout
    dispatch(doLogout());
    navigate('/login');
  };

  const toggleSearchExpand = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

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

  if (!isAuthenticated) {
    return (
      <button onClick={handleLogout} className="flex px-5 items-center justify-center rounded-xl bg-gray-700 text-white text-lg font-be-vietnam-pro font-semibold">
        Đăng Nhập
      </button>
    );
  }

  return (
    <div className="relative flex max-sm:hidden items-center space-x-2" ref={dropdownRef}>
      <div className="transition-all duration-300 flex h-full items-center bg-gray-800 text-white rounded-full pl-4 pr-4 cursor-pointer">
        <div className="flex items-center space-x-2">
          <div
            className="cursor-pointer bg-gray-800 text-white rounded-full p-2 flex items-center"
            onClick={toggleSearchExpand}
          >
            <FaSearch className="text-xl" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className={`search-input bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none ${isSearchExpanded ? 'w-48 opacity-100' : 'w-0 opacity-0'}`}
          />
        </div>
        <div className='flex flex-row items-center' onClick={toggleDropdown}>
          <div className="w-8 h-8 mx-2">
            <img src={account?.avatar || ProfilePic} alt="Profile" className="rounded-full w-full h-full" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold font-be-vietnam-pro">{account?.name || 'User Name'}</span>
            {/* <span className="text-sm text-gray-400">@malvi34</span> */}
          </div>
          <FaChevronDown className="ml-2" />
        </div>
        
      </div>
      <div
        className={`absolute top-full right-0 w-48 bg-gray-800 rounded-md shadow-lg py-2 mt-2 dropdown-menu ${
          isDropdownVisible ? 'dropdown-enter-active' : 'dropdown-leave-active'
        }`}
      >
        {isDropdownVisible && (
          <>
            <button onClick={handleUserInfor} className="w-full text-white text-left font-be-vietnam-pro font-bold px-4 py-2 hover:bg-gray-200 hover:text-black">Tài khoản của tôi</button>
            <button onClick={handleLogout} className="w-full text-white text-left font-be-vietnam-pro font-bold px-4 py-2 hover:bg-gray-200 hover:text-black">Đăng xuất</button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserOptionButton;
