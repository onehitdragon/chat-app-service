import express from "express";
import AuthController from "../controller/AuthController";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.get("/login", authController.login);
authRouter.post("/register", authController.register);

export default authRouter;