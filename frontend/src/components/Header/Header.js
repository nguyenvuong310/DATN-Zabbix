import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { doLogout } from "../../redux/action/userAction";
import UserOptionButton from "./UserMenu";

const Header = () => {
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitles = {
    "/": "Dashboard",
    "/login": "Login",
    "/register": "Register",
    "/bank": "Ngân hàng của tôi",
    "/statistic": "Lịch sử biểu đồ",
    "/userInfor": "Tài khoản của tôi",
    "/notification": "Thông báo",
    "/setting": "Cài đặt",
    "/chat": "Chat",
    "/chatrequire": "Chat với ABC",
    "/transaction": "Các giao dịch",
    // Add more mappings as necessary
  };

  const pageSubtitles = {
    "/": "aa",
    "/login": "Please log in to access your account.",
    "/register": "Create a new account to get started.",
    "/bank": "Quản lý các tài khoản ngân hàng của bạn.",
    "/statistic":
      "Xem lịch sử biểu đồ thống kê và báo cáo tài chính dành cho bạn.",
    "/userInfor": "Thông tin cá nhân về tài khoản của bạn.",
    "/notification": "Các thông báo mới nhất từ hệ thống.",
    "/setting": "Cài đặt tài khoản và ứng dụng của bạn",
    "/chat": "Chat với ABC",
    "/chatrequire": "Trợ lý ảo tài chính thông minh của bạn",
    "/transaction": "Theo dõi các giao dịch của bạn.",
    // Add more mappings as necessary
  };

  let title = pageTitles[location.pathname] || "Page";
  let subtitle = pageSubtitles[location.pathname] || "";

  if (location.pathname.startsWith("/transaction")) {
    title = pageTitles["/transaction"];
    subtitle = pageSubtitles["/transaction"];
  }

  return (
    <header className="flex flex-row justify-between">
      <div className="max-sm:pl-3">
        <div className="text-white text-3xl font-be-vietnam-pro">{title}</div>
        {/* <div className="text-white font-be-vietnam-pro">{subtitle}</div> */}
      </div>
      <UserOptionButton />
    </header>
  );
};

export default Header;
