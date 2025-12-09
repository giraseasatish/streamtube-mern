const router = require("express").Router();
const Comment = require("../models/Comment");
const Video = require("../models/Video");
const verifyToken = require("../middleware/verifyToken");

// ADD COMMENT
// URL: /api/comments
// Method: POST
router.post("/", verifyToken, async (req, res) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// SIMPLER DELETE (Comment Owner only) for testing // need to add complex one later deleting based on any comment by author  
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (req.user.id === comment.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      return res.status(403).json("You can delete only your comment!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET COMMENTS
// URL: /api/comments/:videoId
// Method: GET (Public)
router.get("/:videoId", async (req, res) => {
  try {
    // Find all comments where videoId matches the URL param
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;