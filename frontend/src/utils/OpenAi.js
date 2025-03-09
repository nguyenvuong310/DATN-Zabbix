import axios from "axios";
import AppContext from "./Context";
import { useContext } from "react";

const sendToGemini = async (msg) => {
  const API_URL = "https://free-gpt-api.vercel.app/v1/chat/completions";
  try {
    const response = await axios.post(
      "https://free-gpt-api.vercel.app/v1/chat/completions",
      {
        model: "gemini-1.5-flash",
        messages: [
          {
            role: "user",
            content: msg,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message?.content;
  } catch (error) {
    console.log(error);
  }
};

const sendToGPT4 = async (msg) => {
  const response = await fetch("http://127.0.0.1:8000/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: msg, dataBank: "" }),
  });

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    console.log(value);
  }
};

export const sendMsgToAI = async (msg, model) => {
  console.log(model);
  if (model === "BankGPT") {
    return await sendToGemini(msg);
  }
  if (model === "BankGPT Plus") {
    return await sendToGPT4(msg);
  }
};
