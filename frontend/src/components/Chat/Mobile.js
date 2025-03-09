import React, { useContext, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import { SlOptions } from "react-icons/sl";
import { MdClose } from "react-icons/md";
import { ContextApp } from "../../utils/Context";
import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { groupChatSessions } from "../../utils/dateGroup";
import "./LeftNav.scss";
import OptionChatSession from "./OptionChatSession";
function Mobile() {
  const navigate = useNavigate();
  const account = useSelector((state) => state.user.account);
  const {
    Mobile,
    setMobile,
    handleQuery,
    chatSessions,
    chatSessionId,
    setSelectedModel,
    setChatSessionId,
    setMessage,
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
    <div className="absolute left-0 top-0 w-full z-50  bg-black/40 flex justify-between items-start">
      <div
        className={
          Mobile
            ? "mobile-height bg-gray-900 w-[300px]  flex items-center justify-between p-2 text-white flex-col translate-x-0"
            : "hidden"
        }
      >
        <div className="flex flex-col gap-3 items-start justify-between w-full">
          <span
            className="border border-green-300  rounded w-full py-2 text-xs flex gap-1 items-center justify-center cursor-pointer font-semibold"
            onClick={() => {
              navigate("/");
            }}
          >
            <BiHome fontSize={18} />
            Về trang chủ
          </span>
          <span
            className="border border-cyan-700  rounded w-full py-2 text-xs flex gap-1 items-center justify-center cursor-pointer "
            onClick={handleClickNewChat}
          >
            <AiOutlinePlus fontSize={18} />
            Đoạn chat mới
          </span>
        </div>
        {/* middle section  */}
        <div className="h-[80%] w-full p-2 overflow-hidden overflow-y-auto text-sm scroll my-2">
          {/* msg  */}
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
      {Mobile && (
        <span
          className="border border-gray-600 text-white m-2 rounded px-3 py-[9px] flex items-center justify-center cursor-pointer"
          title="Close sidebar"
          onClick={() => setMobile(!Mobile)}
        >
          <MdClose />
        </span>
      )}
    </div>
  );
}

export default Mobile;
