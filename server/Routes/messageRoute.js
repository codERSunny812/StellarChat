const express = require("express");
const router = express.Router();
const { messageModal } = require("../models/message.modal");
const { userModal } = require("../models/user.modal");
const { conversationModal } = require("../models/conversation.model");

// Send a new message
router.post("/message", async (req, res) => {
  try {
    const { conversationId, senderId, message, receiverId } = req.body;

    if (!senderId || !message) {
      return res.status(400).json({
        message: "Please fill all the required fields (senderId, message)",
      });
    }

    const senderName = await userModal.findById(senderId);
    const receiverName = await userModal.findById(receiverId);

    if (!conversationId && receiverId) {
      const newConversation = new conversationModal({
        members: [
          senderId,
          receiverId,
          { senderName: senderName.fullName },
          { receiverName: receiverName.fullName },
        ],
      });
      await newConversation.save();

      const newMessage = new messageModal({
        conversationId: newConversation._id,
        senderId,
        message,
      });
      await newMessage.save();

      return res.status(201).json({
        message: "New conversation and message created",
        data: {
          conversationId: newConversation._id,
          messageId: newMessage._id,
        },
      });
    } else if (conversationId) {
      const newMessage = new messageModal({
        conversationId,
        senderId,
        message,
        receiverId,
        img: receiverName.image_Id,
      });
      await newMessage.save();

      return res.status(201).json({
        message: "Message sent successfully",
        data: {
          conversationId,
          messageId: newMessage._id,
          senderUserName: senderName.fullName,
          receiverUserName: receiverName.fullName,
          img: receiverName.image_Id,
        },
      });
    } else {
      return res
        .status(400)
        .json({ message: "Conversation ID or Receiver ID is required" });
    }
  } catch (error) {
    res.status(500).json({ message: `Error in sending message: ${error}` });
  }
});

// Get messages of a conversation
router.get("/message/:conversationId", async (req, res) => {
  try {
    const { conversationId } = req.params;

    if (!conversationId)
      return res.status(400).json({ message: "Conversation ID is required" });

    const messages = await messageModal.find({ conversationId });
    res
      .status(200)
      .json({ message: "Messages retrieved successfully", data: messages });
  } catch (error) {
    res.status(500).json({ message: `Error in fetching messages: ${error}` });
  }
});

module.exports = router;
