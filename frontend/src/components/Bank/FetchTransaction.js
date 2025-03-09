import React, { useState, useEffect} from 'react';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const isDateEarlier = (inputDate, compareDate) => {
  return new Date(inputDate) < new Date(compareDate);
};

const isWithinOneYear = (inputDate, compareDate) => {
  const input = new Date(inputDate);
  const existing = new Date(compareDate);
  const oneYearInMillis = 365 * 24 * 60 * 60 * 1000;
  return (existing - input) <= oneYearInMillis;
};

const FetchTransaction = ({ isOpen, onClose, selectedOption, handleOptionChange, fromDate, handleDateChange, bankName, accountNumber, onFetchTransactions, existingFromDate, existingToDate }) => {
  const [isValidDate, setIsValidDate] = useState(true);
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    if (selectedOption === 'old' && fromDate) {
      const earlierCheck = isDateEarlier(fromDate, existingFromDate);
      const withinOneYearCheck = isWithinOneYear(fromDate, existingFromDate);

      if (!earlierCheck) {
        setIsValidDate(false);
        setDateError(`Ngày bắt đầu phải sớm hơn \n ngày ${formatDate(existingFromDate)}`);
      } else if (!withinOneYearCheck) {
        setIsValidDate(false);
        setDateError(`Khoảng cách giữa ngày bắt đầu \n và ngày ${formatDate(existingFromDate)} không quá 1 năm.`);
      } else {
        setIsValidDate(true);
        setDateError('');
      }
    } else {
      setIsValidDate(true);
      setDateError('');
    }
  }, [fromDate, selectedOption, existingFromDate]);

  if (!isOpen) return null;

  const formattedFromDate = existingFromDate !== 'N/A' ? formatDate(existingFromDate) : existingFromDate;
  const formattedToDate = existingToDate !== 'N/A' ? formatDate(existingToDate) : existingToDate;

  const isUpdateButtonDisabled = selectedOption === 'old' && (!fromDate || !isValidDate);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 font-be-vietnam-pro">
      <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg relative z-10 max-w-md mx-auto">
        <h2 className="text-xl mb-4">Cập nhật giao dịch</h2>
        <div className="mb-4">
          <p><strong>Ngân hàng:</strong> {bankName.toUpperCase()}</p>
          <p><strong>Số tài khoản:</strong> {accountNumber}</p>
          <p><strong>Thời gian giao dịch hiện tại đang có:</strong></p>
          <p className='text-green-600'><strong>{formattedFromDate}</strong> - <strong>{formattedToDate}</strong></p>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            <input
              type="radio"
              value="new"
              checked={selectedOption === 'new'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Các giao dịch mới nhất
          </label>
          <label className="block mb-2">
            <input
              type="radio"
              value="old"
              checked={selectedOption === 'old'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Các giao dịch cũ
          </label>
        </div>
        {selectedOption === 'old' && (
          <div className="mb-4">
            <label className="block mb-2">
              Từ ngày:
              <input
                type="date"
                name="fromDate"
                value={fromDate}
                onChange={handleDateChange}
                className="border p-1 rounded w-full"
              />
              {!isValidDate && (
                <p className="text-red-500 text-sm mt-1 break-words whitespace-pre-line font-be-vietnam-pro">
                  {dateError}
                </p>
              )}
            </label>
          </div>
        )}
        <div className="flex justify-end space-x-4">
        <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded">
            Hủy
          </button>
          <button onClick={onFetchTransactions} className={`bg-green-600 text-white p-2 rounded ${isUpdateButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isUpdateButtonDisabled}>
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default FetchTransaction;
