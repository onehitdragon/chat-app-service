import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import databaseRouter from "./router/databaseRouter";
import authRouter from "./router/authRouter";
import { expressjwt } from "express-jwt";
import { isAdmin } from "./middleware/authMiddleware";
import { jwtErrorHandleMiddleware } from "./middleware/jwtErrorHandleMiddleware";
import { jwtSuccessHandleMiddleware } from "./middleware/jwtSuccessHandleMiddleware";
import userRouter from "./router/userRouter";
import conversationRouter from "./router/conversationRouter";
import messageRouter from "./router/messageRouter";
import http from "http";

const app = express();
const server = http.createServer(app);

server.listen(12345, () => {
    console.log("Server listening on 12345...");
});

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/icons", express.static("icons"));
app.use(
    expressjwt({
        secret: process.env.SECRET_KEY || "",
        algorithms: ["HS256"]
    }).unless({
        path: [
            /^\/api\/v1\/auth\/[a-z]+$/,
            "/uploads",
            "/peerjs"
        ]
    }),
    jwtErrorHandleMiddleware,
    jwtSuccessHandleMiddleware
);

// route
app.use("/api/v1/db", databaseRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/conversation", conversationRouter);
app.use("/api/v1/message", messageRouter);

export { server }
import "./socket/socket";
import "./p2p/peerServer";