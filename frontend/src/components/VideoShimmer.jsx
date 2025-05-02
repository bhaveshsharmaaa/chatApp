import React, { useState } from "react";
import { CameraOff, MicOff, Share, PhoneOff } from "lucide-react";
import toast from "react-hot-toast";

const VideoShimmer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    toast(isMuted ? "Unmuted" : "Muted");
  };

  const handleCameraToggle = () => {
    setIsCameraOff(!isCameraOff);
    toast(isCameraOff ? "Camera On" : "Camera Off");
  };

  const handleScreenShareToggle = () => {
    setIsScreenSharing(!isScreenSharing);
    toast(
      isScreenSharing ? "Screen sharing stopped" : "Screen sharing started"
    );
  };

  const handleEndCall = () => {
    setCallEnded(true);
    toast("Call Ended");
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 h-screen">
      {/* Simmer effect / Loading screen */}
      {!callEnded && (
        <div className="absolute inset-0 flex justify-center items-center bg-black opacity-50 z-10">
          <span className="text-white text-2xl">Connecting...</span>
        </div>
      )}

      {/* Video Call Screens */}
      <div className="relative w-full max-w-4xl h-[80vh] bg-gray-800 rounded-lg overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full p-2 bg-black opacity-60">
          <div className="w-full h-full bg-gray-700 rounded-lg flex justify-center items-center">
            <span className="text-white">Participant 1</span>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-1/2 h-full p-2 bg-black opacity-60">
          <div className="w-full h-full bg-gray-700 rounded-lg flex justify-center items-center">
            <span className="text-white">Participant 2</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleMuteToggle}
          className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600"
        >
          <MicOff
            className={`w-6 h-6 ${isMuted ? "text-red-500" : "text-white"}`}
          />
        </button>

        <button
          onClick={handleCameraToggle}
          className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600"
        >
          <CameraOff
            className={`w-6 h-6 ${isCameraOff ? "text-red-500" : "text-white"}`}
          />
        </button>

        <button
          onClick={handleScreenShareToggle}
          className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600"
        >
          <Share
            className={`w-6 h-6 ${
              isScreenSharing ? "text-green-500" : "text-white"
            }`}
          />
        </button>

        <button
          onClick={handleEndCall}
          className="p-3 rounded-full bg-red-500 text-white hover:bg-red-400"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default VideoShimmer;
