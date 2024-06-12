const { mongoose } = require("mongoose");

// model to store the message and thier data between two people
const messageSchema = mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  message:{
    type: String,
  },
  receiverId: {
    type: String,
  },
  img: {
    type: String,
  },
});

exports.messageModal = mongoose.model("messageModal", messageSchema)
