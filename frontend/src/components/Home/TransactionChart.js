import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { startOfDay, startOfWeek, startOfMonth, startOfYear, isAfter, endOfMonth, format, parse } from 'date-fns';

const TransactionChart = ({ transactions, filter }) => {
  const filteredTransactions = useMemo(() => {
    const now = new Date();
    let startDate;
    let endDate = now;

    if (filter.startsWith('month_')) {
      const month = parseInt(filter.split('_')[1], 10) - 1;
      startDate = new Date(now.getFullYear(), month, 1);
      endDate = endOfMonth(startDate);
    } else {
      switch (filter) {
        case 'today':
          startDate = startOfDay(now);
          break;
        case 'this_week':
          startDate = startOfWeek(now, { weekStartsOn: 1 });
          break;
        case 'this_month':
          startDate = startOfMonth(now);
          break;
        case 'this_year':
          startDate = startOfYear(now);
          break;
        default:
          startDate = startOfDay(now);
      }
    }

    return transactions.filter(transaction =>
      isAfter(new Date(transaction.datetime), startDate) &&
      isAfter(endDate, new Date(transaction.datetime))
    );
  }, [transactions, filter]);

  const groupedTransactions = useMemo(() => {
    const groupBy = (array, keyGetter) => {
      const map = new Map();
      array.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    };

    let keyGetter;
    let parseFormat;

    switch (filter) {
      case 'today':
        keyGetter = transaction => format(new Date(transaction.datetime), 'HH:mm');
        parseFormat = 'HH:mm';
        break;
      case 'this_week':
      case 'this_month':
        keyGetter = transaction => format(new Date(transaction.datetime), 'dd/MM');
        parseFormat = 'dd/MM';
        break;
      case 'this_year':
        keyGetter = transaction => format(new Date(transaction.datetime), 'MM/yyyy');
        parseFormat = 'MM/yyyy';
        break;
      default:
        if (filter.startsWith('month_')) {
          keyGetter = transaction => format(new Date(transaction.datetime), 'dd/MM');
          parseFormat = 'dd/MM';
        } else {
          keyGetter = transaction => format(new Date(transaction.datetime), 'dd/MM/yyyy');
          parseFormat = 'dd/MM/yyyy';
        }
    }

    const grouped = groupBy(filteredTransactions, keyGetter);
    const groupedData = Array.from(grouped, ([key, value]) => ({
      date: key,
      dateObj: parse(key, parseFormat, new Date()), // Parse the date string into a Date object for sorting
      income: value.reduce((sum, item) => (item.amount > 0 ? sum + item.amount : sum), 0),
      expense: value.reduce((sum, item) => (item.amount < 0 ? sum + item.amount : sum), 0),
    }));

    // Sort the grouped data by the date object
    return groupedData.sort((a, b) => a.dateObj - b.dateObj);
  }, [filteredTransactions, filter]);

  const chartData = useMemo(() => {
    const labels = groupedTransactions.map(item => item.date);
    const incomeData = groupedTransactions.map(item => item.income);
    const expenseData = groupedTransactions.map(item => item.expense);

    return {
      labels,
      datasets: [
        {
          label: 'Tiền vào',
          data: incomeData,
          borderColor: 'green',
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2,
        },
        {
          label: 'Tiền ra',
          data: expenseData,
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2,
        },
      ],
    };
  }, [groupedTransactions]);

  const chartOptions = {
    maintainAspectRatio: false, // Allow the chart to resize with its container
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            family: 'Be Vietnam Pro',
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
          color: 'white',
          font: {
            family: 'Be Vietnam Pro',
            size: 16,
          },
        },
      },
      y: {
        ticks: {
          color: 'white',
          font: {
            family: 'Be Vietnam Pro',
            size: 16,
          },
          callback: function (value) {
            if (Math.abs(value) >= 1e9) {
              return (value / 1e9).toFixed(1) + ' Tỉ';
            } else if (Math.abs(value) >= 1e6) {
              return (value / 1e6).toFixed(1) + ' Tr';
            } else if (Math.abs(value) >= 1e3) {
              return (value / 1e3).toFixed(1) + ' K';
            } else {
              return value;
            }
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-96 md:h-80 lg:h-96"> {/* Apply Tailwind CSS classes for responsive container */}
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default TransactionChart;
