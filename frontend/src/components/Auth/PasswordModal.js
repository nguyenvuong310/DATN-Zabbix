import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const PasswordModal = ({ isOpen, onClose, onSubmit, hasPassword }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setOldPassword('');
      setPassword('');
      setConfirmPassword('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    if (hasPassword && !oldPassword) {
      alert('Vui lòng nhập lại mật khẩu cũ của bạn!');
      return;
    }
    onSubmit({ oldPassword, password });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center font-be-vietnam-pro z-50">
      <div className="bg-white p-5 rounded-lg w-1/3">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl">Thay đổi mật khẩu</h2>
          <button onClick={onClose}>
            <FaTimes className="w-5 h-5 text-black" />
          </button>
        </div>
        {hasPassword && (
          <div className="mt-4">
            <label className="block text-sm">Mật khẩu cũ</label>
            <input
              type="password"
              className="w-full p-2 border-4 rounded mt-2"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
        )}
        <div className="mt-4">
          <label className="block text-sm">Mật khẩu mới</label>
          <input
            type="password"
            className="w-full p-2 border-4 rounded mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm">Nhập lại mật khẩu mới</label>
          <input
            type="password"
            className="w-full p-2 border-4 rounded mt-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Hủy
          </button>
          <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
