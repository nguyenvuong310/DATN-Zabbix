import React, { useContext } from "react";
import { ContextApp } from "../../utils/Context";
import LogoBot from "../../assets/alterLogo.png";
import { useSelector } from "react-redux";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import style from "../../utils/markdown-styles.module.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

function ChatPreview({ message }) {
  const account = useSelector((state) => state.user.account);
  //   const { message, msgEnd } = useContext(ContextApp);

  return (
    <div className=" w-full sm:max-h-96 max-sm:max-h-60 flex items-center justify-center overflow-y-scroll px-2 py-1 scroll mb-10">
      <div className="w-full sm:max-h-96  max-sm:max-h-60 flex flex-col items-start justify-start">
        {message?.map((msg, i) => (
          <span
            key={i}
            className={
              msg.role == "assistant"
                ? "max-w-full flex items-start justify-center gap-2 lg:gap-5 my-2 bg-gray-800/80 p-3 rounded-md "
                : "w-full flex-row-reverse flex items-start justify-start gap-2 lg:gap-5 my-2 p-3"
            }
          >
            <img
              src={msg.role == "assistant" ? LogoBot : account?.avatar}
              alt={msg.role == "assistant" ? "bot" : "user"}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded object-cover"
            />
            {msg.type === "text" && (
              <Markdown
                className={style.reactMarkDown}
                remarkPlugins={[remarkGfm, remarkBreaks]}
                // className="text-white text-justify text-sm whitespace-pre-wrap"
              >
                {msg?.text}
              </Markdown>
            )}
            {msg.type === "code" && (
              <SyntaxHighlighter
                language="python"
                style={coldarkDark}
                customStyle={{
                  fontSize: "13px",
                  display: "block",
                  //   width: "40%",
                }}
              >
                {msg?.text}
              </SyntaxHighlighter>
            )}
            {msg.type === "image" && (
              <div className="w-full">
                <PhotoView src={msg.text} alt="">
                  {/* <ImageWithLoadingAndErrorHandling
                    src="msg.text"
                    alt="graph"
                  /> */}
                  <img
                    className="object-contain max-h-80 cursor-zoom-in"
                    src={msg.text}
                    alt="Đang xử lý..."
                  />
                </PhotoView>
              </div>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ChatPreview;
