import React, { useContext } from "react";
import LeftNav from "./LeftNav";
import ChatContainer from "./ChatContainer";
import Mobile from "./Mobile";
import AppContext, { ContextApp } from "../../utils/Context";
import NoChat from "./NoChat";
import "./ChatPage.scss";

function ChatPage() {
  return (
    <div className="full-height">
      <AppContext>
        <div className="flex w-screen relative">
          <LeftNav />
          <ChatContainer />
          <span className="flex lg:hidden">
            <Mobile />
          </span>
        </div>
      </AppContext>
    </div>
  );
}

export default ChatPage;
