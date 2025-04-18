import mongoose from "mongoose";
import app from "./app"; // Your Express app
import config from "./config";
import seedSuperAdmin from "./DB";
import http from "http"; // HTTP module
import { Server } from "socket.io"; // Import Socket.IO
import "./module/notice/notice.cron";

let io: Server;

async function server() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.database_url as string);
    seedSuperAdmin();

    // Create HTTP server using your existing Express app
    const httpServer = http.createServer(app);

    // Initialize Socket.IO with the server
    io = new Server(httpServer, {
      cors: {
        origin: [
          "http://localhost:5173",
          "https://admin.iconadmissionaid.com",
          "https://iconadmissionaid.com", // Removed trailing space
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      },
    });

    // Listen for new connections
    io.on("connection", (socket) => {
      console.log("🟢 Client connected with ID:", socket.id); // Log when a client connects

      // You can also send a message back to the client if needed
      socket.emit("connection-status", "Connected to Socket.IO server!");

      // Listen for client disconnect
      socket.on("disconnect", () => {
        console.log(`🔴 Client disconnected with ID: ${socket.id}`);
      });
    });

    // Start the server with the desired port (use `5000` directly or from config)
    httpServer.listen(3000, () => {
      console.log(
        `School Management Server is running on port 3000 - Alhamdulillah`,
      );
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

// Export the `io` instance for use elsewhere in the application
export { io };

server();
