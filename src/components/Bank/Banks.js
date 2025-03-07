// src/components/Banks/Banks.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getLinkBankHub,
  postExchangeToken,
  fetchNewTransactions,
  fetchHistoryTransactions
} from "../../services/bankHubService";
import { fetchBanks } from "../../redux/action/bankActions";
import BankCard from "./BankCard";
import AnimatedPage from "../../AnimatedPage";
import { FaPlus } from "react-icons/fa"; // Import the plus icon
import { toast } from "react-toastify";
import FetchTransaction from './FetchTransaction';
import LoadingSpinner from "../Else/LoadingSpinner"; // Import the LoadingSpinner component

const Banks = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const bankAccounts = useSelector((state) => state.banks.bankAccounts);
  const loading = useSelector((state) => state.banks.loading);
  const navigate = useNavigate();
  const location = useLocation();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('new');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loadingExchange, setLoadingExchange] = useState(false); // New loading state
  const [loadingTransactions, setLoadingTransactions] = useState(false); // Loading state for transactions

  const [selectedBankName, setSelectedBankName] = useState(""); // New state for bankName
  const [selectedAccountNumber, setSelectedAccountNumber] = useState(""); // New state for accountNumber
  const [selectedBankAccountId, setSelectedBankAccountId] = useState(""); // New state for bankAccountId

  const [existingFromDate, setExistingFromDate] = useState(''); // State for existing fromDate
  const [existingToDate, setExistingToDate] = useState(''); // State for existing toDate

  const openModal = (bankName, accountNumber, bankAccountId, transactions) => {
    setSelectedBankName(bankName);
    setSelectedAccountNumber(accountNumber);
    setSelectedBankAccountId(bankAccountId);

    if (transactions && transactions.length > 0) {
      const sortedTransactions = transactions.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
      setExistingFromDate(sortedTransactions[0].datetime.split('T')[0]);
      setExistingToDate(sortedTransactions[sortedTransactions.length - 1].datetime.split('T')[0]);
    } else {
      setExistingFromDate('N/A');
      setExistingToDate('N/A');
    }

    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);
  const handleOptionChange = (event) => setSelectedOption(event.target.value);
  const handleDateChange = (event) => {
    if (event.target.name === 'fromDate') setFromDate(event.target.value);
    else setToDate(event.target.value);
  };
  
  useEffect(() => {
    if (isAuthenticated && account && account.id) {
      dispatch(fetchBanks(account.id));
    }
  }, [isAuthenticated, account, dispatch]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const publicToken = urlParams.get("publicToken");

    if (publicToken) {
      exchangePublicToken(publicToken);
    }
  }, [location.search]);

  const handleAddBankAccount = async () => {
    if (!isAuthenticated) {
      // Handle the case where the user is not authenticated
      window.alert("Please log in to add a bank account.");
      return;
    }
    const currentUrl = window.location.href;
    try {
      const response = await getLinkBankHub(currentUrl);
      window.location.href = response.bankHubLink;
    } catch (error) {
      console.error("Failed to get the bank hub link:", error);
      window.alert("Failed to get the bank hub link.");
    }
  };

  const exchangePublicToken = async (publicToken) => {
    setLoadingExchange(true); // Start loading
    try {
      const response = await postExchangeToken({
        publicToken: publicToken,
        userId: +account.id,
      });
      if (response && response.success === true) {
        toast.success("Đã liên kết ngân hàng thành công.");
        navigate("/bank");
        dispatch(fetchBanks(account.id));
      }
    } catch (error) {
      console.error("Failed to exchange public token:", error);
      toast.error("Đã có lỗi trong quá trình liên kết. Vui lòng thử lại sau!");
    } finally {
      setLoadingExchange(false); // End loading
    }
  };

  const handleFetchTransactions = async () => {
    setLoadingTransactions(true);
    let res = null;
    try {
      if (selectedOption === 'new') {
        res = await fetchNewTransactions(selectedBankAccountId);
      } else if (selectedOption === 'old') {
        res = await fetchHistoryTransactions(selectedBankAccountId, fromDate);
      }
      if (res && res.message) {
        toast.error("Yêu cầu vượt quá giới hạn truy cập. Vui lòng thử lại sau 1 phút.");
      } else if (res && res.success) {
        toast.success("Cập nhật giao dịch thành công.");
      }
      dispatch(fetchBanks(account.id));
    } catch (error) {
      toast.error("Cập nhật giao dịch thất bại. Vui lòng thử lại sau!");
    } finally {
      setLoadingTransactions(false);
      closeModal();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-1 justify-center items-center text-white text-2xl font-be-vietnam-pro">
        Hãy đăng nhập để có thể liên kết ngân hàng và theo dõi tài khoản ngân
        hàng của bạn.
      </div>
    );
  }

  return (
    <AnimatedPage>
      {loadingExchange && <LoadingSpinner />}
      {loadingTransactions && <LoadingSpinner />}
      <div className={`flex flex-col flex-1 space-y-4 ${loadingExchange || loadingTransactions ? 'blur-sm' : ''}`}>
        <button
          className="bg-green-700 text-white text-md font-semibold p-4 flex justify-center self-center items-center w-fit rounded-full"
          onClick={handleAddBankAccount}
          disabled={loading}
        >
          {loading ? (
            "Loading..."
          ) : (
            <>
              <FaPlus className="mr-2" /> {/* Add the plus icon */}
              Liên kết ngân hàng
            </>
          )}
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(bankAccounts) && bankAccounts.length > 0 ? (
            bankAccounts.map((account) => (
              <BankCard key={account.id} bankAccount={account} openModal={() => openModal(account.bankName, account.accountNumber, account.id, account.transactions)}/>
            ))) : (
              <div className="absolute flex justify-self-center text-xl pt-10 text-white font-be-vietnam-pro">
                Không có tài khoản ngân hàng nào.
              </div>
            )}
        </div>
      </div>
      <FetchTransaction
      isOpen={modalIsOpen}
      onClose={closeModal}
      selectedOption={selectedOption}
      handleOptionChange={handleOptionChange}
      fromDate={fromDate}
      toDate={toDate}
      handleDateChange={handleDateChange}
      bankName={selectedBankName} // Pass bankName to the modal
      accountNumber={selectedAccountNumber} // Pass accountNumber to the modal
      onFetchTransactions={handleFetchTransactions} // Pass fetch function
      existingFromDate={existingFromDate}
      existingToDate={existingToDate}
    />
    </AnimatedPage>
  );
};

export default Banks;
