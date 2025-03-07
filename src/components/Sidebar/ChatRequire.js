// src/components/Banks/Banks.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'; // Import the plus icon

const ChatRequire = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const bankAccounts = useSelector((state) => state.banks.bankAccounts);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <div className='flex flex-1 justify-center items-center text-white text-2xl font-be-vietnam-pro'>Hãy đăng nhập để có thể sử dụng BankGPT.</div>;
  }

  return (
    <div className='flex flex-1 justify-center items-center text-white text-2xl font-be-vietnam-pro'>
      {bankAccounts.length === 0 && (
        <div className='flex flex-1 flex-col justify-center items-center text-white text-2xl font-be-vietnam-pro'>
          Vui lòng liên kết ít nhất 1 ngân hàng để sử dụng BankGPT.
          <button onClick={() => navigate('/bank')} className="px-6 py-3 my-10 flex flex-row justify-center items-center bg-green-600 text-lg text-white rounded-full font-be-vietnam-pro">
              <FaPlus className='mr-2' /> {/* Add the plus icon */} 
              Liên kết ngân hàng

          </button>
        </div>)
      }
    </div>
  );
};

export default ChatRequire;
