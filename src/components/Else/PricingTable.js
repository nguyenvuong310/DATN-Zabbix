import React from "react";
import { FaTimes } from "react-icons/fa";
import FREE from "../../assets/free.png";
import PRO from "../../assets/pro.png";
import PREMIUM from "../../assets/premium.png";
import CIRCLE from "../../assets/circle.png";

const PricingTable = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 font-be-vietnam-pro">
    <div className="relative bg-gray-700 p-7 rounded-lg sm:w-3/4 max-sm:w-[90%] sm:h-[90%] max-sm:h-3/4 flex flex-col items-center">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white text-2xl"
      >
        <FaTimes />
      </button>
      <h2 className="text-white text-3xl mb-6">Bảng giá</h2>
      <div className="flex max-sm:flex-col max-sm:overflow-y-auto w-full sm:py-10 sm:h-full sm:justify-center max-sm:justify-start items-stretch sm:space-x-10 max-sm:space-y-2">
        <div className="flex flex-col items-center scale-90 sm:w-1/4 max-sm:w-full">
          <img src={FREE} alt="Free Plan" className="w-full h-auto" />
          <div className="flex flex-col flex-grow bg-white p-6 rounded-b-2xl sm:h-full w-full">
            <div className="space-y-3">
              <p className="text-3xl font-semibold">Free</p>
              <ul className="list-disc pl-6">
                <li>Liên kết 1 ngân hàng</li>
                <li>Chat tối đa 5 câu / ngày</li>
              </ul>
            </div>
            <div className="mt-auto flex justify-between">
              <p className="font-semibold">0$/năm</p>
              <img src={CIRCLE} alt="Circle" sizes="1/2" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center sm:scale-110 max-sm:scale-90 sm:w-1/4 max-sm:w-full">
          <img src={PREMIUM} alt="Premium Plan" className="w-full h-auto" />
          <div className="flex flex-col flex-grow bg-white p-6 rounded-b-2xl sm:h-full w-full">
            <div className="space-y-5">
              <p className="text-3xl font-semibold">Premium</p>
              <ul className="list-disc pl-6">
                <li>Liên kết tất cả ngân hàng</li>
                <li>Botchat không giới hạn</li>
              </ul>
            </div>
            <div className="mt-auto flex justify-between">
              <p className="font-semibold">200$/năm</p>
              <img src={CIRCLE} alt="Circle" sizes="1/2" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center scale-90 sm:w-1/4 max-sm:w-full">
          <img src={PRO} alt="Pro Plan" className="w-full h-auto" />
          <div className="flex flex-col flex-grow bg-white p-6 rounded-b-2xl sm:h-full w-full">
            <div className="space-y-3">
              <p className="text-3xl font-semibold">Pro</p>
              <ul className="list-disc pl-6">
                <li>Liên kết 3 ngân hàng</li>
                <li>BankGPT 1.0 & 3.5 không giới hạn</li>
                <li>BankGPT 4.0: 10 lượt / ngày</li>
              </ul>
            </div>
            <div className="mt-auto flex justify-between">
              <p className="font-semibold">125$/năm</p>
              <img src={CIRCLE} alt="Circle" sizes="1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PricingTable;
