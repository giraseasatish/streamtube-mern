// [JavaScript] "const" declares a variable
// [Node.js] "require" loads the library file from hard drive
const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');



// 1. Configuration   [Express] Initialize the application
const app=express();
dotenv.config();


// 2. Middleware (Allows us to read JSON data)  [Express] Use the JSON translator tool
app.use(express.json());

//Import
const authRoute=require("./routes/auth");
// 2. USE (Middleware)
// This logic says: "If ANY user goes to the URL starting with '/api/auth'..."
// "...send them immediately to the authRoute file to handle it."
app.use("/api/auth",authRoute);

const videoRoute = require("./routes/videos"); // Import
app.use("/api/videos", videoRoute);      //Connect

const userRoute = require("./routes/users");
app.use("/api/users", userRoute);

const commentRoute = require("./routes/comments");
app.use("/api/comments", commentRoute);


// 3. Database Connection   
//// [JavaScript] "async" function declaration
const connectDB= async()=>{
    try{
    // [Mongoose/Node] Connect to the database
    // [Node.js] "process.env" reads the secret fil
        await mongoose.connect(process.env.MONGO_URI);
    // [JavaScript] Standard print
        console.log("MongoDB Connected!");
    } catch (err) {
        console.error("DB Connection Error:",err.message);
    }
};

// 4. Start Server    [Express] Open the port and listen for users
const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});




