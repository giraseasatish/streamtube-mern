const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUsers: {
      type: [String],
      default: [],
    },
    // --- ADD THESE TWO NEW FIELDS ---
    likedVideos: {
      type: [String],
      default: [],
    },
    dislikedVideos: {
      type: [String],
      default: [],
    },
    // --------------------------------
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);