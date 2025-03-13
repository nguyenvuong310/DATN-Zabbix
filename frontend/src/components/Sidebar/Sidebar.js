// src/Sidebar.js
import React, { useState, useRef, useEffect } from "react";
import {
  FaCreditCard,
  FaChartBar,
  FaCog,
  FaBell,
  FaRegUserCircle,
} from "react-icons/fa";
import { BsChatRightDots } from "react-icons/bs";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ toggleSidebar }) => {
  const [activeButton, setActiveButton] = useState(0);
  const [circleStyle, setCircleStyle] = useState({});
  const buttonRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const bankAccounts = useSelector((state) => state.banks.bankAccounts);
  const [tooltip, setTooltip] = useState({
    show: false,
    label: "",
    x: 0,
    y: 0,
  });
  const sidebarRef = useRef(null);

  const buttons = [
    {
      icon: <HiOutlineViewGridAdd className="text-white text-2xl" />,
      key: 0,
      path: "/",
      label: "Dashboard",
    },
    // { icon: <BsChatRightDots className="text-white text-2xl" />, key: 1, path: '/chat', label: 'Chat' },
    // {
    //   icon: <FaCreditCard className="text-white text-2xl" />,
    //   key: 2,
    //   path: "/bank",
    //   label: "Ngân hàng",
    // },
    // {
    //   icon: <FaChartBar className="text-white text-2xl" />,
    //   key: 3,
    //   path: "/statistic",
    //   label: "Biểu đồ",
    // },
    {
      icon: <FaRegUserCircle className="text-white text-2xl" />,
      key: 4,
      path: "/userInfor",
      label: "Tài khoản",
    },
    {
      icon: <FaBell className="text-white text-2xl" />,
      key: 5,
      path: "/notification",
      label: "Thông báo",
    },
    {
      icon: <FaCog className="text-white text-2xl" />,
      key: 6,
      path: "/setting",
      label: "Cài đặt",
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const activeButtonIndex = buttons.findIndex(
      (button) =>
        button.path === currentPath ||
        (button.path === "/bank" && currentPath.startsWith("/transaction")) ||
        (button.path === "/chat" && currentPath.startsWith("/chatrequire"))
    );
    setActiveButton(activeButtonIndex !== -1 ? activeButtonIndex : 0);
  }, [location.pathname]);

  useEffect(() => {
    const updateCirclePosition = () => {
      if (buttonRefs.current[activeButton]) {
        const activeButtonElement = buttonRefs.current[activeButton];
        const { offsetTop, offsetHeight, offsetWidth } = activeButtonElement;
        setCircleStyle({
          top: `${offsetTop}px`,
          height: `${offsetHeight}px`,
          width: `${offsetWidth}px`,
        });
      }
    };

    updateCirclePosition();
    window.addEventListener("resize", updateCirclePosition);
    return () => window.removeEventListener("resize", updateCirclePosition);
  }, [activeButton]);

  const handleButtonClick = (index, path) => {
    if (path === "/chat") {
      if (isAuthenticated && bankAccounts.length > 0) {
        navigate("/chat");
      } else {
        navigate("/chatrequire");
      }
    } else {
      navigate(path);
    }
    setActiveButton(index);
    if (toggleSidebar) {
      toggleSidebar();
    }
  };

  const handleMouseEnter = (label, index) => {
    const sidebarRect = sidebarRef.current.getBoundingClientRect();
    const buttonRect = buttonRefs.current[index].getBoundingClientRect();
    setTooltip({
      show: true,
      label,
      x: buttonRect.left - sidebarRect.left + buttonRect.width / 2,
      y: buttonRect.top - sidebarRect.top + buttonRect.height + 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, label: "", x: 0, y: 0 });
  };

  return (
    <div
      ref={sidebarRef}
      className="relative flex flex-col self-center p-4 space-y-6 bg-gray-800 rounded-full"
    >
      <div
        className="absolute transition-all duration-300 ease-in-out bg-green-600 rounded-full"
        style={circleStyle}
      ></div>
      {buttons.map((button, index) => (
        <button
          key={index}
          ref={(el) => (buttonRefs.current[index] = el)}
          className="relative p-3 rounded-full max-sm:flex max-sm:items-center max-sm:space-x-3"
          onClick={() => handleButtonClick(index, button.path)}
          onMouseEnter={() => handleMouseEnter(button.label, index)}
          onMouseLeave={handleMouseLeave}
        >
          {button.icon}
          <span className="text-white text-lg hidden max-sm:inline">
            {button.label}
          </span>
        </button>
      ))}
      {tooltip.show && (
        <div
          className="absolute px-2 py-1 text-sm font-semibold font-be-vietnam-pro text-white bg-gray-800 rounded-md z-50"
          style={{ top: tooltip.y - 34, left: tooltip.x }}
        >
          {tooltip.label}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
