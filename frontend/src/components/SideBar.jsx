import React from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function Sidebar() {
  const { logout } = useAuthStore();
  const location = useLocation();

  // Helper to highlight the active icon
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Sidebar for md+ screens */}
      <aside className="hidden md:flex h-screen w-14 bg-gray-100 border-r border-gray-200 shadow-md flex-col items-center justify-between py-8 space-y-8">
        <Link to={"/"}>
          <div className="text-2xl cursor-pointer font-bold text-black tracking-wide">
            C
          </div>
        </Link>

        <div className="flex flex-col justify-around space-y-8 mt-10">
          <Link to={"/profile"}>
            <button
              className={`${
                isActive("/profile") ? "text-blue-600" : "text-gray-600"
              } hover:text-blue-600 transition-colors duration-200`}
            >
              <FiUser size={24} />
            </button>
          </Link>
          <button
            onClick={() => logout()}
            className="text-gray-600 hover:text-red-500 transition-colors duration-200"
          >
            <FiLogOut size={24} />
          </button>
        </div>
      </aside>

      {/* Bottom bar for small screens */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-white border-t border-gray-200 py-2 px-6 shadow-md md:hidden">
        <Link to={"/"}>
          <button
            className={`flex flex-col items-center text-xs ${
              isActive("/") ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <IoChatbubbleEllipsesOutline size={20} />
            <span>Home</span>
          </button>
        </Link>
        <Link to={"/profile"}>
          <button
            className={`flex flex-col items-center text-xs ${
              isActive("/profile") ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <FiUser size={20} />
            <span>Profile</span>
          </button>
        </Link>
        <button
          onClick={() => logout()}
          className="flex flex-col items-center text-xs text-gray-600 hover:text-red-500"
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}
