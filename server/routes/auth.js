const express = require("express");
const { signup, signin } = require("../controllers/auth.js");

const router = express.Router();

// CREATE A USER
// URL: /api/auth/register (or /signup if you prefer)
router.post("/register", signup); 

// SIGN IN
// URL: /api/auth/login
router.post("/login", signin); 

// GOOGLE AUTH (Placeholder for future)
// router.post("/google", googleAuth)

module.exports = router;