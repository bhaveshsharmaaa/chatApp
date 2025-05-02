import React from "react";
import { FaComments } from "react-icons/fa";

const NoChatSelected = () => {
  return (
    <div className="hidden md:flex h-screen flex-col items-center justify-center text-center px-4">
      <FaComments className="text-6xl text-black" />
      <h2 className="text-xl font-semibold">
        Select a chat to start messaging
      </h2>
    </div>
  );
};

export default NoChatSelected;
