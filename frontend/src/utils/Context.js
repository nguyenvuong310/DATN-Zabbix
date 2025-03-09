import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { sendMsgToAI } from "./OpenAi";
import {
  getChatSessions,
  getConversationByChatSessionId,
  postChatSession,
  postConversation,
} from "../services/chatService";
import { toast } from "react-toastify";
import { getBankByUserId } from "../services/bankService";
import { useDispatch, useSelector } from "react-redux";
import customizeDataBank, {
  cleanJsonDataBank,
  jsonDataBank,
} from "./gptCustomize";
import { getSuggestions, putThreadId } from "../services/apiService";
import { updateThreadIdSuccess } from "../redux/action/userAction";
import { useNavigate } from "react-router-dom";
import { sampleQuestions } from "./sampleQuestions";
import { set } from "nprogress";

export const ContextApp = createContext();

// Debounce function
const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const AppContext = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.user.account);
  const [showSlide, setShowSlide] = useState(false);
  const [Mobile, setMobile] = useState(false);
  const [bankInfo, setBankInfo] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatSessionId, setChatSessionId] = useState(0);
  const [selectedModel, setSelectedModel] = useState("BankGPT Plus 3.5");
  const [selectedTime, setSelectedTime] = useState("Từ Hôm nay");
  const [selectBankId, setSelectedBankId] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [chatValue, setChatValue] = useState("");
  const [message, setMessage] = useState([]);
  const [chatSessions, setChatSessions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const msgEnd = useRef(null);

  useEffect(() => {
    if (msgEnd === null || msgEnd.current === null) return;
    if (msgEnd !== null && msgEnd.current !== null) {
      msgEnd.current.scrollIntoView();
    }
  }, [message]);

  // Debounced function for API call
  const debounceGetSuggestions = useCallback(
    debounce(async (historyQuestion) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_FASTAPI_URL}predict-questions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              history_questions: historyQuestion,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const suggestions = data.suggest_questions;

        setSuggestions(suggestions);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300), // Adjust the debounce delay as needed
    []
  );

  const fetchBankInfo = useCallback(async () => {
    // function implementation
    const res = await getBankByUserId(account.id);
    if (res && res.message) {
      navigate("/");
      setBankInfo([]);
      return;
    }
    setBankInfo(res);
  }, []);

  const fetchChatSessionsByUserId = useCallback(async () => {
    // function implementation
    const res = await getChatSessions(account.id, 1, 100);
    if (res && res.length > 0) {
      setChatSessions(res);
    }
    if (res && res.message) {
      toast.error(res.message);
      return;
    }
  }, [chatSessionId]);

  useEffect(() => {
    fetchChatSessionsByUserId();
  }, [fetchChatSessionsByUserId, chatSessionId]);
  useEffect(() => {
    fetchBankInfo();
  }, [fetchBankInfo]);

  const regenerateAnswer = async () => {
    const res = await putThreadId(account.id);
    if (res && res.message) {
      toast.error(res.message);
      return;
    }
    if (res && res.startsWith("thread")) {
      dispatch(updateThreadIdSuccess(res));
    }
    let lastMsg = "";
    for (let i = message.length - 1; i >= 0; i--) {
      if (message[i].role === "user") {
        lastMsg = message[i].text;
        break;
      }
    }

    await handleSend(lastMsg, res);
    setError("");
  };

  const sendToGPT35 = async (msg, chatId) => {
    const response = await fetch(`${process.env.REACT_APP_FASTAPI_URL}stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: msg,
        dataBank: cleanJsonDataBank(bankInfo),
      }),
    });

    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();
    let completeMessage = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        let formData = {
          chatSessionId: chatId,
          message: completeMessage,
          role: "assistant",
          model: selectedModel,
        };
        await postConversation(formData);
        break;
      }
      completeMessage += value; // Lưu trữ dữ liệu
      setMessage((prevMessage) => {
        const newMessage = [...prevMessage];
        const lastMessage = newMessage[newMessage.length - 1];
        if (lastMessage && lastMessage.role === "assistant") {
          lastMessage.text += value;
        }
        return newMessage;
      });
    }
  };

  const sendToGemini = async (msg, chatId) => {
    const response = await fetch(`${process.env.REACT_APP_FASTAPI_URL}gemini`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: msg,
        dataBank: cleanJsonDataBank(bankInfo),
      }),
    });

    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    let completeMessage = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        let formData = {
          chatSessionId: chatId,
          message: completeMessage,
          role: "assistant",
          model: selectedModel,
        };
        await postConversation(formData);
        break;
      }
      completeMessage += value; // Lưu trữ dữ liệu
      setMessage((prevMessage) => {
        const newMessage = [...prevMessage];
        const lastMessage = newMessage[newMessage.length - 1];
        if (lastMessage && lastMessage.role === "assistant") {
          lastMessage.text += value;
        }
        return newMessage;
      });
    }
  };

  const sendToAssistantGPT = async (
    msg,
    previousMsg,
    chatId,
    newThreadId = ""
  ) => {
    const response = await fetch(
      `${process.env.REACT_APP_FASTAPI_URL}generate-4o`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: msg,
          dataBank: cleanJsonDataBank(bankInfo),
          thread_id: newThreadId === "" ? account.threadId : newThreadId,
        }),
      }
    );

    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    let arrMessage = [];
    let isFirst = true;
    let botMessage = {
      text: "",
      role: "assistant",
      model: selectedModel,
    };

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        await postConversation({
          message: botMessage.text,
          role: "assistant",
          chatSessionId: chatId,
          model: selectedModel,
          type: botMessage.type,
        });
        break;
      }

      if (value.startsWith("\nerror > ")) {
        const error = value.split("\nerror > ")[1];
        setError(error);
        toast.error(error);
        return;
      }

      if (value.indexOf("\ntext > ") !== -1) {
        const firstValue = value.split("\ntext > ")[1] || "";
        const previousValue = value.split("\ntext > ")[0] || "";
        if (isFirst) {
          botMessage.type = "text";
          botMessage.text += firstValue;
        }
        if (!isFirst) {
          botMessage.text += previousValue;
          await postConversation({
            message: botMessage.text + previousValue,
            role: "assistant",
            chatSessionId: chatId,
            model: selectedModel,
            type: botMessage.type,
          });
          arrMessage.push(botMessage);
          botMessage = {
            text: firstValue,
            role: "assistant",
            model: selectedModel,
            type: "text",
          };
        }
        isFirst = false;
        setMessage([...previousMsg, ...arrMessage, botMessage]);
        continue;
      } else if (value.indexOf("\nimage > ") !== -1) {
        if (isFirst) {
          botMessage.type = "image";
          botMessage.text += value.split("\nimage > ")[1] || "";
        }
        if (!isFirst) {
          await postConversation({
            message: botMessage.text,
            role: "assistant",
            chatSessionId: chatId,
            model: selectedModel,
            type: botMessage.type,
          });
          arrMessage.push(botMessage);
          botMessage = {
            text: value.split("\nimage > ")[1],
            role: "assistant",
            model: selectedModel,
            type: "image",
          };
        }
        isFirst = false;
        setMessage([...previousMsg, ...arrMessage, botMessage]);
        continue;
      } else if (value.indexOf("\ncode > ") !== -1) {
        if (isFirst) {
          botMessage.type = "code";
          botMessage.text += value.split("\ncode > ")[1] || "";
        }
        if (!isFirst) {
          await postConversation({
            message: botMessage.text,
            role: "assistant",
            chatSessionId: chatId,
            model: selectedModel,
            type: botMessage.type,
          });
          arrMessage.push(botMessage);
          botMessage = {
            text: value.split("\ncode > ")[1],
            role: "assistant",
            model: selectedModel,
            type: "code",
          };
        }
        isFirst = false;
        setMessage([...previousMsg, ...arrMessage, botMessage]);
        continue;
      }

      setMessage((prevMessage) => {
        const newMessage = [...prevMessage];
        const lastMessage = newMessage[newMessage.length - 1];
        if (lastMessage && lastMessage.role === "assistant") {
          lastMessage.text += value;
        }
        return newMessage;
      });
    }
  };
  // button Click function
  const handleSend = async (prompt, newThreadId = "") => {
    setSuggestions([]);
    let chatId = 0;
    if (message && message.length === 0) {
      // step 1: create chat session
      const res = await postChatSession({
        userId: account.id,
        title: prompt
          .replace(/\s+/g, " ")
          .trim()
          .split(" ")
          .slice(0, 5)
          .join(" "),
      });
      if (res && res.message) {
        toast.error("Không thể tạo phiên chat mới! Vui lòng thử lại sau!");
        return;
      }
      if (res && res.id) {
        chatId = res.id;
      }
    }
    const CHAT_SESSION_ID = chatId === 0 ? chatSessionId : chatId;
    const text = prompt.trim() || chatValue.trim();
    setChatValue("");
    const userMessage = {
      text,
      role: "user",
      model: selectedModel,
      type: "text",
    };
    await postConversation({
      message: text,
      role: "user",
      chatSessionId: CHAT_SESSION_ID,
      model: selectedModel,
    });
    setMessage([...message, userMessage]);

    // bank gpt
    if (selectedModel === "BankGPT") {
      const botMessage = {
        text: "",
        role: "assistant",
        model: selectedModel,
        type: "text",
      };
      setMessage([...message, userMessage, botMessage]);
      await sendToGemini(text, CHAT_SESSION_ID);
    }
    // await sendToGPT35(text);
    // bank gpt plus
    if (selectedModel === "BankGPT Plus 3.5") {
      const botMessage = {
        text: "",
        role: "assistant",
        model: selectedModel,
        type: "text",
      };
      setMessage([...message, userMessage, botMessage]);
      await sendToGPT35(text, CHAT_SESSION_ID);
    }
    if (selectedModel === "BankGPT Premium 4.0") {
      const tempMsg = [...message, userMessage];
      await sendToAssistantGPT(text, tempMsg, CHAT_SESSION_ID, newThreadId);
    }
    setChatSessionId(CHAT_SESSION_ID);
  };

  // Enter Click function
  const filterQuestions = (input) => {
    const filteredQuestions = sampleQuestions.filter((question) =>
      question.toLowerCase().includes(input)
    );
    setSuggestions(filteredQuestions);
  };

  const debounceFilterQuestions = useCallback(debounce(filterQuestions, 2000), [
    sampleQuestions,
  ]);
  const handleKeyPress = async (e) => {
    if (e.key === "@") {
      if (message.length > 1) {
        const historyQuestion = message
          .filter((msg) => msg.role === "user")
          .map((msg) => msg.text);
        debounceGetSuggestions(historyQuestion);
      }
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      autoGrow(e.target, true); // reset height of input send message
      setIsLoading(true);
      try {
        await handleSend(chatValue);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    } else {
      if (e.target.value.trim().length <= 0) {
        setSuggestions([]);
        return;
      }

      const input = e.target.value.trim().toLowerCase();
      debounceFilterQuestions(input);
    }
  };
  const autoGrow = (element, reset = false) => {
    if (reset === true) {
      element.style.height = "56px";
      return;
    }
    element.style.height = "56px";
    element.style.height = element.scrollHeight + "px";
  };

  // Query Click function
  const handleQuery = async (e, chatId) => {
    if (Mobile === true) {
      setMobile(false);
    }
    setChatSessionId(chatId);
    const res = await getConversationByChatSessionId(chatId);
    if (res && res.message) {
      toast.error(res.message);
      return;
    }
    setMessage([]);
    if (res && res.length > 0) {
      setMessage(
        res.map((msg, index) => {
          return {
            text: msg.message,
            role: msg.role,
            model: msg.model,
            type: msg.type,
          };
        })
      );
    }
  };
  return (
    <ContextApp.Provider
      value={{
        error,
        setError,
        isLoading,
        setIsLoading,
        showSlide,
        setShowSlide,
        selectedModel,
        chatSessionId,
        suggestions,
        setSuggestions,
        setChatSessionId,
        setSelectedModel,
        selectedTime,
        setSelectedTime,
        Mobile,
        setMobile,
        fetchChatSessionsByUserId,
        toDate,
        setToDate,
        fromDate,
        setFromDate,
        chatValue,
        setChatValue,
        autoGrow,
        handleSend,
        regenerateAnswer,
        message,
        setMessage,
        chatSessions,
        msgEnd,
        handleKeyPress,
        handleQuery,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
export default AppContext;
