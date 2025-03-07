import instance from "../utils/axiosCustomize";

const getBankByUserId = async (userId) => {
  return await instance.get(`api/v1/bank-account/${userId}`);
};

const getTotalBalanceByUserId = async (userId) => {
  try {
    const response = await getBankByUserId(userId);

    const totalBalance = response.reduce((acc, account) => {
      return acc + account.balance;
    }, 0);

    return totalBalance;
  } catch (error) {
    console.error("Error fetching bank accounts:", error);
    return 0;
  }
};

export { getBankByUserId, getTotalBalanceByUserId };

// formData: {
//     userId: number;
//     bankAccountId: number;
// }
export const deleteBankAccount = async (formData) => {
  try {
    const response = await instance.delete(
      "api/v1/bankhub/delete-bank-account",
      {
        data: formData,
      }
    );
    console.log("Bank account deleted:", response);
    return response.data;
  } catch (error) {
    console.log("Error deleting bank account:", error);
    throw error;
  }
};
