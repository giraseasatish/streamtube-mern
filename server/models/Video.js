const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    // 1. RELATIONSHIP (The Foreign Key)
    // We store the User's ID here so we know WHO uploaded this.
    userId: {
      type: String,
      required: true,
    },
    
    // 2. BASIC DETAILS
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    
    // 3. MEDIA FILES
    // We don't store the actual video file in the database (too heavy).
    // We store the URL (Link) to where the file lives in the cloud.
    imgUrl: {
      type: String,
      required: true, // Thumbnail
    },
    videoUrl: {
      type: String,
      required: true, // Actual Video
    },
    
    // 4. METRICS & ENGAGEMENT
    views: {
      type: Number,
      default: 0, // Starts at 0
    },
    tags: {
      type: [String], // Array of strings: ["tech", "coding"]
      default: [],
    },
    likes: {
      type: [String], // Array of User IDs who liked it
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);