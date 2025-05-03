import React, { useRef, useState } from "react";
import { useChatStore } from "../Store/useChatStore";
import EmojiPicker from "emoji-picker-react";
import { Image, Send, SmilePlus, X } from "lucide-react";
import toast from "react-hot-toast";

const ChatInput = () => {
  const [emoji, setEmoji] = useState(false);
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { getUsers, sendMessages } = useChatStore();

  const onEmojiClick = (emojiObject) => {
    setText((prev) => prev + emojiObject.emoji);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setImagePreview(null);
    if (!text.trim() && !imagePreview) return;

    try {
      // Send the message (text or image)
      await sendMessages({
        text: text.trim(),
        image: imagePreview,
      });

      // Trigger a re-fetch of users and messages
      getUsers();

      // Reset input fields
      setText("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div
      className={`transition-all duration-300 ${
        imagePreview ? "h-[22%]" : "h-[10%]"
      } border-t border-gray-200 p-4 relative bg-white flex flex-col`}
    >
      {emoji && (
        <div className="absolute bottom-20 left-0 z-10">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}

      {/* Image preview section */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* Message and file input form */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center space-x-2"
      >
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md h-10 w-10"
          onClick={() => setEmoji(!emoji)}
        >
          <SmilePlus className="h-5 w-5" />
        </button>

        <input
          type="text"
          className="flex h-10 w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <button
          type="button"
          className={`sm:flex btn btn-circle ${
            imagePreview ? "text-emerald-500" : "text-zinc-400"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={20} />
        </button>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-blue-500 text-white h-10 w-10"
          disabled={!text.trim() && !imagePreview}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
