import React from "react";
import { useEffect } from "react";
import { useAuthStore } from "./Store/useAuthStore";
import { LoaderCircle } from "lucide-react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import "./index.css";
import HomePage from "./pages/HomePage";
import VideoCallUI from "./pages/VideoCall";
import { getStreamToken } from "./lib/utils";
import NotFound from "./pages/NotFound";

const App = () => {
  const { onlineUsers, authUser, checkAuth, isCheckingAuth, getAuthUser } =
    useAuthStore();

  useEffect(() => {
    checkAuth();
    getAuthUser();
    getStreamToken();
    console.log("Online Users:", { onlineUsers });
    console.log("Auth User:", getAuthUser);
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) {
    return (
      <div>
        <LoaderCircle />
      </div>
    );
  }

  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/"} />}
        />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/videocall/:id"
          element={authUser ? <VideoCallUI /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
