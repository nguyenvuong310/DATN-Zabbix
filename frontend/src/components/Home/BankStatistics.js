import React, { useMemo } from 'react';

const BankStatistics = ({ transactions, bankAccounts }) => {
  const formatCurrency = (num) => {
    return num.toLocaleString("vi-VN") + " VND";
  };

  const bankInfoMap = useMemo(() => {
    return bankAccounts.reduce((map, bankAccount) => {
      map[bankAccount.id] = {
        name: bankAccount.bankName.toUpperCase(),
        logo: bankAccount.bankLogo,
      };
      return map;
    }, {});
  }, [bankAccounts]);

  const highestIncomeTransaction = useMemo(() => {
    return transactions.reduce((max, transaction) =>
      transaction.amount > max.amount ? transaction : max, { amount: 0 });
  }, [transactions]);

  const highestExpenseTransaction = useMemo(() => {
    return transactions.reduce((max, transaction) =>
      transaction.amount < max.amount ? transaction : max, { amount: 0 });
  }, [transactions]);

  const bankWithHighestBalance = useMemo(() => {
    return bankAccounts.reduce((max, bankAccount) =>
      bankAccount.balance > max.balance ? bankAccount : max, { balance: -Infinity });
  }, [bankAccounts]);

  const bankWithSmallestBalance = useMemo(() => {
    return bankAccounts.reduce((min, bankAccount) =>
      bankAccount.balance < min.balance ? bankAccount : min, { balance: Infinity });
  }, [bankAccounts]);

  const bankWithHighestTotalExpense = useMemo(() => {
    return bankAccounts.reduce((max, bankAccount) => {
      const totalExpense = bankAccount.transactions.reduce((sum, transaction) =>
        transaction.amount < 0 ? sum + transaction.amount : sum, 0);
      return totalExpense < max.totalExpense ? { ...bankAccount, totalExpense } : max;
    }, { totalExpense: 0 });
  }, [bankAccounts]);

  const bankWithHighestTotalIncome = useMemo(() => {
    return bankAccounts.reduce((max, bankAccount) => {
      const totalIncome = bankAccount.transactions.reduce((sum, transaction) =>
        transaction.amount > 0 ? sum + transaction.amount : sum, 0);
      return totalIncome > max.totalIncome ? { ...bankAccount, totalIncome } : max;
    }, { totalIncome: 0 });
  }, [bankAccounts]);

  const truncateAccountNumber = (accountNumber) => {
    return accountNumber.length > 16 ? `${accountNumber.slice(0, 16)}...` : accountNumber;
  };

  if (bankAccounts.length === 0 || transactions.length === 0) {
    return (
      <div className="text-white text-xl font-be-vietnam-pro justify-center items-center flex flex-col flex-1 space-y-2">
        <p>Không có dữ liệu để hiển thị.</p>
      </div>
    );
  }

  return (
    <div className="text-white text-sm font-be-vietnam-pro flex flex-col space-y-2">
      <div className='bg-gray-800 rounded-xl flex flex-row justify-between p-4'>
        <div className='flex flex-col space-y-2'>
          <p>Giao dịch có <span className='text-green-500 text-lg'>tiền vào lớn nhất:</span></p>
          <img src={bankInfoMap[highestIncomeTransaction.bankAccountId]?.logo} alt="Bank Logo" className="w-10 h-10" />
        </div>
        <div className='flex flex-col items-end'>
          <p>Số tiền: <span className='text-green-500 text-lg'>{formatCurrency(highestIncomeTransaction.amount)}</span></p>
          <p>Ngày: {new Date(highestIncomeTransaction.datetime).toLocaleDateString()}</p>
          <p>Tài khoản: {truncateAccountNumber(highestIncomeTransaction.accountNumber)}</p>
          <p>Ngân hàng: {bankInfoMap[highestIncomeTransaction.bankAccountId]?.name}</p>
        </div>
      </div>

      <div className='bg-gray-800 rounded-xl flex flex-row justify-between p-4'>
        <div className='flex flex-col space-y-2'>
          <p>Giao dịch có <span className='text-red-500 text-lg'>tiền ra lớn nhất:</span></p>
          <img src={bankInfoMap[highestExpenseTransaction.bankAccountId]?.logo} alt="Bank Logo" className="w-10 h-10" />
        </div>
        <div className='flex flex-col items-end'>
          <p>Số tiền: <span className='text-red-500 text-lg'>{formatCurrency(highestExpenseTransaction.amount)}</span></p>
          <p>Ngày: {new Date(highestExpenseTransaction.datetime).toLocaleDateString()}</p>
          <p>Tài khoản: {truncateAccountNumber(highestExpenseTransaction.accountNumber)}</p>
          <p>Ngân hàng: {bankInfoMap[highestExpenseTransaction.bankAccountId]?.name}</p>
        </div>
      </div>

      <div className='bg-gray-800 rounded-xl flex flex-row justify-between p-4'>
        <div className='flex flex-col space-y-2'>
          <p>Ngân hàng có <span className='text-green-500 text-lg'>số dư cao nhất:</span></p>
          <img src={bankInfoMap[bankWithHighestBalance.id]?.logo} alt="Bank Logo" className="w-10 h-10" />
        </div>
        <div className='flex flex-col items-end'>
          <p>Số dư: <span className='text-green-500 text-lg'>{formatCurrency(bankWithHighestBalance.balance)}</span></p>
          <p>Tài khoản: {truncateAccountNumber(bankWithHighestBalance.accountNumber)}</p>
          <p>Ngân hàng: {bankInfoMap[bankWithHighestBalance.id]?.name}</p>
        </div>
      </div>

      <div className='bg-gray-800 rounded-xl flex flex-row justify-between p-4'>
        <div className='flex flex-col space-y-2'>
          <p>Ngân hàng có <span className='text-yellow-400 text-lg'>số dư thấp nhất:</span></p>
          <img src={bankInfoMap[bankWithSmallestBalance.id]?.logo} alt="Bank Logo" className="w-10 h-10" />
        </div>
        <div className='flex flex-col items-end'>
          <p>Số dư: <span className='text-yellow-400 text-lg'>{formatCurrency(bankWithSmallestBalance.balance)}</span></p>
          <p>Tài khoản: {truncateAccountNumber(bankWithSmallestBalance.accountNumber)}</p>
          <p>Ngân hàng: {bankInfoMap[bankWithSmallestBalance.id]?.name}</p>
        </div>
      </div>

      <div className='bg-gray-800 rounded-xl flex flex-row justify-between p-4'>
        <div className='flex flex-col space-y-2'>
          <p>Ngân hàng có <span className='text-red-500 text-lg'>tổng chi cao nhất:</span></p>
          <img src={bankInfoMap[bankWithHighestTotalExpense.id]?.logo} alt="Bank Logo" className="w-10 h-10" />
        </div>
        <div className='flex flex-col items-end'>
          <p>Tổng chi: <span className='text-red-500 text-lg'>{formatCurrency(bankWithHighestTotalExpense.totalExpense)}</span></p>
          <p>Tài khoản: {truncateAccountNumber(bankWithHighestTotalExpense.accountNumber)}</p>
          <p>Ngân hàng: {bankInfoMap[bankWithHighestTotalExpense.id]?.name}</p>
        </div>
      </div>

      <div className='bg-gray-800 rounded-xl flex flex-row justify-between p-4'>
        <div className='flex flex-col space-y-2'>
          <p>Ngân hàng có <span className='text-green-500 text-lg'>tổng thu cao nhất:</span></p>
          <img src={bankInfoMap[bankWithHighestTotalIncome.id]?.logo} alt="Bank Logo" className="w-10 h-10" />
        </div>
        <div className='flex flex-col items-end'>
          <p>Tổng thu: <span className='text-green-500 text-lg'>{formatCurrency(bankWithHighestTotalIncome.totalIncome)}</span></p>
          <p>Tài khoản: {truncateAccountNumber(bankWithHighestTotalIncome.accountNumber)}</p>
          <p>Ngân hàng: {bankInfoMap[bankWithHighestTotalIncome.id]?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default BankStatistics;
