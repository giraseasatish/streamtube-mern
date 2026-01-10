const express = require("express");
const {
  update,
  deleteUser,
  getUser,
  subscribe, 
  unsubscribe, 
  like,
  dislike,
} = require("../controllers/user.js"); 
const { verifyToken } = require("../middleware/verifyToken.js"); 

const router = express.Router();

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user (Public)
router.get("/find/:id", getUser);

//subscribe a user (Protected)
router.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a user (Protected)
router.put("/unsub/:id", verifyToken, unsubscribe);

//like a video (Protected)
router.put("/like/:videoId", verifyToken, like);

//dislike a video (Protected)
router.put("/dislike/:videoId", verifyToken, dislike);

module.exports = router;