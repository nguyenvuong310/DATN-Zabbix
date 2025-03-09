import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";
import { doLogout } from "../redux/action/userAction";

NProgress.configure({
  showSpinner: false,
  //   easing: "ease",
  //   speed: 500,
  //   trickle: true,
  //   trickleRate: 0.02,
  trickleSpeed: 60,
});

const instance = axios.create({
  baseURL: process.env.REACT_APP_NESTJS_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const accept_token = store?.getState()?.user?.account?.access_token;

    config.headers["Authorization"] = "Bearer " + accept_token;
    NProgress.start();
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    // console.log(">> interceptor", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // console.log("error", error.response.data);
    // Do something with response error
    NProgress.done();
    if (
      error &&
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Unauthorized"
    ) {
      store.dispatch(doLogout("Access token expired"));

      window.location.href = "/login";
    }
    console.log("error", error.response.status);

    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
