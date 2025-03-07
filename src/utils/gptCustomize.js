import { previousDay } from "date-fns";

function dinhDangThongTinTaiKhoan(taiKhoan) {
  let chuoiDinhDang = `Tên TK: ${taiKhoan.accountName}\n`;
  chuoiDinhDang += `STK: ${taiKhoan.accountNumber}\n`;
  chuoiDinhDang += `Số dư: ${taiKhoan.balance}\n`;
  chuoiDinhDang += `Ngân hàng: ${taiKhoan.bankName}\n`;
  chuoiDinhDang += `Tổng số giao dịch: ${taiKhoan.transactions.length}\n`;
  //   chuoiDinhDang += `Logo ngân hàng: ${taiKhoan.bankLogo}\n`;
  //   chuoiDinhDang += `ID người dùng: ${taiKhoan.userId}\n`;
  chuoiDinhDang += `Giao dịch:\n`;

  let i = 1;
  let numOfTransactions = taiKhoan.transactions.length;
  taiKhoan.transactions.forEach((giaoDich) => {
    // chuoiDinhDang += `  - ID giao dịch: ${giaoDich.id}\n`;
    // chuoiDinhDang += `    Mã tham chiếu: ${giaoDich.reference}\n`;
    // chuoiDinhDang += `${i}.`;
    chuoiDinhDang += ` ${giaoDich.amount},`;
    if (numOfTransactions <= 50) {
      chuoiDinhDang += ` ${giaoDich.description},`;
    }
    chuoiDinhDang += ` ${giaoDich.datetime.slice(0, 16)}\n`;
    i++;
    // chuoiDinhDang += `    Số dư sau giao dịch: ${giaoDich.runningBalance}\n`;
    // chuoiDinhDang += `    Số tài khoản: ${giaoDich.accountNumber},`;
    // chuoiDinhDang += `    ID tài khoản ngân hàng: ${giaoDich.bankAccountId},`;
  });
  return chuoiDinhDang;
}

export const jsonDataBank = (taiKhoan, fromDate, toDate) => {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  to.setDate(to.getDate() + 1); // Để bao gồm cả ngày toDate
  const numOfTransactions = taiKhoan.transactions.length;

  const categorizedTransactions = {
    today: [],
    yesterday: [],
    previous7Days: [],
    previous14Days: [],
    previous30Days: [],
    previous60Days: [],
  };

  // Sort transactions by datetime in ascending order
  const sortedTransactions = taiKhoan.transactions.sort((a, b) => {
    return new Date(b.datetime) - new Date(a.datetime);
  });

  sortedTransactions.forEach((giaoDich) => {
    const giaoDichDate = new Date(giaoDich.datetime);
    let transactionDetails = {};
    if (numOfTransactions <= 40) {
      transactionDetails = {
        amount: giaoDich.amount,
        description: giaoDich.description,
        datetime: giaoDich.datetime,
      };
    } else {
      transactionDetails = {
        amount: giaoDich.amount,
        datetime: giaoDich.datetime,
      };
    }

    if (giaoDichDate >= from && giaoDichDate < to) {
      const today = new Date();
      const startOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const startOfYesterday = new Date(startOfToday);
      startOfYesterday.setDate(startOfYesterday.getDate() - 1);
      const startOfPrevious7Days = new Date(startOfToday);
      startOfPrevious7Days.setDate(startOfToday.getDate() - 7);
      const startOfPrevious14Days = new Date(startOfToday);
      startOfPrevious14Days.setDate(startOfToday.getDate() - 14);
      const startOfPrevious30Days = new Date(startOfToday);
      startOfPrevious30Days.setDate(startOfToday.getDate() - 30);
      const startOfPrevious60Days = new Date(startOfToday);
      startOfPrevious60Days.setDate(startOfToday.getDate() - 60);

      if (giaoDichDate >= startOfToday) {
        categorizedTransactions.today.push(transactionDetails);
      } else if (
        giaoDichDate >= startOfYesterday &&
        giaoDichDate < startOfToday
      ) {
        categorizedTransactions.yesterday.push(transactionDetails);
      } else if (
        giaoDichDate >= startOfPrevious7Days &&
        giaoDichDate < startOfToday
      ) {
        categorizedTransactions.previous7Days.push(transactionDetails);
      } else if (
        giaoDichDate >= startOfPrevious14Days &&
        giaoDichDate < startOfPrevious7Days
      ) {
        categorizedTransactions.previous14Days.push(transactionDetails);
      } else if (
        giaoDichDate >= startOfPrevious30Days &&
        giaoDichDate < startOfPrevious14Days
      ) {
        categorizedTransactions.previous30Days.push(transactionDetails);
      } else if (
        giaoDichDate >= startOfPrevious60Days &&
        giaoDichDate < startOfPrevious30Days
      ) {
        categorizedTransactions.previous60Days.push(transactionDetails);
      }
    }
  });

  return {
    accountName: taiKhoan.accountName,
    accountNumber: taiKhoan.accountNumber,
    balance: taiKhoan.balance,
    bankName: taiKhoan.bankName,
    numOfTransactions: numOfTransactions,
    transactions: categorizedTransactions,
  };
};

const customizeDataBank = (banks) => {
  let bankInfo = "";
  for (let i = 0; i < banks.length; i++) {
    bankInfo += dinhDangThongTinTaiKhoan(banks[i]);
  }
  //   console.log(bankInfo);
  return bankInfo;
};

export const cleanJsonDataBank = (banks) => {
  return banks.map((bank) => {
    return {
      ...bank,
      transactions: cleanJsonDataTransaction(bank.transactions),
    };
  });
};

const cleanJsonDataTransaction = (transactions) => {
  return transactions.map((transaction) => {
    return {
      amount: transaction.amount,
      datetime: transaction.datetime.slice(0, 10),
      description: transaction.description
        .replace(/\d+/g, "")
        .replace(/\s+/g, " ")
        .trim(),
    };
  });
};

export default customizeDataBank;
