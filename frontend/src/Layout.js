import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import HomePage from "./components/Home/HomePage";
import Login from "./components/Auth/Login";
import Banks from "./components/Bank/Banks";
import Statistic from "./components/Statistic/Statistic";
import UserInfor from "./components/Auth/UserInfor";
import Notification from "./components/Notifications/Notification";
import Setting from "./components/Else/Setting";
import TransactionScreen from "./components/Transactions/Transactions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Auth/Register";
import ChatPage from "./components/Chat/ChatPage";
import AppContext from "./utils/Context";
import ChatRequire from "./components/Sidebar/ChatRequire";

const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger">
      404. Not found data with current URL
    </div>
  );
};

const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="login" index element={<Login />} />
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          {/* Define additional routes corresponding to the sidebar buttons */}
          <Route path="bank" element={<Banks />} />
          <Route path="statistic" element={<Statistic />} />
          <Route path="userInfor" element={<UserInfor />} />
          <Route path="notification" element={<Notification />} />
          <Route path="setting" element={<Setting />} />
          <Route path="transaction/:id" element={<TransactionScreen />} />
          <Route path="chatrequire" element={<ChatRequire />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="register" element={<Register />} />
        <Route path="chat" element={<ChatPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Layout;
