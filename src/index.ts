import express from "express";
import cors from "cors";
import databaseRouter from "./router/databaseRouter";

const server = express();

server.listen(12345, () => {
    console.log("Server listening on 12345...");
});

// middleware
server.use(cors());
server.use(express.json());

// route
server.use("/db", databaseRouter);