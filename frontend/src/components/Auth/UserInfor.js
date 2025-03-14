import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTotalChatSessions } from "../../services/chatService";
import { getTotalBalanceByUserId } from "../../services/bankService";
import AnimatedPage from "../../AnimatedPage";
import { FaEnvelope, FaComments, FaWallet, FaLock, FaEdit } from "react-icons/fa";
import PasswordModal from "./PasswordModal"; // Adjust the import path as needed
import PricingTable from "../Else/PricingTable"; // Adjust the import path as needed
import PrivacyPolicyModalViewOnly from "../Else/PrivacyPolicyViewOnly";

const UserInfor = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const isLoading = useSelector((state) => state.banks.loading);
  const navigate = useNavigate();

  const [totalChatSessions, setTotalChatSessions] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPricingTable, setShowPricingTable] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  const formatCurrency = (num) => {
    return num.toLocaleString("vi-VN") + " VND";
  };

  useEffect(() => {
    if (account?.id) {
      getTotalChatSessions(account.id)
        .then(setTotalChatSessions)
        .catch((error) => console.error("Error fetching total chat sessions:", error));

      getTotalBalanceByUserId(account.id)
        .then(setTotalBalance)
        .catch((error) => console.error("Error fetching total balance:", error));
    }
  }, [account?.id]);

  const passwordDisplay = account?.password ? "******" : "Bạn chưa cài đặt mật khẩu cho tài khoản này!";

  const handlePasswordChange = (passwordData) => {
    // Add your logic to handle password change here
    // console.log('Password Data:', passwordData);
  };

  if (!isAuthenticated) {
    return <div className='flex flex-1 justify-center items-center text-white text-2xl font-be-vietnam-pro'>Hãy đăng nhập để có thể xem thông tin tài khoản của bạn.</div>;
  }

  return (
    <>
      <div className="flex flex-1 max-sm:flex-col sm:py-20 h-full max-sm:space-y-4 items-center justify-center text-black font-be-vietnam-pro">
        {account?.avatar && (
          <div className="flex flex-col sm:px-2 h-full sm:w-1/3 max-sm:w-full sm:space-y-7 max-sm:space-y-4 justify-center items-center ">
            <img src={account.avatar} alt="Avatar" className="h-2/3 rounded-full" />
            <div className="text-3xl text-center truncate w-full max-sm:h-full">{account?.name}</div>
            <div className="flex items-center justify-center px-2 rounded-xl bg-green-600 text-black">FREE</div>
          </div>
        )}
        <div className="flex flex-col space-y-5 justify-center sm:pl-5 sm:w-1/2 max-sm:w-full h-full sm:border-l-2 sm:border-dashed">
          <div className="relative">
            <div className="border-4 border-gray-500 rounded-xl p-5 flex items-center space-x-2">
              <FaEnvelope className="flex-none w-5 h-5 text-green-500" />
              <span className="truncate">{account?.email}</span>
            </div>
            <label className="peer absolute bg-black left-2 -top-3 text-white transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-gray-600 px-1">
              Email
            </label>
          </div>

          <div className="relative">
            <div className="border-4 border-gray-500 rounded-xl p-5 flex items-center space-x-2">
              <FaComments className="flex-none w-5 h-5 text-green-500" />
              <span className="truncate">{totalChatSessions}</span>
            </div>
            <label className="peer absolute bg-black left-2 -top-3 text-white transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-gray-600 px-1">
              Tổng phiên chat
            </label>
          </div>

          <div className="relative">
            <div className="border-4 border-gray-500 rounded-xl p-5 flex items-center space-x-2">
              <FaWallet className="flex-none w-5 h-5 text-green-500" />
              <span className="truncate">{formatCurrency(totalBalance)}</span>
            </div>
            <label className="peer absolute bg-black left-2 -top-3 text-white transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-gray-600 px-1">
              Tổng số dư
            </label>
          </div>

          <div className="relative">
            <div className="border-4 border-gray-500 rounded-xl p-5 flex items-center space-x-2">
              <FaLock className="flex-none w-5 h-5 text-green-500" />
              <span className="truncate">{passwordDisplay}</span>
              <button className="justify-self-end" onClick={() => setIsModalOpen(true)}>
                <FaEdit className="w-5 h-5 max-sm:mr-4 text-green-500"/>
              </button> 
            </div>
            <label className="peer absolute bg-black left-2 -top-3 text-white transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-gray-600 px-1">
              Mật khẩu
            </label>
          </div>

          <div className="flex items-center justify-between max-sm:space-x-3">
            <button 
              onClick={() => setShowPricingTable(true)} 
              className="mt-5 py-2 px-4 bg-green-600 text-white rounded-lg self-start"
            >
              Nâng cấp tài khoản
            </button>

            <button 
              onClick={() => setShowPolicyModal(true)}
              className="mt-5 py-2 px-4 border-black text-black rounded-lg border-sm self-start"  
            >
                Xem Chính Sách Bảo Mật
            </button>
          </div>
        </div>
      </div>
      {showPricingTable && <PricingTable onClose={() => setShowPricingTable(false)} />}
      {showPolicyModal && <PrivacyPolicyModalViewOnly onClose={() => setShowPolicyModal(false)} />}
      {isModalOpen && <PasswordModal onClose={() => setIsModalOpen(false)} onSave={handlePasswordChange} />}
    </>
  );
};

export default UserInfor;
