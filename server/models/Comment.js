const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    // Anchor 1: Who wrote this?
    userId: {
      type: String,
      required: true,
    },
    // Anchor 2: Which video is this on?
    videoId: {
      type: String,
      required: true,
    },
    // The content
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);