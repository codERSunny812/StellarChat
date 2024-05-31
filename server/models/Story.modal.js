
const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    userInfo: {
      type: mongoose.Schema.Types.ObjectId, //reference to user model
      ref: "userModal",
    },
  },
  { timestamps: true }
);

exports.StoryModel = mongoose.model("StoryModel", StorySchema);
