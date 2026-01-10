const express = require("express");
const {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  trend,
  random,
  sub,
  getByTag,
  search,
} = require("../controllers/video.js"); // Ensure this path matches the file above
const { verifyToken } = require("../middleware/verifyToken.js"); // Ensure path to middleware

const router = express.Router();

// create a video
router.post("/", verifyToken, addVideo);

// update a video
router.put("/:id", verifyToken, updateVideo);

// delete a video
router.delete("/:id", verifyToken, deleteVideo);

// get a video (Public)
router.get("/find/:id", getVideo);

// update view count (Public)
router.put("/view/:id", addView);

// get trending videos
router.get("/trend", trend);

// get random videos
router.get("/random", random);

// get subscribed videos
router.get("/sub", verifyToken, sub);

// get videos by tag
router.get("/tags", getByTag);

// search videos
router.get("/search", search);

module.exports = router;
