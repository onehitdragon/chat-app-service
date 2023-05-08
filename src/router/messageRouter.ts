import express from "express";
import MessageController from "../controller/MessageController";
import multer from "multer";
import fileAttachMessageStorage from "../storage/fileAttachMessageStorage";

const messageRouter = express.Router();
const messageController = new MessageController();
const upload = multer({ storage: fileAttachMessageStorage });

messageRouter.post("/", upload.single("attach"), messageController.create);

export default messageRouter;