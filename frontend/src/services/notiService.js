import instance from "../utils/axiosCustomize";

// Notification services
export const getSystemNotification = async () => {
  try {
    const response = await instance.get('api/v1/system-notification');
    return response;
  } catch (error) {
    console.error("Error fetching system notifications", error);
    throw error;
  }
};