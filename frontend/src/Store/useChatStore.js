import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  showChat: false,
  sidebarVisible: false,
  toggleSidebar: () =>
    set((state) => ({ sidebarVisible: !state.sidebarVisible })),
  closeSidebar: () => set({ sidebarVisible: false }),
  setSelectedUser: (user) => set({ selectedUser: user, showChat: true }),
  clearSelectedUser: () => set({ selectedUser: null, showChat: false }),

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users");
      console.log("API /messages/users response:", response.data); // <-- add this

      set({ users: response.data });
    } catch (error) {
      console.log("Error in getUsers", error);
      toast.error("Failed to fetch users.");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      console.log("API /messages/:id response:", response.data); // <-- add this
      set({ messages: response.data });
      const { messages } = get(); // <-- add this
      console.log("Messages:", messages); // <-- add this
    } catch (error) {
      console.log("Error in getMessages", error);
      toast.error("Failed to fetch messages.");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
