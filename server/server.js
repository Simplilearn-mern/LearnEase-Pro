// server.js (CommonJS – FINAL WORKING VERSION)

const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courseRoutes");
const feedbackRoutes = require ("./routes/feedbackRoutes.js");
const courseRequestRoutes =
  require("./routes/courseRequestRouts");

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);


// Test route
app.get("/", (req, res) => {
  res.send("LearnEase Pro API Running");
});

// 🔥 AUTH ROUTES (THIS WAS MISSING)
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/course-requests", courseRequestRoutes);
app.use("/api/feedback", feedbackRoutes);
// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://locha:zje0zKZBn3wUA3L5@cluster0.g2jfxpg.mongodb.net/lochaTest"
  )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err.message)
  );

// Create HTTP server
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (room) => socket.join(room));

  socket.on("message", ({ room, message }) => {
    io.to(room).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});