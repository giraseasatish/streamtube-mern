🎥 StreamTube - Full Stack Video Streaming Platform

A fully functional YouTube clone built with the MERN Stack (MongoDB, Express, React, Node.js). This application allows users to upload, watch, like, and comment on videos with a seamless, responsive UI.

🚀 Features

Authentication: Secure Login/Signup using JWT (JSON Web Tokens) & Cookies.

Video Management: Upload, Edit, and Delete videos.

Social Interactions: Subscribe to channels, Like/Dislike videos, and Comment system.

Advanced Search: Search videos by Title or Tags.

Data Sorting: View Trending videos, Random feed, or Subscribed channel feed.

Responsive UI: Built with React & Styled Components for a modern Dark Mode interface.

🛠️ Tech Stack

Frontend:

React.js (Vite)

Redux Toolkit (State Management)

Styled Components (CSS-in-JS)

Axios (API Integration)

Backend:

Node.js & Express.js

MongoDB & Mongoose (Database)

JWT & Bcrypt (Security)

⚙️ Run Locally

Clone the project

git clone https://github.com/giraseasatish/streamtube-mern.git

Go to the project directory

cd streamtube-mern


1. Backend Setup

Go to the server folder

cd server


Install dependencies

npm install


Create a .env file in the server folder and add your secrets:

MONGO_URI=your_mongodb_connection_string
PORT=8800
JWT_SECRET=your_secret_key


Start the server

npm start


2. Frontend Setup

Open a new terminal and go to the client folder

cd client


Install dependencies

npm install


Start the React app

npm run dev
