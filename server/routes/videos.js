const router = require("express").Router();
const Video = require("../models/Video");          // The Blueprint
const verifyToken = require("../middleware/verifyToken"); // The Bouncer
const User = require("../models/User");


// GET A VIDEO
// Method: GET
// URL: /api/videos/find/:id
router.get("/find/:id", async (req, res) => {            //  _id is videoId now and userId is of the owner  
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);      //use return for safe side
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET TRENDING VIDEOS
// Logic: Sort by "views" (Highest first)
router.get("/trend", async (req, res) => {
  try {
    // .sort({ views: -1 }) means: Sort by views, descending (-1)
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET RANDOM VIDEOS
// Logic: Fetch a random sample (MongoDB has a special tool called "aggregate")
router.get("/random", async (req, res) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET SUBSCRIBED VIDEOS
// URL: /api/videos/sub
router.get("/sub", verifyToken, async (req, res) => {
  try {
    // 1. Find the current logged-in user to see who they follow
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers; // This is the array of IDs

    // 2. Find videos for EVERY channel in the list
    // Promise.all: We have a list of channels. We need to run a database search for EACH one.
    // Promise.all runs them parallelly (at the same time) for speed.
    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    // 3. Format the result
    // .flat(): Promise.all gives us a list of lists [[vid1, vid2], [vid3]]. 
    //          We want one flat list [vid1, vid2, vid3].
    // .sort(): Sort by creation date (Newest first).
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    res.status(500).json(err);
  }
});


// ADD VIEW
// Method: PUT (Because we are updating the view count)
// URL: /api/videos/view/:id
router.put("/view/:id", async (req, res) => {
  try {
    // $inc (Increment) operator adds 1 to the 'views' field
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 }
    });
    res.status(200).json("The view has been increased.");
  } catch (err) {
    res.status(500).json(err);
  }
});


// SEARCH BY TAGS
// URL: /api/videos/tags?tags=js,python
router.get("/tags", async (req, res) => {
  const tags = req.query.tags.split(","); // Get tags from URL and split into array
  try {
    // Logic: Find videos where the "tags" array contains ANY of the tags in our list
    // $in is a MongoDB operator for "Match any in this list"
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
});

// SEARCH BY TITLE
// URL: /api/videos/search?q=funny
router.get("/search", async (req, res) => {
  const query = req.query.q; // Get the search word
  try {
    // Logic: Find videos where "title" matches the query
    // $regex: Allows partial matching (e.g., "Pyth" finds "Python")
    // $options: "i" means Case Insensitive (A = a)
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json(err);
  }
});


// CREATE A VIDEO
// Method: POST
// Middleware: verifyToken (Only logged-in users can do this)
router.post("/", verifyToken, async (req, res) => {
  // 1. Create the new Video object(for computer ram storage)(no try bcoz not for synchronous task)
  const newVideo = new Video({ 
    userId: req.user.id, // We get this ID securely from the Token!
    ...req.body          // We take title, desc, imgUrl, videoUrl from the input
  });

  try {               // try block for error handling task,slow task,asynchronous task. 
    // 2. Save to DB
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    res.status(500).json(err);     
  }
});

// UPDATE VIDEO
// Method: PUT (Used for editing data)
// URL: /api/videos/:id   (The ID tells us WHICH video to update)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    // 1. Find the video by the ID in the URL (/:id)
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json("Video not found!");

    // 2. CHECK OWNERSHIP
    // Does the video's owner ID match the logged-in user's ID?
    if (req.user.id === video.userId) {
      
      // 3. Update the video
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, // Update only the fields sent by user
        },
        { new: true } // Return the NEW updated version, not the old one
      );
      return res.status(200).json(updatedVideo);
    } else {
      // If IDs don't match, block them.
      return res.status(403).json("You can update only your video!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});           

// DELETE VIDEO
// Method: DELETE
// URL: /api/videos/:id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json("Video not found!");

    // CHECK OWNERSHIP
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      return res.status(200).json("The video has been deleted.");
    } else {
      return res.status(403).json("You can delete only your video!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;


