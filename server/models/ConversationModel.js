const { mongoose } = require("mongoose");

// model to store data about the conversationbetween two user
const conversationSchema = mongoose.Schema({
  members: {
    type: Array,
    required: true,
  },
});

exports.conversationModal = mongoose.model(
  "conversationModal",
  conversationSchema
);
