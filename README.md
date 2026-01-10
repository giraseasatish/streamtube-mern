# 🎥 StreamTube - Full Stack Video Streaming Platform

<div align="center">

![StreamTube Banner](https://img.shields.io/badge/StreamTube-Video%20Platform-red?style=for-the-badge&logo=youtube)

A fully functional YouTube clone built with the MERN Stack (MongoDB, Express, React, Node.js). Stream, share, and engage with video content in a modern, responsive interface.

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## ✨ Features

### 🔐 Authentication & Security
- Secure user registration and login using **JWT (JSON Web Tokens)**
- Password encryption with **bcrypt**
- Cookie-based authentication for persistent sessions
- Protected routes and authorization middleware

### 📹 Video Management
- **Upload videos** with custom thumbnails
- **Edit video details** (title, description, tags)
- **Delete videos** from your channel
- Video processing and storage
- Automatic thumbnail generation

### 👥 Social Features
- **Subscribe/Unsubscribe** to channels
- **Like/Dislike** videos with real-time count updates
- **Comment system** with nested replies
- User profiles and channel pages
- View subscriber counts

### 🔍 Discovery & Navigation
- **Advanced search** by title and tags
- **Trending videos** feed
- **Random video** recommendations
- **Subscription feed** showing latest uploads from subscribed channels
- Category-based filtering

### 🎨 User Interface
- Modern **Dark Mode** design
- Fully **responsive** layout (mobile, tablet, desktop)
- Smooth animations and transitions
- Built with **Styled Components** for modular CSS
- Intuitive navigation and user experience

### ⚡ Performance
- Optimized video streaming
- Lazy loading for better performance
- Redux Toolkit for efficient state management
- Fast API responses with Express.js

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React.js (Vite)** | Modern, fast frontend framework with lightning-fast HMR |
| **Redux Toolkit** | Centralized state management for scalable applications |
| **Styled Components** | CSS-in-JS for component-scoped styling |
| **Axios** | Promise-based HTTP client for API calls |
| **React Router** | Client-side routing for seamless navigation |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime for server-side logic |
| **Express.js** | Fast, unopinionated web framework |
| **MongoDB** | NoSQL database for flexible data storage |
| **Mongoose** | Elegant MongoDB object modeling |
| **JWT** | Secure token-based authentication |
| **Bcrypt** | Password hashing for security |
| **Cookie Parser** | Parse and manage HTTP cookies |
| **Multer** | File upload middleware |

---

## 📁 Project Structure

```
streamtube-mern/
│
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store, slices, and actions
│   │   ├── utils/         # Helper functions and utilities
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Application entry point
│   ├── package.json
│   └── vite.config.js     # Vite configuration
│
├── server/                # Backend Node.js application
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose schemas and models
│   ├── routes/            # API route definitions
│   ├── middleware/        # Custom middleware (auth, error handling)
│   ├── utils/             # Helper functions
│   ├── config/            # Configuration files
│   ├── index.js           # Server entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **MongoDB** - [Local installation](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- **Git** - Version control

### Clone the Repository

```bash
git clone https://github.com/giraseasatish/streamtube-mern.git
cd streamtube-mern
```

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `server` folder:
```bash
touch .env
```

4. Add your environment variables (see [Environment Variables](#-environment-variables) section)

5. Start the development server:
```bash
npm start
```

The server will run on `http://localhost:8800`

### Frontend Setup

1. Open a new terminal and navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`

---

## 🔑 Environment Variables

Create a `.env` file in the **server** folder with the following variables:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/streamtube?retryWrites=true&w=majority

# Server Configuration
PORT=8800
NODE_ENV=development

# JWT Secret (use a strong, random string)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Optional: File Upload Configuration
MAX_FILE_SIZE=100MB
ALLOWED_FILE_TYPES=video/mp4,video/webm,video/ogg

# Optional: Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

### Environment Variable Descriptions

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/streamtube` or MongoDB Atlas URI |
| `PORT` | Server port number | `8800` |
| `JWT_SECRET` | Secret key for JWT token signing | Use a random 32+ character string |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

**Security Note:** Never commit your `.env` file to version control. Add it to `.gitignore`.

---

## 💻 Usage

### Running the Application

1. **Start MongoDB** (if running locally):
```bash
mongod
```

2. **Start the Backend Server**:
```bash
cd server
npm start
```

3. **Start the Frontend** (in a new terminal):
```bash
cd client
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

**Frontend:**
```bash
cd client
npm run build
```
This creates an optimized production build in the `dist` folder.

**Backend:**
```bash
cd server
npm run start
```

---

## 🌐 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/signin` | Login user | No |
| POST | `/api/auth/google` | Google OAuth login | No |
| POST | `/api/auth/signout` | Logout user | Yes |

### Users
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/find/:id` | Get user by ID | No |
| PUT | `/api/users/:id` | Update user details | Yes |
| DELETE | `/api/users/:id` | Delete user account | Yes |
| PUT | `/api/users/sub/:id` | Subscribe to a channel | Yes |
| PUT | `/api/users/unsub/:id` | Unsubscribe from a channel | Yes |
| GET | `/api/users/subscriptions` | Get subscribed channels | Yes |

### Videos
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/videos` | Upload a new video | Yes |
| GET | `/api/videos/find/:id` | Get video by ID | No |
| PUT | `/api/videos/:id` | Update video details | Yes |
| DELETE | `/api/videos/:id` | Delete video | Yes |
| PUT | `/api/videos/view/:id` | Increment view count | No |
| GET | `/api/videos/trend` | Get trending videos | No |
| GET | `/api/videos/random` | Get random videos | No |
| GET | `/api/videos/sub` | Get subscription feed | Yes |
| GET | `/api/videos/tags?tags=...` | Search videos by tags | No |
| GET | `/api/videos/search?q=...` | Search videos by title | No |

### Comments
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/comments` | Add a comment | Yes |
| GET | `/api/comments/:videoId` | Get video comments | No |
| DELETE | `/api/comments/:id` | Delete comment | Yes |

### Likes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| PUT | `/api/videos/like/:videoId` | Like a video | Yes |
| PUT | `/api/videos/dislike/:videoId` | Dislike a video | Yes |

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Contact

**Your Name**
- GitHub: [@giraseasatish](https://github.com/giraseasatish)
- Email: girasesatish652@gmail.com
- LinkedIn: [Satish Girase](https://www.linkedin.com/in/satish-girase)

**Project Link:** [https://github.com/giraseasatish/streamtube-mern](https://github.com/giraseasatish/streamtube-mern)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Styled Components](https://styled-components.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- Icons from [Lucide Icons](https://lucide.dev/)
- Inspiration from YouTube's user interface

---

<div align="center">

**Made with ❤️ by [Satish Girase]**

⭐ Star this repo if you found it helpful!

</div>  
