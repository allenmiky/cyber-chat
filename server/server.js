import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// Serve static files from React build folder
app.use(express.static(path.join(__dirname, "client")));

// Catch all remaining requests and serve React index.html
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React frontend during dev
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("⚡ New user connected:", socket.id);

  socket.on("sendMessage", (data) => {
    console.log("📩 Message received:", data);
    io.emit("receiveMessage", data); // broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Use environment PORT for deployment (Vercel/Heroku) or default 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
