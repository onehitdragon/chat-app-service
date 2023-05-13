import { Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import { AuthPayload, StandardResponse } from ".";
import { z } from "zod";
import { MessageCreationDTO, MessageDTO } from "../dto";
import MessageService from "../service/MessageService";
import { ForeignKeyConstraintError } from "sequelize";
import fs from "fs";

const createMessageBodySchema = z.object({
    type: z.union([z.literal("text"), z.literal("file"), z.literal("icon")]).default("text"),
    content: z.union([z.string().nonempty(), z.undefined()]),
    conversationId: z.string()
});

class MessageController {
    public async create(req: JWTRequest<AuthPayload>, res: Response<StandardResponse>){
        if(!req.auth){
            return res.status(401).json({
                status: "not authorized"
            });
        }

        const validate = createMessageBodySchema.safeParse(req.body);
        if(!validate.success){
            return res.status(400).json({
                status: "missing",
                msg: "You are missing some field",
                content: validate.error
            });
        }
        const body = validate.data;

        if((body.type === "text" || body.type === "icon") && typeof body.content === "undefined"){
            return res.status(400).json({
                status: "missing",
                msg: "Require content field when type = 'text'"
            });
        }
        if(body.type === "file" && !req.file){
            return res.status(400).json({
                status: "missing",
                msg: "Require attach file when type = 'file'"
            });
        }

        const creationMessage: MessageCreationDTO = {
            content: body.content ?? "",
            type: body.type,
            conversationId: body.conversationId,
            senderId: req.auth.id,
            attachmentUrl: null
        }
        if(body.type === "file" && req.file){
            creationMessage.content = req.file.originalname;
            creationMessage.attachmentUrl = req.file.path;
        }

        let message: MessageDTO;
        try{
            message = await MessageService.create(creationMessage);
        }
        catch(err){
            req.file && fs.unlinkSync(req.file.path);
            if(err instanceof ForeignKeyConstraintError){
                return res.status(400).json({
                    status: "error",
                    msg: `conversation id: '${body.conversationId}' dont find`
                });
            }
            return res.status(500).json({
                status: "system error",
                content: err
            });
        }

        return res.json({
            status: "success",
            content: {
                message: {
                    ...message,
                    conversationId: undefined
                }
            }
        });
    }
}

export default MessageController;