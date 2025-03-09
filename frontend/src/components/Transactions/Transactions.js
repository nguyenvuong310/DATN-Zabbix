import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEllipsisV, FaFilter, FaArrowUp } from "react-icons/fa";
import AnimatedPage from "../../AnimatedPage";
import { deleteBankAccount } from "../../services/bankService";
import ConfirmationModal from "../../components/Else/ConfirmationModal";
import TransactionCard from "../../components/Transactions/TransactionCard";
import FilterModal from "./FilterModal";
import LoadingSpinner from "../Else/LoadingSpinner";
import {
  autoCategorizeTransaction,
  updateCategoryTransaction,
} from "../../services/transactionsServices";
import { toast } from "react-toastify";
import { fetchBanks } from "../../redux/action/bankActions";
import { set } from "nprogress";
import CategoryModal from "./CategoryModal";

const TransactionScreen = () => {
  const account = useSelector((state) => state.user.account);
  //   const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  //   let { bankAccount } = location.state;
  const bankAccounts = useSelector((state) => state.banks.bankAccounts);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Create a ref for the dropdown
  const [loadingDelete, setLoadingDelete] = useState(false); // New loading state

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const transactionsRef = useRef(null);

  // Get the bank account from the Redux state
  const bankAccount = bankAccounts.find((bank) => bank.id === +id);

  useEffect(() => {
    if (!bankAccount) {
      navigate("/bank");
      return;
    } else {
      setFilteredTransactions(
        bankAccount
          ? [...bankAccount.transactions].sort(
              (a, b) => new Date(b.datetime) - new Date(a.datetime)
            )
          : []
      );
    }
  }, [bankAccount]);

  // Sort transactions by date in descending order initially
  const [filteredTransactions, setFilteredTransactions] = useState(
    bankAccount
      ? [...bankAccount.transactions].sort(
          (a, b) => new Date(b.datetime) - new Date(a.datetime)
        )
      : []
  );

  const formatCurrency = (num) => {
    return num.toLocaleString("vi-VN") + " VND";
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      await deleteBankAccount({
        userId: account.id,
        bankAccountId: bankAccount.id,
      });
      
    } catch (error) {
      console.error("Failed to delete bank account:", error);
      toast.error("Đã xảy ra lỗi khi hủy liên kết giao dịch.");
    } finally {
      setLoadingDelete(false);
      navigate("/bank");
      toast.success("Hủy liên kết ngân hàng thành công.");
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleAutoCategorize = async () => {
    setLoadingDelete(true);
    const res = await autoCategorizeTransaction(bankAccount.id);
    if (res && res.success) {
      dispatch(fetchBanks(account.id));
      toast.success("Đã phân loại giao dịch thành công");
    } else {
      toast.error("Đã xảy ra lỗi khi phân loại giao dịch");
    }
    setLoadingDelete(false);
  };

  const onCategoryClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowCategoryModal(true);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryApply = async (categories) => {
    const { transactionId, userCategory, userSubCategory } = categories;
    const res = await updateCategoryTransaction(
      transactionId,
      userCategory,
      userSubCategory
    );
    if (res && res.success) {
      dispatch(fetchBanks(account.id));
      toast.success("Đã cập nhật phân loại giao dịch");
    } else {
      toast.error("Đã xảy ra lỗi khi cập nhật phân loại giao dịch");
    }
  };

  const handleFilterApply = (filters) => {
    const { startDate, endDate, minAmount, maxAmount, transactionType } =
      filters;

    let filtered = bankAccount.transactions;

    // Convert the min and max amounts to numbers and handle empty inputs
    const min = minAmount ? parseFloat(minAmount) : 0;
    const max = maxAmount ? parseFloat(maxAmount) : Infinity;

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter(
        (tx) => new Date(tx.datetime) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (tx) => new Date(tx.datetime) <= new Date(endDate)
      );
    }

    // Filter by absolute amount range
    filtered = filtered.filter((tx) => {
      return Math.abs(tx.amount) >= min && Math.abs(tx.amount) <= max;
    });

    // Filter by transaction type (income or expense)
    if (transactionType !== "both") {
      filtered = filtered.filter((tx) =>
        transactionType === "income" ? tx.amount > 0 : tx.amount < 0
      );
    }

    // Sort by date in descending order
    filtered.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

    setFilteredTransactions(filtered);
  };

  const scrollToTop = () => {
    if (transactionsRef.current) {
      transactionsRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    bankAccount && (
      <>
        {loadingDelete && <LoadingSpinner />}
        <div
          className={`flex flex-row max-sm:flex-col flex-1 ${
            loadingDelete ? "blur-sm" : ""
          }`}
        >
          <div className="w-1/4 max-sm:w-full p-4">
            <div className="bg-gray-800 text-white rounded-lg p-4 space-y-5 h-fit">
              <div
                className="relative h-1/2 p-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
                ref={dropdownRef}
              >
                <img
                  src={bankAccount.bankLogo}
                  alt={bankAccount.bankName}
                  className="h-1/3"
                />
                <FaEllipsisV
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={toggleDropdown}
                />
                <div
                  className={`absolute top-5 right-2 bg-gray-800 rounded-md shadow-lg py-2 mt-2 dropdown-menu ${
                    showDropdown
                      ? "dropdown-enter-active"
                      : "dropdown-leave-active"
                  } z-10 `}
                >
                  {showDropdown && (
                    <button
                      className="w-full text-white text-left font-be-vietnam-pro font-bold px-4 py-2 hover:bg-gray-200 hover:text-red-600"
                      onClick={() => {
                        setShowModal(true);
                        setShowDropdown(false);
                      }}
                    >
                      Xóa liên kết ngân hàng
                    </button>
                  )}
                </div>
              </div>
              <h3 className="text-3xl font-semibold mb-2 break-words font-be-vietnam-pro">
                {bankAccount.bankName.toUpperCase()}
              </h3>
              <p className="text-lg break-words font-be-vietnam-pro">
                Tên tài khoản: {bankAccount.accountName}
              </p>
              <p className="text-lg break-words font-be-vietnam-pro">
                Số tài khoản: {bankAccount.accountNumber}
              </p>
              <p className="text-lg break-words font-be-vietnam-pro">
                Số dư: {formatCurrency(bankAccount.balance)}
              </p>
            </div>
            <div
              onClick={handleAutoCategorize}
              id="box"
              className="gradient-border mt-10 mx-3 cursor-pointer z-0"
            >
              <p className="w-full text-md font-semibold p-2 rounded-md text-center h-full bg-slate-900 z-10">
                Tự động phân loại giao dịch
              </p>
            </div>
          </div>
          <div className="w-3/4 max-sm:w-full p-4 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg text-white font-semibold font-be-vietnam-pro">
                Các giao dịch
              </h3>
              <button
                className="flex items-center space-x-5 border-2 px-2 rounded-xl cursor-pointer"
                onClick={() => setShowFilterModal(true)}
              >
                <div className="font-be-vietnam-pro text-white text-lg font-semibold">
                  Bộ lọc
                </div>
                <FaFilter className="cursor-pointer text-green-600" />
              </button>
            </div>
            <ul
              className="space-y-2 overflow-y-auto max-h-[calc(100dvh-190px)]"
              ref={transactionsRef}
            >
              {Array.isArray(filteredTransactions) &&
              filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    onCategoryClick={onCategoryClick}
                    disableCategory={false}
                    setSelectedTransaction={setSelectedTransaction}
                  />
                ))
              ) : (
                <p>Không có giao dịch nào.</p>
              )}
            </ul>
          </div>
        </div>
        <ConfirmationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleDelete}
        />
        <FilterModal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApply={handleFilterApply}
        />
        {selectedTransaction && (
          <CategoryModal
            isOpen={showCategoryModal}
            onClose={() => setShowCategoryModal(false)}
            transaction={selectedTransaction}
            onApply={handleCategoryApply}
          />
        )}

        <button
          className="fixed bottom-10 right-10 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-700 z-40"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </button>
      </>
    )
  );
};

export default TransactionScreen;
