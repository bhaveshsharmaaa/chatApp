import React from "react";
import { useChatStore } from "../Store/useChatStore";
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import { useAuthStore } from "../Store/useAuthStore";
import toast from "react-hot-toast";

const ChatHeader = () => {
  const { selectedUser, clearSelectedUser, sendMessages } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();

  const handleVideoCall = async () => {
    const userIds = [selectedUser._id, authUser?.data?._id].sort().join("-");
    const callUrl = `${window.location.origin}/videocall/${userIds}`;

    await sendMessages({
      text: `I've started a video call. Join me here: ${callUrl}`,
    });

    toast.success("Video call link sent successfully!");
  };
  return (
    <header className="h-[10%] py-1.5 flex items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center space-x-4">
        <ArrowLeft
          className="h-6 w-6 cursor-pointer"
          onClick={() => clearSelectedUser()}
        />
        <div className="relative flex h-10 w-10 overflow-hidden rounded-full">
          <img
            src={
              selectedUser?.profilePicture || "src/assets/placeholder-user.jpg"
            }
            alt={selectedUser?.name || "User"}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="max-w-[100px]">
          {" "}
          {/* Limit width to control overflow */}
          <h2 className="text-sm font-semibold truncate whitespace-nowrap overflow-hidden">
            {selectedUser?.name || "No User Selected"}
          </h2>
          <p className="text-xs text-gray-500 truncate whitespace-nowrap overflow-hidden">
            {onlineUsers?.includes(selectedUser?._id) && (
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-500"></span>
            )}
            {onlineUsers?.includes(selectedUser?._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleVideoCall}
          className="inline-flex items-center justify-center rounded-md h-10 w-10"
        >
          <Video className="h-5 w-5" />
        </button>
        <button className="inline-flex items-center justify-center rounded-md h-10 w-10">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
