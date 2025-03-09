import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoEye } from "react-icons/go";
import BackGround from "../../assets/bgLogin1.jpg";
import { hashPassword } from "../../utils/hashPassword";
import { FaEyeSlash } from "react-icons/fa";
import "nprogress/nprogress.css";
import { validateEmail } from "../../utils/checkEmail";
import { postRegister } from "../../services/authService";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    // validate
    if (username === "") {
      toast.error("Họ tên không được để trống!");
      return;
    }
    if (email === "") {
      toast.error("Email không được để trống!");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Email chưa đúng định đạng!");
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
    const hashedPassword = await hashPassword(password);
    let res = await postRegister({
      email: email,
      password: hashedPassword,
      name: username,
    });
    console.log(">>check res:", res);

    if (res && res.success) {
      toast.success("Đã đăng ký tài khoản thành công!");
      navigate("/login");
    } else if (res && res.message) {
      toast.error(res.message);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover p-4"
      style={{ background: `url(${BackGround})`, backgroundSize: "cover" }}
    >
      <div className="w-full max-w-md">
        <div className="bg-slate-800 border border-slate-400 rounded-md shadow-2xl px-8 pt-6 backdrop-blur-sm backdrop-filter pb-8 mb-4 bg-opacity-50 relative text-white">
          <div className="mb-4 text-center">
            <span>Đã có tài khoản?</span>
            <button
              onClick={() => navigate("/login")}
              className="ml-2 text-[#3bf8a0] hover:underline"
            >
              Đăng nhập ngay
            </button>
          </div>
          <div className="text-2xl font-bold text-center mb-4">BankGPT</div>
          <div className="text-center mb-6">
            Hãy bắt đầu với trợ lý ảo của chúng tôi
          </div>
          <div className=" relative mb-6">
            <input
              className="block w-full py-2.3 px-0 text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-[#3bf8a0] focus:outline-none focus:ring-0 focus:text-white focus:border-[#3bf8a0] peer"
              type="text"
              placeholder=""
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <label className="absolute text-white text-md font-semibold duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#3bf8a0] peer-focus:dark:text-[#3bf8a0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">
              Họ tên<span className="text-red-600">*</span>
            </label>
          </div>
          <div className="relative mb-6">
            <input
              className="block w-full py-2.3 px-0 text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-[#3bf8a0] focus:outline-none focus:ring-0 focus:text-white focus:border-[#3bf8a0] peer"
              placeholder=""
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label className="absolute text-white text-md font-semibold duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#3bf8a0] peer-focus:dark:text-[#3bf8a0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">
              Email<span className="text-red-600">*</span>
            </label>
          </div>

          <div className="relative mb-8">
            <div className="relative">
              <input
                className="block w-full py-2.3 px-0 text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-[#3bf8a0] focus:outline-none focus:ring-0 focus:text-white focus:border-[#3bf8a0] peer"
                placeholder=""
                type={!showPassword ? "password" : "text"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <label className="absolute text-white text-md font-semibold duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#3bf8a0] peer-focus:dark:text-[#3bf8a0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">
                Mật khẩu<span className="text-red-600">*</span>
              </label>
              <div
                className="absolute inset-y-0 right-0 bottom-3 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-600 cursor-pointer" />
                ) : (
                  <GoEye className="text-gray-600 cursor-pointer" />
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => handleRegister()}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Đăng ký tài khoản
            </button>
          </div>
          <div className="text-center mt-4">
            <span
              className="text-[#3bf8a0] hover:underline cursor-pointer"
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

export default Register;
