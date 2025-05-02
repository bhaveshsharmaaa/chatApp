import cloudinary from "../lib/cloudinary.js";
import { getRecieverId, io } from "../lib/socket.js";
import Message from "../models/messages.model.js";
import User from "../models/user.models.js";
import { generateStreamToken } from "../lib/stream.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const myId = req.user._id;

    const otherUsers = await User.find({ _id: { $ne: myId } }).select(
      "-password"
    );

    const usersWithLastMessages = await Promise.all(
      otherUsers.map(async (user) => {
        const lastMessage = await Message.findOne({
          $or: [
            { senderId: myId, receiverId: user._id },
            { senderId: user._id, receiverId: myId },
          ],
        })
          .sort({ createdAt: -1 })
          .limit(1);

        const sendCallText = "";

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          sendCallText: sendCallText,
          lastMessage:
            lastMessage?.text || (lastMessage?.image ? "📷 Photo" : null),
          lastMessageType: lastMessage?.image ? "image" : "text",
          lastMessageTime: lastMessage?.createdAt || null,
        };
      })
    );

    res.status(200).json(usersWithLastMessages);
  } catch (error) {
    console.log("Error in getUsersForSidebar", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userTochatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userTochatId },
        { senderId: userTochatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    if (!text && !image) {
      return res.status(400).json({
        success: false,
        message: "Please provide text or image",
      });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message({
      senderId,
      receiverId,
      text: text,
      image: imageUrl,
    });
    await newMessage.save();

    //todo real time message goes here->socket.io

    const receiverSocketId = getRecieverId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export async function getStreamToken(req, res) {
  try {
    const token = generateStreamToken(req.user._id);

    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
