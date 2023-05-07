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

const server = express();

server.listen(12345, () => {
    console.log("Server listening on 12345...");
});

// middleware
server.use(cors());
server.use(express.json());
server.use(
    expressjwt({
        secret: process.env.SECRET_KEY || "",
        algorithms: ["HS256"],
        credentialsRequired: false
    }).unless({
        path: [/^\/api\/v1\/auth\/[a-z]+$/]
    }),
    jwtErrorHandleMiddleware,
    jwtSuccessHandleMiddleware
);

// route
server.use("/api/v1/db", databaseRouter);
server.use("/api/v1/auth", authRouter);
server.use("/api/v1/user", userRouter);