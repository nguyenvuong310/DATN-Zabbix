// bankHubService.js
import instance from "../utils/axiosCustomize";

const getLinkBankHub = async (url) => {
  return await instance.post("api/v1/bankhub/create-link", { url: url });
};

const postExchangeToken = async (formData) => {
  return await instance.post("api/v1/bankhub/exchange-token", formData);
};

const fetchNewTransactions = async (bankAccountId) => {
  try {
    return await instance.get(`api/v1/bankhub/sync/${bankAccountId}`);
  } catch (error) {
    console.error("Failed to fetch new transactions", error);
    throw error;
  }
};

const fetchHistoryTransactions = async (bankAccountId, fromDate) => {
  try {
    return await instance.post(
      `api/v1/bankhub/history/${bankAccountId}?fromDate=${fromDate}`
    );
  } catch (error) {
    console.error("Failed to fetch history transactions", error);
    throw error;
  }
};

export {
  getLinkBankHub,
  postExchangeToken,
  fetchNewTransactions,
  fetchHistoryTransactions,
};
