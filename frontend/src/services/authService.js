import axios from "axios";
import instance from "../utils/axiosCustomize";
// formData: { email: string; password: string }
const postLogin = async (formData) => {
  return await instance.post("api/v1/auth/login", formData);
};

// name: string;
// email: string;
// password: string;
const postRegister = async (formData) => {
  return await instance.post("api/v1/auth/register", formData);
};

// formData: { token: string }
const postGoogleLogin = async (formData) => {
  return await instance.post("api/v1/auth/google-login", formData);
};

export { postLogin, postRegister, postGoogleLogin };
