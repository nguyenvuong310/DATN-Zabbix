// import axios from "axios";
import instance from "../utils/axiosCustomize";

export const putThreadId = (userId) => {
  return instance.put(`api/v1/openai/thread/${userId}`);
};
