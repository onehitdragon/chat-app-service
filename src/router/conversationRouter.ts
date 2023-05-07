import express from "express";
import ConversationController from "../controller/ConversationController";

const conversationRouter = express.Router();
const conversationController = new ConversationController();

conversationRouter.post("/", conversationController.create);

export default conversationRouter;