import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const FilterModal = ({ isOpen, onClose, onApply }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [transactionType, setTransactionType] = useState('both');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      resetFields();
    }
  }, [isOpen]);

  const resetFields = () => {
    setStartDate('');
    setEndDate('');
    setMinAmount('');
    setMaxAmount('');
    setTransactionType('both');
    setErrors({});
  };

  const validateFields = (fields) => {
    const errors = {};

    if (fields.startDate && fields.endDate && new Date(fields.startDate) > new Date(fields.endDate)) {
      errors.startDate = 'Ngày bắt đầu phải trước ngày kết thúc';
      errors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
    }

    const minAmountValue = parseAmount(fields.minAmount);
    const maxAmountValue = parseAmount(fields.maxAmount);

    if (minAmountValue && maxAmountValue && parseInt(minAmountValue, 10) > parseInt(maxAmountValue, 10)) {
      errors.minAmount = 'Số tiền tối thiểu phải nhỏ hơn số tiền tối đa';
      errors.maxAmount = 'Số tiền tối đa phải lớn hơn số tiền tối thiểu';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleApply = () => {
    if (validateFields({ startDate, endDate, minAmount, maxAmount })) {
      // Use parseAmount to remove any formatting before passing values
      const parsedMinAmount = parseAmount(minAmount);
      const parsedMaxAmount = parseAmount(maxAmount);
      
      onApply({
        startDate,
        endDate,
        minAmount: parsedMinAmount,
        maxAmount: parsedMaxAmount,
        transactionType
      });
      onClose(); // Ensure this function is correctly closing the modal
    }
  };
  

  const formatAmount = (value) => {
    const number = value.replace(/[^\d]/g, ''); // Remove non-digit characters
    if (number === '') return '';
    return parseInt(number, 10).toLocaleString('vi-VN');
  };

  const parseAmount = (value) => {
    return value.replace(/[^\d]/g, ''); // Remove non-digit characters
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    validateFields({ startDate: value, endDate, minAmount, maxAmount });
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
    validateFields({ startDate, endDate: value, minAmount, maxAmount });
  };

  const handleMinAmountChange = (e) => {
    const value = e.target.value;
    setMinAmount(formatAmount(value));
    validateFields({ startDate, endDate, minAmount: formatAmount(value), maxAmount });
  };

  const handleMaxAmountChange = (e) => {
    const value = e.target.value;
    setMaxAmount(formatAmount(value));
    validateFields({ startDate, endDate, minAmount, maxAmount: formatAmount(value) });
  };

  if (!isOpen) {
    return null; // Ensure modal is not rendered when closed
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center font-be-vietnam-pro z-50">
      <div className="bg-white p-5 rounded-lg sm:w-1/3 max-sm:w-3/4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl">Lọc giao dịch</h2>
          <button onClick={onClose}>
            <FaTimes className="w-5 h-5 text-black" />
          </button>
        </div>
        <div className="mt-4">
          <label className="block text-sm">Ngày bắt đầu</label>
          <input
            type="date"
            className={`w-full p-2 border-4 rounded mt-2 ${errors.startDate ? 'border-red-600' : ''}`}
            value={startDate}
            onChange={handleStartDateChange}
          />
          {errors.startDate && <p className="text-red-600 text-sm">{errors.startDate}</p>}
        </div>
        <div className="mt-4">
          <label className="block text-sm">Ngày kết thúc</label>
          <input
            type="date"
            className={`w-full p-2 border-4 rounded mt-2 ${errors.endDate ? 'border-red-600' : ''}`}
            value={endDate}
            onChange={handleEndDateChange}
          />
          {errors.endDate && <p className="text-red-600 text-sm">{errors.endDate}</p>}
        </div>
        <div className="mt-4">
          <label className="block text-sm">Số tiền tối thiểu</label>
          <input
            type="text"
            className={`w-full p-2 border-4 rounded mt-2 ${errors.minAmount ? 'border-red-600' : ''}`}
            value={minAmount}
            inputMode="numeric"
            placeholder='0 VND'
            onChange={handleMinAmountChange}
          />
          {errors.minAmount && <p className="text-red-600 text-sm">{errors.minAmount}</p>}
        </div>
        <div className="mt-4">
          <label className="block text-sm">Số tiền tối đa</label>
          <input
            type="text"
            className={`w-full p-2 border-4 rounded mt-2 ${errors.maxAmount ? 'border-red-600' : ''}`}
            value={maxAmount}
            inputMode="numeric"
            placeholder='5.000.000 VND'
            onChange={handleMaxAmountChange}
          />
          {errors.maxAmount && <p className="text-red-600 text-sm">{errors.maxAmount}</p>}
        </div>
        <div className="mt-4">
          <label className="block text-sm">Loại giao dịch</label>
          <select
            className="w-full p-2 border-4 rounded mt-2"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="both">Tất cả</option>
            <option value="income">Tiền vào</option>
            <option value="expense">Tiền ra</option>
          </select>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={resetFields} className="bg-red-600 text-white px-4 py-2 rounded">
            Đặt lại
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Hủy
          </button>
          <button
            onClick={handleApply}
            className={`px-4 py-2 rounded text-white ${Object.keys(errors).length > 0 ? 'bg-green-500 opacity-50 cursor-not-allowed' : 'bg-green-500 cursor-pointer'}`}
            disabled={Object.keys(errors).length > 0}
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
