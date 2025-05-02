import React, { useEffect, useRef } from "react";
import { useChatStore } from "../Store/useChatStore";
import ChatSkeleton from "./Skeletons/ChatSkeleton";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { useAuthStore } from "../Store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

// Util: Convert text into clickable link JSX
const parseTextWithLinks = (text) => {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, index) =>
    part.match(/https?:\/\/[^\s]+/) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline break-words"
      >
        {part}
      </a>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessageLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
    subscribeToMessages();
    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessageLoading) return <ChatSkeleton />;

  return (
    <main className="h-screen w-full flex flex-col bg-white">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages?.map((message, index) => {
            const isSender = message.senderId === selectedUser._id;
            return (
              <div
                key={message._id || index}
                className={`flex ${isSender ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`flex items-end gap-2 max-w-xs ${
                    isSender ? "flex-row" : "flex-row-reverse"
                  }`}
                  ref={index === messages.length - 1 ? messageEndRef : null}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border">
                    <img
                      src={
                        isSender
                          ? selectedUser?.profilePicture || "/avatar.png"
                          : authUser?.data?.profilePicture || "/avatar.png"
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className={`break-words whitespace-pre-wrap rounded-lg p-3 max-w-[75%] w-fit ${
                      isSender
                        ? "bg-[white] text-black"
                        : "bg-[#DCF8C6] text-black"
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Sent media"
                        className="max-w-[100%] rounded-md mb-2"
                      />
                    )}
                    {message.text && (
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {parseTextWithLinks(message.text)}
                      </p>
                    )}
                    <span
                      className={`text-xs block mt-1 ${
                        isSender ? "text-[#B3B3B3]" : "text-[#999999]"
                      }`}
                    >
                      {formatMessageTime(message.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-shrink-0">
        <ChatInput />
      </div>
    </main>
  );
};

export default ChatContainer;
