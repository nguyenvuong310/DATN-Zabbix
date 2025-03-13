import { useState } from "react";
import { ImSpinner6 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

import BackGround from "../../assets/modern-abstract-white-minimal-background_84443-8340.avif";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import "nprogress/nprogress.css";
import "./Login.scss"; // Remove this import if it contains Bootstrap-specific styles
import { login } from "../../services/cameraService";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // validate
    if (username === "") {
      toast.error("Email không được để trống!");
      return;
    }
    if (password === "") {
      toast.error("Mật khẩu không được để trống!");
      return;
    }
    if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    //submit api
    setIsLoading(true);

    let res = await login(username, password);

    console.log("res", res);

    if (res && res?.data?.accessToken) {
      dispatch(doLogin(res?.data));
      toast.success("Login successfully");
      setIsLoading(false);
      navigate("/");
    } else if (res && res.message) {
      toast.error(res.message);
      setIsLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover p-4"
      style={{ background: `url(${BackGround})`, backgroundSize: "cover" }}
    >
      <div className="w-full max-w-md">
        <div className="bg-white border border-slate-400 rounded-md shadow-2xl px-8 pt-6 backdrop-blur-sm backdrop-filter pb-8 mb-4 relative text-black">
          <div className="mb-4 text-center">
            {/* <span>Bạn chưa có tài khoản?</span>
            <button
              onClick={() => navigate("/register")}
              className="ml-2 text-emerald-600 hover:underline"
            >
              Đăng ký ngay
            </button> */}
          </div>
          <div className="text-2xl font-bold text-center mb-4">ABC</div>
          <div className="text-center mb-6">Chào mừng bạn trở lại</div>
          <div className="relative mb-8">
            <input
              //   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              className="block w-full py-2.3 px-0 text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-emerald-600 focus:outline-none focus:ring-0 focus:text-black focus:border-emerald-600 peer"
              placeholder=""
              type="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <label className="absolute black text-md font-semibold duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">
              Tài khoản
            </label>
          </div>
          <div className="relative mb-6">
            <input
              className="block w-full py-2.3 px-0 text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-[#3bf8a0] focus:outline-none focus:ring-0 focus:text-black focus:border-emerald-600 peer"
              placeholder=""
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <label className="absolute text-black text-md font-semibold duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">
              Mật khẩu
            </label>
          </div>
          {/* <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-emerald-600 hover:underline cursor-pointer">
              Quên mật khẩu?
            </span>
          </div> */}
          <div className="flex items-center justify-between mb-4">
            <button
              disabled={isLoading}
              onClick={() => handleLogin()}
              className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isLoading && "opacity-50 cursor-not-allowed"
              }`}
            >
              {isLoading && (
                <ImSpinner6 className="loaderIcon animate-spin mr-2 inline-block" />
              )}
              <span>Đăng nhập</span>
            </button>
          </div>

          {/* <div className="relative flex pb-4 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-white-500">Hoặc</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div> */}

          {/* <button
            className="flex flex-row justify-center gap-2 items-center w-full bg-blue-600 text-white  hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              login();
            }}
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="google"
              className="w-6 h-6 bg-white rounded-full"
            />
            <span> Đăng nhập với Google </span>
          </button> */}

          <div className="text-center mt-4">
            <span
              className="text-emerald-600 hover:underline cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              &#60; &#60; Về trang chủ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
