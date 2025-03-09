//BankCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { LuRefreshCw } from "react-icons/lu";

const BankCard = ({ bankAccount, openModal }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/transaction/${bankAccount.id}`, { state: { bankAccount } });
  };

  const handleUpdateClick = (event) => {
    event.stopPropagation();
    openModal(bankAccount.bankName, bankAccount.accountNumber, bankAccount.id); // Pass bankName and accountNumber
  };

  const formatCurrency = (num) => {
    return num.toLocaleString("vi-VN") + " VND";
  };

  return (
    <div
      className="transition-transform duration-300 p-4 flex-shrink-0 hover:scale-105 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="bg-gray-800 text-white rounded-lg p-4">
        <div className="h-40 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
          <img
            src={bankAccount.bankLogo}
            alt={bankAccount.bankName}
            className="h-1/2"
          />
        </div>
        <div className="flex justify-between items-center max-sm:flex-col z-10">
          <h3 className="text-lg font-semibold break-words font-be-vietnam-pro">
            {bankAccount.bankName.toUpperCase()}
          </h3>

            <button
              className="flex space-x-2 justify-between items-center rounded-xl bg-green-600 px-5 sm:py-1 max-sm:py-3"
              onClick={handleUpdateClick}
            >
              <div className="text-white">
                <LuRefreshCw size={15} />
              </div>
              <div className="text-sm font-semibold">Cập nhật giao dịch</div>
            </button>

        </div>
        <p className="text-lg font-be-vietnam-pro">
          Tên tài khoản: {bankAccount.accountName}
        </p>
        <p
          className="text-lg font-be-vietnam-pro truncate"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Số tài khoản: {bankAccount.accountNumber}
        </p>
        <p
          className="text-lg font-be-vietnam-pro truncate"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Số dư: {formatCurrency(bankAccount.balance)}
        </p>
      </div>
    </div>
  );
};

export default BankCard;
