const { mongoose } = require("mongoose");

const messageSchema = mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  receiverId: {
    type: String,
  },
});

exports.messageModal = mongoose.model("messageModal", messageSchema);
