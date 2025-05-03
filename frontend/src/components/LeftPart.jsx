import React, { useEffect } from "react";
import { useChatStore } from "../Store/useChatStore";
import SidebarSkeleton from "./Skeletons/SidebarSkeleton";
import { useAuthStore } from "../Store/useAuthStore";
import logo from "../assets/logo.png"; // Adjust the path as necessary
import userPicDummy from "../assets/placeholder-user.jpg";

const LeftPart = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } =
    useChatStore();
  const { authUser, setAuthUser, onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  useEffect(() => {
    setAuthUser(authUser);
  }, [setAuthUser]);

  const handleClick = (chat) => {
    console.log(chat);
    setSelectedUser(chat);
  };

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <div className="flex-1 mb-11 md:mb-0 h-screen md:h-screen overflow-y-auto">
      <div className="space-y-4 p-4">
        {/* Your profile */}
        <div className="flex justify-between items-center mt-2 space-x-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200">
              <img
                src={authUser?.data?.profilePicture || userPicDummy}
                alt="Your profile"
                className="aspect-square h-full w-full object-cover"
              />
            </div>
            <div className="max-w-[100px]">
              <h3 className="text-xs font-semibold truncate whitespace-nowrap overflow-hidden">
                {authUser?.data?.name}
              </h3>
              <p className="text-xs text-gray-500 truncate whitespace-nowrap overflow-hidden">
                {authUser?.data?.email}
              </p>
            </div>
          </div>

          {/* Profile or Logout button (visible only on mobile) */}
          <div className="md:flex justify-between items-center space-x-7">
            <img src={logo} alt="" className="h-12 md:h-10 w-auto" />
          </div>
        </div>

        {/* Recent conversations */}
        <div className="space-y-2">
          <h4 className="text-xs  font-semibold uppercase text-gray-500">
            Recent Conversations
          </h4>

          {users.map((chat) => (
            <div
              key={chat._id}
              className={`flex items-center space-x-4 rounded-lg p-2 hover:bg-gray-100 cursor-pointer ${
                selectedUser?._id === chat._id ? "bg-gray-200" : ""
              }`}
              onClick={() => handleClick(chat)}
            >
              <div className="relative h-10 w-10 shrink-0">
                {/* Avatar circle */}
                <div className="overflow-hidden rounded-full bg-gray-100 h-full w-full">
                  {chat.profilePicture ? (
                    <img
                      src={chat.profilePicture}
                      alt={chat.name || "User"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-gray-600">
                      {chat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Green online dot */}
                {onlineUsers.includes(chat._id) && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white z-10" />
                )}
              </div>

              <div className="flex-1 overflow-hidden">
                <h5 className="text-sm font-semibold">{chat.name}</h5>
                <p className="truncate text-xs text-gray-500">
                  {chat.lastMessage || "No message"}
                </p>
              </div>

              <div className="text-right text-xs text-gray-500 whitespace-nowrap">
                {chat.lastMessageTime &&
                  new Date(chat.lastMessageTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftPart;
