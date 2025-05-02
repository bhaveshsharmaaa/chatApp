import React from "react";

const ChatSkeleton = () => {
  return (
    <main className="h-screen w-full flex flex-col animate-pulse">
      {/* Header shimmer */}
      <header className="h-[10%] flex items-center justify-between border-b border-gray-200 bg-white px-4">
        <div className="flex items-center space-x-4">
          <div className="h-6 w-6 bg-gray-300 rounded-full" />
          <div className="h-10 w-10 bg-gray-300 rounded-full" />
          <div className="space-y-2">
            <div className="h-3 w-24 bg-gray-300 rounded" />
            <div className="h-2 w-16 bg-gray-300 rounded" />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-gray-300 rounded-md" />
          <div className="h-10 w-10 bg-gray-300 rounded-md" />
          <div className="h-10 w-10 bg-gray-300 rounded-md" />
        </div>
      </header>

      {/* Message bubbles shimmer */}
      <div className="h-[80%] overflow-y-auto p-4 bg-gray-50 space-y-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`flex ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div className="rounded-lg p-3 max-w-xs bg-gray-300 w-40 h-6" />
          </div>
        ))}
      </div>

      {/* Input shimmer */}
      <div className="h-[10%] border-t p-4 bg-white flex items-center space-x-2">
        <div className="h-10 w-10 bg-gray-300 rounded-md" />
        <div className="flex-1 h-10 bg-gray-300 rounded-md" />
        <div className="h-10 w-10 bg-gray-300 rounded-md" />
      </div>
    </main>
  );
};

export default ChatSkeleton;
