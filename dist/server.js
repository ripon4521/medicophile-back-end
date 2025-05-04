"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app")); // Your Express app
const config_1 = __importDefault(require("./config"));
const DB_1 = __importDefault(require("./DB"));
const http_1 = __importDefault(require("http")); // HTTP module
const socket_io_1 = require("socket.io"); // Import Socket.IO
require("./module/notice/notice.cron");
let io;
function server() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            yield mongoose_1.default.connect(config_1.default.database_url);
            (0, DB_1.default)();
            // Create HTTP server using your existing Express app
            const httpServer = http_1.default.createServer(app_1.default);
            // Initialize Socket.IO with the server
            exports.io = io = new socket_io_1.Server(httpServer, {
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
                console.log(`School Management Server is running on port 3000 - Alhamdulillah`);
            });
        }
        catch (error) {
            console.error("Error starting server:", error);
        }
    });
}
server();
