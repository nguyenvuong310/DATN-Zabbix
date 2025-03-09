// src/components/CardSlider/CardSlider.js
import React, { useRef, useState, useEffect } from "react";
import "../../App.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa"; // Import the plus icon

const CardSlider = ({ bankAccounts }) => {
  const formatCurrency = (num) => {
    return num.toLocaleString("vi-VN") + " VND";
  };

  const sliderRef = useRef(null);
  const cardRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  const scrollToIndex = (index) => {
    if (cardRefs.current[index]) {
      cardRefs.current[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const scrollRight = () => {
    if (currentIndex < bankAccounts.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col h-fit justify-center items-center w-full py-2 mx-auto">
      {bankAccounts.length === 0 || !isAuthenticated ? (
        <button
          onClick={() => navigate("/bank")}
          className="px-6 py-3 my-10 flex flex-row justify-center items-center bg-green-600 text-white rounded-full font-be-vietnam-pro"
        >
          <FaPlus className="mr-2" /> {/* Add the plus icon */}
          Liên kết ngân hàng
        </button>
      ) : (
        <div className="relative w-full overflow-hidden">
          <div
            ref={sliderRef}
            className="flex space-x-4 overflow-x-hidden py-5"
          >
            <div className="flex-shrink-0 w-[35%]" aria-hidden="true" />{" "}
            {/* Spacer */}
            {bankAccounts.map((account, index) => (
              <div
                key={account.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`w-[35%] max-sm:w-[70%] transition-transform duration-300 p-4 flex-shrink-0 ${
                  index === currentIndex ? "scale-110" : "scale-90"
                }`}
                style={{
                  transformOrigin: "center center",
                  transition: "transform 0.3s",
                }}
              >
                <div className="bg-gray-800 text-white rounded-lg p-4">
                  <div className="h-40 bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center rounded-lg mb-4">
                    <img
                      src={account.bankLogo}
                      alt={`${account.bankName} logo`}
                      className="h-1/2"
                    />{" "}
                    {/* Display the logo */}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 break-words font-be-vietnam-pro">
                    {account.bankName.toUpperCase()}
                  </h3>
                  <p
                    className="text-sm font-be-vietnam-pro truncate"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Tên: {account.accountName}
                  </p>
                  <p
                    className="text-sm font-be-vietnam-pro truncate"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Số tài khoản: {account.accountNumber}
                  </p>
                  <p
                    className="text-sm font-be-vietnam-pro truncate"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Số dư: {formatCurrency(account.balance)}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex-shrink-0 w-[35%]" aria-hidden="true" />{" "}
            {/* Spacer */}
          </div>
          <div className="absolute inset-y-0 left-0 flex items-center justify-center">
            <button
              onClick={scrollLeft}
              className="flex justify-center items-center bg-white text-black text-2xl w-12 h-12 font-bold rounded-full"
              disabled={currentIndex === 0}
            >
              <FaArrowLeft></FaArrowLeft>
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center justify-center">
            <button
              onClick={scrollRight}
              className="flex justify-center items-center bg-white text-black text-2xl w-12 h-12 font-bold rounded-full"
              disabled={currentIndex === bankAccounts.length - 1}
            >
              <FaArrowRight></FaArrowRight>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardSlider;
