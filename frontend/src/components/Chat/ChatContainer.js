import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ContextApp } from "../../utils/Context";
import { LuPanelLeftOpen } from "react-icons/lu";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { RiSendPlane2Fill } from "react-icons/ri";
import { LuRefreshCw } from "react-icons/lu";
import Chat from "./Chat";
import Instruction from "./Instruction";
import DropdownChat from "./DropDownChat";
import { RiLoader2Fill } from "react-icons/ri";
import { HiOutlineLightBulb } from "react-icons/hi";
import DropdownTime from "./DropDownTimeOption";
import "./ChatPage.scss";
function ChatContainer() {
  const {
    setShowSlide,
    showSlide,
    setMobile,
    Mobile,
    chatValue,
    error,
    message,
    setError,
    suggestions,
    setSuggestions,
    setChatValue,
    handleSend,
    handleKeyPress,
    autoGrow,
    regenerateAnswer,
    isLoading,
    setIsLoading,
  } = useContext(ContextApp);

  const suggestionsRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (chatValue.trim() === "") {
      setSuggestions([]);
    }
  }, [chatValue]);

  const handleBlur = useCallback(
    (e) => {
      setTimeout(() => {
        if (suggestionsRef.current) {
          if (!suggestionsRef.current.contains(e.relatedTarget)) {
            setSuggestions([]);
          }
        }
      }, 100);
    },
    [setSuggestions]
  );

  return (
    <div
      className={
        showSlide
          ? "full-height w-screen bg-gray-700 flex items-start justify-between flex-col p-2"
          : "full-height w-full lg:w-[calc(100%-300px)] bg-gray-700 flex items-start justify-between max-sm:overflow-y-hidden flex-col p-2"
      }
    >
      <div className="flex flex-row justify-between items-center w-full my-2">
        <div className="flex justify-start items-center gap-3">
          <span
            className="rounded px-3 py-[9px] hidden lg:flex items-center justify-center cursor-pointer text-white m-1 hover:bg-gray-600 duration-200"
            title="Open sidebar"
            onClick={() => setShowSlide(!showSlide)}
          >
            {showSlide && <LuPanelLeftOpen size={28} />}
          </span>
          <span
            className="rounded px-0 py-[8px] lg:hidden flex items-center justify-center cursor-pointer text-white mt-0 mb-2 border border-gray-600"
            title="Open sidebar"
            onClick={() => setMobile(!Mobile)}
          >
            <HiOutlineMenuAlt2 fontSize={20} />
          </span>
          <DropdownChat />
        </div>
        {/* <div className="mr-4">
          <DropdownTime />
        </div> */}
      </div>

      {/* chat section */}
      {message.length > 0 ? <Chat /> : <Instruction />}
      {/* <Chat /> */}
      {/* chat input section */}
      <div className="w-full flex items-center justify-center flex-col gap-2">
        {error !== "" && (
          <div className="flex flex-row items-center gap-1 justify-center">
            <span className="text-red-400 font-semibold italic text-sm">
              {error}
            </span>
            <button
              onClick={regenerateAnswer}
              className="flex hover:bg-slate-600 items-center justify-center gap-2 px-2 py-1 text-white border border-spacing-1 rounded-lg"
            >
              <LuRefreshCw />
              <span className="text-sm">Regenerate</span>
            </button>
          </div>
        )}
        {!error && (
          <div className="flex gap-2 items-center justify-center bg-gray-600 rounded-lg shadow-md w-[90%] max-sm:w-[85%] lg:w-4/5 xl:w-3/4 relative">
            <div
              ref={suggestionsRef}
              className="absolute w-full bg-opacity-85 bottom-16 bg-gray-600 text-white rounded-lg shadow-xl max-h-56 overflow-y-auto z-10"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 italic border-dashed border-b border-gray-400 hover:bg-gray-500 cursor-pointer text-sm"
                  onMouseDown={() => setChatValue(suggestion)}
                  //   onClick={() => setChatValue(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
            <div className="absolute right-full mr-2">
              <button
                className="p-2 bg-blue-950 text-white rounded-full focus:outline-none"
                onClick={() => setVisible(!visible)}
              >
                <HiOutlineLightBulb color="yellow" />
              </button>
              {visible && (
                <div className="absolute bottom-full left-24 transform -translate-x-1/2 mt-2 w-48 p-2 bg-gray-800 text-white rounded shadow-lg text-justify text-xs">
                  Sau khi gửi câu hỏi đầu tiên, bạn có thể gõ '@' để BankGPT tự
                  động gợi ý câu hỏi tiếp theo liên quan.
                </div>
              )}
            </div>
            <textarea
              placeholder="Gửi một tin nhắn"
              className="overflow-y-scroll text-white bg-transparent px-3 py-4 w-full border-none outline-none resize-none overflow-hidden m-0 h-14 text-token-text-primary focus:ring-0 focus-visible:ring-0 max-h-52 text-sm"
              value={chatValue}
              onBlur={handleBlur}
              onChange={(e) => {
                autoGrow(e.target);
                setChatValue(e.target.value);
              }}
              onKeyUp={async (e) => {
                if (
                  isLoading === true ||
                  (chatValue.trim().length <= 0 && e.key === "Enter")
                ) {
                  return;
                }
                await handleKeyPress(e);
              }}
            ></textarea>
            {isLoading ? (
              <RiLoader2Fill
                className="animate-spin mx-3 text-gray-400"
                size={30}
              />
            ) : (
              <RiSendPlane2Fill
                title="send message"
                className={
                  chatValue.trim().length <= 0
                    ? "text-gray-400 cursor-auto mx-3 text-xl"
                    : "text-white cursor-pointer mx-3 text-3xl bg-green-500 p-1 rounded shadow-md"
                }
                onClick={async () => {
                  if (chatValue.trim().length <= 0 || isLoading === true) {
                    return;
                  }
                  setIsLoading(true);
                  try {
                    await handleSend(chatValue);
                  } catch (error) {
                    setIsLoading(false);
                  } finally {
                    setIsLoading(false);
                  }
                }}
              />
            )}
          </div>
        )}

        <p className="lg:text-xs text-gray-400 text-center text-[10px]">
          BankGPT có thể mắc lỗi. Hãy kiểm tra các thông tin quan trọng.
        </p>
      </div>
    </div>
  );
}

export default ChatContainer;
