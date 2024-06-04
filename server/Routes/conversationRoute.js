const express = require("express");
const router = express.Router();
const { conversationModal } = require("../models/ConversationModel");
const { userModal } = require("../models/UserModal");

// Create a new conversation
router.post("/conversation", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const senderName = await userModal.findById(senderId);
    const receiverName = await userModal.findById(receiverId);

    const newConversation = new conversationModal({
      members: [
        senderId,
        receiverId,
        { senderName: senderName.fullName },
        { receiverName: receiverName.fullName },
      ],
    });

    await newConversation.save();

    res.status(201).json({
      message: "New conversation created",
      data: {
        newConversation,
        fullName: receiverName.fullName,
        img: receiverName.image_Id,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error in creating conversation: ${error}` });
  }
});

// Get all conversations of a user
router.get("/conversation/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await conversationModal.find({
      members: { $in: [userId] },
    });

    const conversationUserData = await Promise.all(
      conversations.map(async (conversation) => {
        const receiverId = conversation.members.find(
          (member) => member !== userId
        );
        const user = await userModal.findById(receiverId);

        return {
          user: {
            receiverId: user._id,
            email: user.email,
            fullName: user.fullName,
            img: user.image_Id,
          },
          conversationId: conversation._id,
        };
      })
    );

    res.status(200).json(conversationUserData);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error in fetching conversations: ${error}` });
  }
});

module.exports = router;
