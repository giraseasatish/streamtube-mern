const router = require("express").Router();
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");
const Video = require("../models/Video"); // <--- ADD THIS LINE

// UPDATE USER
// Method: PUT
router.put("/:id", verifyToken, async (req, res) => {
  // Logic: You can only update your OWN account
  if (req.user.id === req.params.id) {
    try {
      // { new: true } returns the updated data
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

// DELETE USER
// Method: DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

// GET A USER
// Method: GET (Public - anyone can see a profile)
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    // --- SANITIZATION LOGIC ADDED ---
    const { password, ...other } = user._doc; 
    
    // Send only the clean data
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// SUBSCRIBE A USER
// Method: PUT (Updating lists)
// URL: /api/users/sub/:id (The ID of the channel we want to subscribe to)
router.put("/sub/:id", verifyToken, async (req, res) => {
  try {
    // 1. Find the User (Channel) we want to sub to
    // 2. Find Current User (Me)
    
    // Update Channel: Increase subscriber count
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });

    // Update Me: Add their ID to my subscribed list
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });

    res.status(200).json("Subscription successful.");
  } catch (err) {
    res.status(500).json(err);
  }
});

// UNSUBSCRIBE A USER
// Method: PUT
router.put("/unsub/:id", verifyToken, async (req, res) => {
  try {
    // Update Channel: Decrease subscriber count
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });

    // Update Me: Remove their ID from my list
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });

    res.status(200).json("Unsubscription successful.");
  } catch (err) {
    res.status(500).json(err);
  }
});


// LIKE A VIDEO
// URL: /api/users/like/:videoId
router.put("/like/:videoId", verifyToken, async (req, res) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    // Logic:
    // 1. $addToSet: Add my ID to 'likes' ONLY if it's not there already.
    // 2. $pull: Remove my ID from 'dislikes' if it was there.
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("The video has been liked.");
  } catch (err) {
    res.status(500).json(err);
  }
});

// DISLIKE A VIDEO
// URL: /api/users/dislike/:videoId
router.put("/dislike/:videoId", verifyToken, async (req, res) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("The video has been disliked.");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;