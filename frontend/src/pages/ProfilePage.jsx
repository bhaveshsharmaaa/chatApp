import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { useAuthStore } from "../Store/useAuthStore";
import userImage from "../assets/user.jpg";
import Sidebar from "../components/SideBar";

export default function ProfilePage() {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64String = reader.result;
      setSelectedImage(base64String);
      await updateProfile({ profilePicture: base64String });
    };
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar - collapses below md */}
      <div className="">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-2xl">
          {/* Profile Image and Info */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <img
                src={
                  selectedImage || authUser?.data?.profilePicture || userImage
                }
                alt="User DP"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-md object-cover"
              />

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                onChange={handleImageChange}
                disabled={isUpdatingProfile}
                className="hidden"
              />

              {/* Edit Button */}
              <button
                onClick={() => document.getElementById("fileInput").click()}
                disabled={isUpdatingProfile}
                className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 shadow-md"
              >
                <FiEdit2 size={16} />
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mt-4 text-gray-800 capitalize text-center">
              {authUser?.data?.name.replace("_", " ")}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base text-center">
              {authUser?.data?.email}
            </p>
            <p className="text-xs text-gray-400 mt-1 text-center">
              Joined on{" "}
              {new Date(authUser?.data?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Divider and Info */}
          <div className="border-t mt-8 pt-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 text-center sm:text-left">
              Account Information
            </h3>
            <div className="space-y-4 text-gray-600 text-sm sm:text-base">
              <div className="flex justify-between items-center">
                <span className="font-medium">Username</span>
                <span>{authUser?.data?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Email</span>
                <span>{authUser?.data?.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Member Since</span>
                <span>
                  {new Date(authUser?.data?.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
