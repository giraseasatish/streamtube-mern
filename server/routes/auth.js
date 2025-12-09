const router = require("express").Router();
const User = require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

// REGISTER sign up API
router.post("/register", async (req, res) => {
  try{
    const salt= await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
     
    // SANITIZE & SEND
    // Remove the password hash before sending data back.
    const savedUser = await newUser.save();
    const { password,...other}=savedUser._doc;
    res.status(201).json({
      message:"User created successfully",
      ...other});
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN ROUTE sign in API
router.post("/login", async (req, res) => {
  try {
    // 1. FIND USER
    // We search the database for a user with this email.
    const user = await User.findOne({ email: req.body.email });
    
    // Logic: If no user exists with that email, stop and return error.
    if (!user) return res.status(404).json("User not found!");

    // 2. CHECK PASSWORD
    // We use bcrypt to compare the "Input Password" vs the "Database Hash".
    // bcrypt does the math to see if they match, even though one is hashed.
    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    // Logic: If password doesn't match, stop and return error.
    if (!isCorrect) return res.status(400).json("Wrong Credentials!");

    // 3. GENERATE TOKEN (The Digital ID Card)
    // We create a token that contains the user's ID.
    // We sign it with a secret key so hackers can't fake it.
    const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin }, // Payload (Data inside token)
        process.env.JWT_SECRET,                  // Secret Key (We will add this to .env next)
        { expiresIn: "5d" }                      // Expiration (Valid for 5 days)
    );

    // 4. SANITIZE & SEND
    // Remove the password hash before sending data back.
    const { password, ...other } = user._doc;

    // Send the User Data AND the Token
    res.status(200).json({ 
      message:"User has been logged in successfully",
      ...other, access_token: token });

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;