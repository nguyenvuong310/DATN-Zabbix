// src/components/ConfirmationModal.js
import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30 font-be-vietnam-pro">
      <div className="bg-white max-sm:w-3/4 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Xác nhận xóa liên kết</h2>
        <p className="mb-4">Bạn có chắc chắn muốn xóa liên kết ngân hàng này?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
