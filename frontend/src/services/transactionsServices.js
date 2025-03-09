import instance from "../utils/axiosCustomize";

export const fetchTransactions = async (filterData) => {
  try {
    console.log("Fetching transactions with data:", filterData);
    const response = await instance.get(
      `api/v1/transaction/filter/${filterData.bankAccountId}`,
      { params: filterData }
    );
    console.log("Transactions fetched:", response);
    return response;
  } catch (error) {
    console.log("Error fetching transactions:", error);
    throw error;
  }
};
// transactionId: number)
export const fetchTransactionDetails = async (transactionId) => {
  try {
    const response = await instance.get(`api/v1/transaction/${transactionId}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching transaction details:", error);
    throw error;
  }
};

export const autoCategorizeTransaction = async (transactionId) => {
  try {
    const response = await instance.put(
      `api/v1/transaction/categorize/${transactionId}`
    );
    return response;
  } catch (error) {
    console.log("Error auto-categorizing transaction:", error);
    throw error;
  }
};
export const updateCategoryTransaction = async (
  transactionId,
  userCategory,
  userSubCategory
) => {
  try {
    const response = await instance.put(
      `api/v1/transaction/update-user-category/${transactionId}`,
      {
        userCategory,
        userSubCategory,
      }
    );
    return response;
  } catch (error) {
    console.log("Error auto-categorizing transaction:", error);
    throw error;
  }
};

// Add more API methods as needed
