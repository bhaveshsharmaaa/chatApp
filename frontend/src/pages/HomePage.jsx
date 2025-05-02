import React from "react";
import { useChatStore } from "../Store/useChatStore";
import LeftPart from "../components/LeftPart";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/SideBar";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col h-screen md:flex-row">
        <div className={`${selectedUser ? "hidden md:block" : "block"} `}>
          <Sidebar />
        </div>

        {/* LeftPart - visible on desktop or when no chat selected on mobile */}
        <div
          className={`border-b md:border-r border-gray-200 ${
            selectedUser ? "hidden md:block" : "block"
          } w-full md:w-[25%]`}
        >
          <LeftPart />
        </div>

        {/* Chat Area - visible when a chat is selected */}
        <div
          className={`${
            selectedUser ? "block" : "hidden md:block"
          } w-full md:w-[75%] items-center justify-center`}
        >
          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
