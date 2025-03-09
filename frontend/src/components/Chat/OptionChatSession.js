import React, { useContext, useState } from "react";
import {
  removeChatSession,
  updateChatSession,
} from "../../services/chatService"; // Add renameChatSession service
import { toast } from "react-toastify";
import { ContextApp } from "../../utils/Context";

const OptionChatSession = ({ onClose, openOptionsId }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const { setChatSessionId, setMessage, fetchChatSessionsByUserId } =
    useContext(ContextApp);

  const handleActionClick = (action) => {
    console.log(openOptionsId);
    if (!openOptionsId) {
      return;
    }
    if (action === "Share" || action === "Archive") {
      alert("Tính năng này đang được phát triển");
    } else if (action === "Delete") {
      setIsConfirmModalOpen(true);
    } else if (action === "Rename") {
      setIsRenameModalOpen(true);
    }
    // onClose();
  };

  const handleRenameConfirm = async () => {
    try {
      await updateChatSession(openOptionsId, { title: newName }); // Call rename service
      toast.success("Đã đổi tên phiên chat thành công!");
      fetchChatSessionsByUserId();
    } catch (error) {
      console.log(error);
    } finally {
      setIsRenameModalOpen(false);
      onClose();
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await removeChatSession(openOptionsId);
      toast.success("Đã xóa phiên chat thành công!");
      setChatSessionId(0);
      setMessage([]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsConfirmModalOpen(false);
      onClose();
    }
  };

  const handleDeleteCancel = () => {
    setIsConfirmModalOpen(false);
    onClose();
  };

  const handleRenameCancel = () => {
    setIsRenameModalOpen(false);
    onClose();
  };

  return (
    <div className="option-chat">
      <div className="absolute border border-white shadow-2xl right-8 z-50 bg-white rounded-lg overflow-visible">
        <div className="flex flex-col bg-slate-800 shadow-lg rounded-lg">
          <button
            className="p-2 hover:bg-gray-500 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              handleActionClick("Rename");
            }}
          >
            Rename
          </button>
          <button
            className="p-2 hover:bg-gray-500 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              handleActionClick("Share");
            }}
          >
            Share
          </button>

          <button
            className="p-2 hover:bg-gray-500 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              handleActionClick("Archive");
            }}
          >
            Archive
          </button>
          <button
            className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              handleActionClick("Delete");
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg absolute left-10">
            <h2 className="text-lg font-bold mb-4">Xác nhận xóa</h2>
            <p>
              Bạn chắc chắn muốn xóa <br /> vĩnh viễn phiên chat này?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2"
                onClick={handleDeleteConfirm}
              >
                Xác nhận
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                onClick={handleDeleteCancel}
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      )}

      {isRenameModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg absolute left-10">
            <h2 className="text-lg font-bold mb-4">Đổi tên phiên chat</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Nhập tên mới"
            />
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
                onClick={handleRenameConfirm}
              >
                Xác nhận
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                onClick={handleRenameCancel}
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionChatSession;
