import { Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import { AuthPayload, StandardResponse } from ".";
import ConversationService from "../service/ConversationService";
import { z } from "zod";
import { ForeignKeyConstraintError } from "sequelize";
import { ConversationDTO, ParticipantInfoDTO } from "../dto";

const createConversationBodySchema = z.object({
    title: z.string(),
    participantIds: z.array(
        z.string()
    )
});

class ConversationController{
    public async create(req: JWTRequest<AuthPayload>, res: Response<StandardResponse>){
        if(!req.auth){
            return res.status(401).json({
                status: "not authorized"
            });
        }

        const validate = createConversationBodySchema.safeParse(req.body);
        if(!validate.success){
            return res.status(400).json({
                status: "missing",
                msg: "You are missing some field",
                content: validate.error
            });
        }
        const body = validate.data;
        let conversation: ConversationDTO | null;

        try{
            conversation = await ConversationService.create({
                title: body.title,
                creatorId: req.auth.id
            });
            conversation = await ConversationService.addParticipant(
                conversation,
                req.auth.id
            );
        }
        catch(err){
            if(err instanceof ForeignKeyConstraintError){
                return res.status(400).json({
                    status: "error",
                    msg: "creator id dont find",
                    content: err
                });
            }
            return res.status(500).json({
                status: "system error"
            });
        }

        for(const participantId of body.participantIds){
            try{
                conversation = await ConversationService.addParticipant(
                    conversation,
                    participantId
                );
            }
            catch(err){
                if(err instanceof ForeignKeyConstraintError){
                    return res.status(400).json({
                        status: "error",
                        msg: `participant id: '${participantId}' dont find`
                    });
                }
                return res.status(500).json({
                    status: "system error"
                });
            }
        }

        let participants: ParticipantInfoDTO[] | null;
        try{
            participants = await ConversationService.getParticipants(conversation);
        }
        catch(err){
            return res.status(500).json({
                status: "system error"
            });
        }

        return res.json({
            status: "success",
            content: {
                conversation,
                participants
            }
        });
    }

    // public async getAllBySelf(req: JWTRequest<AuthPayload>, res: Response<StandardResponse>){
    //     if(!req.auth){
    //         return res.status(401).json({
    //             status: "not authorized"
    //         });
    //     }

    //     try{
            
    //     }
    //     catch(err){
    //         return res.status(500).json({
    //             status: "system error"
    //         });
    //     }
    // }
}

export default ConversationController;