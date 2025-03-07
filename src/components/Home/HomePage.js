import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardSlider from "./CardSlider";
import AnimatedPage from "../../AnimatedPage";
import { fetchBanks } from "../../redux/action/bankActions";
import TransactionChart from "./TransactionChart";
import BankStatistics from "./BankStatistics";
import Dropdown from "../Else/Dropdown";
import TransactionCard from "../Transactions/TransactionCard";
import "chart.js/auto";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const bankAccounts = useSelector((state) => state.banks.bankAccounts);
  const isLoading = useSelector((state) => state.banks.loading);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("this_month");

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const months = Array.from({ length: currentMonth }, (_, i) => ({
    value: `month_${i + 1}`,
    label: `Tháng ${i + 1}`,
  }));

  const filterOptions = [
    { value: "this_month", label: "Tháng này" },
    { value: "this_week", label: "Tuần này" },
    { value: "today", label: "Hôm nay" },
    { value: "this_year", label: "Năm nay" },
    ...months,
  ];

  useEffect(() => {
    if (isAuthenticated && account?.id && bankAccounts.length === 0) {
      dispatch(fetchBanks(account.id));
    }
  }, [isAuthenticated, account?.id, bankAccounts.length]);

  const transactions = useMemo(() => {
    return bankAccounts
      .flatMap((bankAccount) => bankAccount.transactions)
      .sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  }, [bankAccounts]);

  const selectedFilter = filterOptions.find(
    (option) => option.value === filter
  );

  return (
    <>
      <div className="flex flex-row max-sm:flex-col max-sm:space-y-3 flex-1 sm:space-x-3">
        <div className="flex flex-col w-1/2 max-sm:w-full space-y-3">
          <div className="flex flex-col items-center bg-gray-700 rounded-3xl">
            <div className="text-white w-full text-xl font-semibold font-be-vietnam-pro py-2 px-5">
              Ngân hàng của tôi
            </div>
            <CardSlider bankAccounts={bankAccounts} />
          </div>
          <div className="flex flex-1 flex-col items-center bg-gray-700 rounded-3xl">
            <div className="text-white w-full text-xl font-semibold font-be-vietnam-pro py-2 px-5">
              Giao dịch gần đây
            </div>
            <div className="w-full p-5 space-y-3 overflow-y-auto max-h-dvh">
              {transactions.length > 0 ? (
                transactions
                  .slice(0, 10)
                  .map((transaction) => (
                    <TransactionCard
                      key={transaction.id}
                      transaction={transaction}
                      disableCategory={true}
                    />
                  ))
              ) : (
                <div className="text-white text-xl text-center font-be-vietnam-pro">
                  Không có dữ liệu để hiển thị.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/2 max-sm:w-full bg-gray-700 rounded-3xl space-y-3 p-4 overflow-y-auto">
          <h3 className="text-xl text-white font-semibold font-be-vietnam-pro">
            Biểu đồ thống kê
          </h3>
          {bankAccounts.length > 0 && transactions.length > 0 && (
            <div className="flex space-x-3 mb-4">
              <Dropdown
                options={filterOptions}
                selectedOption={selectedFilter}
                onSelect={setFilter}
              />
            </div>
          )}
          <TransactionChart transactions={transactions} filter={filter} />
          <BankStatistics
            transactions={transactions}
            bankAccounts={bankAccounts}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
