import React, { useState, useRef, useEffect } from "react";

const TransactionCard = ({
  transaction,
  onCategoryClick,
  disableCategory,
  setSelectedTransaction,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formatCurrency = (num) => {
    return num.toLocaleString("vi-VN") + " VND";
  };

  const handleClickCategory = (e) => {
    e.stopPropagation();
    setSelectedTransaction(transaction);
    onCategoryClick(transaction);
  };

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded]);

  return (
    <div
      className="bg-gray-800 text-white rounded-xl p-4 cursor-pointer font-be-vietnam-pro space-y-2"
      onClick={toggleExpand}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-400">
            {formatDate(transaction.datetime)}
          </p>
          <p className={`text-lg mt-2 ${isExpanded ? "" : "truncate"}`}>
            {transaction.description}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <p
            className={`text-lg ${
              transaction.amount > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {formatCurrency(transaction.amount)}
          </p>
          <div className={disableCategory ? "pointer-events-none" : ""}>
            {!transaction.category && !transaction.userCategory ? (
              <div
                onClick={handleClickCategory}
                className="border bg-slate-100 font-semibold min-w-28 text-sm rounded-xl mt-1"
              >
                <p className="px-2 text-orange-700">Chưa phân loại</p>
              </div>
            ) : (
              <div
                onClick={handleClickCategory}
                className="border bg-slate-100 font-semibold min-w-28 text-sm rounded-xl mt-1"
              >
                <p className="px-2 py-1 text-cyan-700 text-center">
                  {transaction.userCategory || transaction.category}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[200px]" : "max-h-0"
        }`}
        style={{ maxHeight: isExpanded ? `${contentHeight}px` : "0" }}
      >
        <div className="space-y-2">
          <p>
            Số dư sau giao dịch:{" "}
            <span className="font-semibold">
              {formatCurrency(transaction.runningBalance)}
            </span>
          </p>
          <p>
            Số tài khoản:{" "}
            <span className="font-semibold">{transaction.accountNumber}</span>
          </p>
          <p>
            Số tham chiếu:{" "}
            <span className="font-semibold">{transaction.reference}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
