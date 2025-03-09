import instance from "../utils/axiosCustomize";

export const togglePolicyAccepted = async (userId) => {
  try {
    return await instance.put(`api/v1/users/policy/${userId}`);
  } catch (error) {
    console.log("Error toggle accept policy:", error);
    throw error;
  }
};