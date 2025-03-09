import React, { useContext, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { LuPanelLeftClose } from "react-icons/lu";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { ContextApp } from "../../utils/Context";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Logo from "../../assets/alterLogo.png";
import { getChatSessions } from "../../services/chatService";
import { useNavigate } from "react-router-dom";
import "./LeftNav.scss";
import { RiHome4Line } from "react-icons/ri";
import { groupChatSessions } from "../../utils/dateGroup";
import OptionChatSession from "./OptionChatSession";
function LeftNav() {
  const navigate = useNavigate();
  const account = useSelector((state) => state.user.account);
  const {
    setShowSlide,
    showSlide,
    handleQuery,
    chatSessionId,
    setChatSessionId,
    setSelectedModel,
    setMessage,
    chatSessions,
  } = useContext(ContextApp);
  const [openOptionsId, setOpenOptionsId] = useState(null);
  const handleClickNewChat = () => {
    setSelectedModel("BankGPT Plus 3.5");
    setMessage([]);
    setChatSessionId(0);
  };
  const toggleOptions = (e, id) => {
    e.stopPropagation();
    setOpenOptionsId(openOptionsId === id ? null : id);
  };
  const { today, yesterday, previous7Days, previous30Days } =
    groupChatSessions(chatSessions);
  const renderChatSessions = (sessions, label) => (
    <div className="chat-section">
      {sessions.length > 0 && (
        <div className="chat-section-header">{label}</div>
      )}
      {sessions.map((chat) => (
        <span
          key={chat.id}
          id={chat.id}
          className={`rounded w-full py-3 px-2 text-xs my-2 flex items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300 overflow-hidden truncate whitespace-nowrap ${
            chatSessionId === chat.id ? "bg-gray-800" : ""
          }`}
          value={chat.id}
          onClick={(e) => handleQuery(e, chat.id)}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-2 items-center justify-center text-base">
              <FiMessageSquare size={20} />
              <span className="text-sm">{chat.title}</span>
            </div>
            <BsThreeDots
              onClick={(e) => {
                e.stopPropagation();
                toggleOptions(e, chat.id);
                // alert("Chức năng này đang được phát triển!");
              }}
              className="hover:bg-slate-400 rounded-full"
              size={18}
            />
          </div>
          {openOptionsId === chat.id && (
            <OptionChatSession
              openOptionsId={openOptionsId}
              onClose={() => setOpenOptionsId(null)}
            />
          )}
        </span>
      ))}
    </div>
  );

  return (
    // top section
    <div
      className={
        !showSlide
          ? "mobile-height bg-gray-900 w-[300px] border-r border-gray-500 hidden lg:flex items-center justify-between p-2 text-white flex-col translate-x-0"
          : "hidden"
      }
    >
      <div
        onClick={() => {
          navigate("/");
        }}
        className="flex flex-col py-2 w-full cursor-pointer mb-5 border-b border-gray-600"
      >
        <div className="flex items-center justify-start pl-2">
          <img
            src={Logo}
            alt="user"
            className="w-14 h-14 object-cover rounded-sm"
          />
          <span className="text-lg font-bold p-2">BankGPT</span>
        </div>
        {/* <div className="flex m-2 hover:bg-gray-800 gap-4 justify-start items-center pl-6">
          <RiHome4Line size={20} />
          <div className="text-sm font-semibold p-2">Trang chủ</div>
        </div> */}
      </div>

      <div className="flex items-start justify-between w-full">
        <span
          className="border border-gray-600  rounded w-[80%] py-2 text-xs flex gap-1 items-center justify-center cursor-pointer"
          onClick={handleClickNewChat}
        >
          <AiOutlinePlus fontSize={18} />
          Đoạn chat mới
        </span>
        <span
          className="border border-gray-600  rounded px-3 py-[9px] flex items-center justify-center cursor-pointer"
          title="Close sidebar"
          onClick={() => setShowSlide(!showSlide)}
        >
          <LuPanelLeftClose />
        </span>
      </div>

      {/* middle section  */}
      <div className="h-[80%] w-full p-2 overflow-hidden overflow-y-auto text-sm scroll my-2">
        {chatSessions && chatSessions.length === 0 && (
          <div>Bạn chưa có phiên chat nào!</div>
        )}
        {chatSessions && chatSessions.length > 0 && (
          <>
            {renderChatSessions(today, "Hôm nay")}
            {renderChatSessions(yesterday, "Hôm qua")}
            {renderChatSessions(previous7Days, "7 Ngày trước")}
            {renderChatSessions(previous30Days, "30 Ngày trước")}
          </>
        )}
      </div>

      {/* bottom section  */}
      <div className="w-full border-t border-gray-600 flex flex-col gap-2 items-center justify-center p-2">
        <span
          onClick={() => {
            navigate("/userInfor");
          }}
          className="rounded w-full py-2 px-2 text-xs flex gap-1 items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300"
        >
          <span className="flex gap-1 items-center justify-center text-sm">
            <FiUser />
            Nâng cấp tài khoản
          </span>
          <span className="rounded-md bg-yellow-200 px-1.5 py-0.5 text-xs font-medium uppercase text-gray-800">
            MỚI
          </span>
        </span>
        <span
          onClick={() => {
            navigate("/userInfor");
          }}
          className="rounded w-full py-2 px-2 text-xs flex gap-1 items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300"
        >
          <span className="flex gap-2 items-center justify-center text-sm font-bold">
            <img
              src={account.avatar}
              alt="user"
              className="w-8 h-8 object-cover rounded-sm"
              referrerPolicy="no-referrer"
            />
            {account.name}
          </span>
          <span className="rounded-md  px-1.5 py-0.5 text-xs font-medium uppercase text-gray-500">
            <SlOptions />
          </span>
        </span>
      </div>
    </div>
  );
}

export default LeftNav;
