// App.js
import "./App.scss";
import Header from "./components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import Logo from "./assets/bestlogo.png";
import { doLogout } from "../src/redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react"; // Import useState
import PrivacyPolicyModal from "./components/Else/PrivacyPolicy";
import { PiSignOutBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";

const App = () => {
  const account = useSelector((state) => state.user.account);
  const isAuthenticaed = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility

  const handleLogout = () => {
    sessionStorage.removeItem("isPolicyShown"); // Clear the flag on logout
    dispatch(doLogout());
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* MOBILE SIDE BAR */}
      <div
        className="sm:hidden fixed top-12 left-0 rounded-tr-full rounded-br-full bg-white p-3 z-40"
        onClick={toggleSidebar}
      >
        <GiHamburgerMenu />
      </div>
      {/* {isAuthenticaed && <PrivacyPolicyModal userId={account.id} hasAccepted={account.policyAccepted} />} */}
      {/* MOBILE SIDE BAR */}
      <div
        className={`fixed inset-0 z-50 font-be-vietnam-pro transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:hidden`}
      >
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
        <div className="absolute flex flex-col justify-between inset-y-0 left-0 w-64 bg-gray-800 p-4 overflow-y-auto">
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3 ">
                <img src={Logo} alt="logo" className="w-10 h-10 rounded-full" />
                <p className="text-white text-xl">Menu</p>
              </div>
              <button onClick={toggleSidebar} className="text-white text-xl">
                <FaTimes />
              </button>
            </div>
            <Sidebar toggleSidebar={toggleSidebar} />
          </div>
          <button
            className="flex items-center space-x-2 ml-7 mt-2 mb-2"
            onClick={handleLogout}
          >
            <PiSignOutBold className="text-red-600 text-3xl font-bold"></PiSignOutBold>
            <p className="text-white font-semibold text-lg">Đăng xuất</p>
          </button>
        </div>
      </div>
      <div className="p-4 flex space-x-5 h-svh bg-black">
        {/* SIDE BAR */}
        <div className="flex flex-col max-sm:hidden justify-between sticky top-0 h-full">
          {/* LOGO */}
          <div className="relative flex max-sm:hidden place-self-center rounded-full bg-gray-800 w-full aspect-1">
            <img
              src={Logo}
              alt="logo"
              className="absolute p-2 inset-0 w-full h-full rounded-full object-cover"
            />
          </div>

          {/* SIDEBAR */}
          <Sidebar />

          {/* SIGN OUT */}
          <div className="flex flex-col place-self-center p-2 rounded-full bg-gray-800">
            <button onClick={handleLogout} className="p-3 rounded-full">
              <FaSignOutAlt className="text-red-600 text-xl" />
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col flex-1 space-y-3 overflow-auto">
          {/* HEADER */}
          <div className="flex-row pb-2 bg-black sticky top-0 z-10">
            <Header />
          </div>
          {/* MAIN CONTAINER */}
          <Outlet />
        </div>

        {/* PRIVACY */}
      </div>
    </>
  );
};

export default App;
