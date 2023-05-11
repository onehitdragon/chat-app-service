import db from "../database/db";
import { Request, Response } from "express";
import User from "../model/User";
import { StandardResponse } from ".";
import Conversation from "../model/Conversation";
import Participant from "../model/Participant";
import Message from "../model/Message";

class DataBaseController{
    public async reCreate(req: Request, res: Response<StandardResponse>){
        try{
            await db.sync({ force: true });
            const user = await User.create(
                {
                    email: "admin@gmail.com",
                    password: "12345",
                    firstName: "admin",
                    lastName: "admin",
                    birthDay: new Date(),
                    phone: "08754654674",
                    role: "admin"
                }
            );
            const conversation = await Conversation.create({
                title: "Conversation 1",
                creatorId: user.id
            });
            await Participant.create({
                userId: user.id,
                conversationId: conversation.id
            });
            await Message.create({
                senderId: user.id,
                content: "I am admin",
                conversationId: conversation.id
            });
        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                status: "system error",
                msg: "Recreation fail"
            });
        }

        return res.json({
            status: "success",
            msg: "Recreation ok"
        });
    }

    public async init(req: Request, res: Response<StandardResponse>){
        try{
            const users = await User.bulkCreate([
                {
                    email: "A@gmail.com",
                    password: "12345",
                    firstName: "A",
                    lastName: "Nguyễn",
                    birthDay: new Date(),
                    phone: "08754654674"
                },
                {
                    email: "B@gmail.com",
                    password: "12345",
                    firstName: "B",
                    lastName: "Trần",
                    birthDay: new Date(),
                    phone: "08754654674"
                },
                {
                    email: "C@gmail.com",
                    password: "12345",
                    firstName: "C",
                    lastName: "Hồng",
                    birthDay: new Date(),
                    phone: "08754654674"
                },
                {
                    email: "E@gmail.com",
                    password: "12345",
                    firstName: "E",
                    lastName: "Đại",
                    birthDay: new Date(),
                    phone: "08754654674"
                }
            ]);
            const conversation2 = await Conversation.create({
                title: "Conversation 2",
                creatorId: users[0].id
            });
            const conversation3 = await Conversation.create({
                title: "Conversation 3",
                creatorId: users[1].id
            });
            await conversation2.addParticipatedUser(users[0]);
            await conversation2.addParticipatedUser(users[1]);
            await Message.create({
                senderId: users[0].id,
                content: "Hello B",
                conversationId: conversation2.id
            });
            await Message.create({
                senderId: users[1].id,
                content: "Yes, Hello A",
                conversationId: conversation2.id
            });
            await conversation3.addParticipatedUser(users[0]);
            await conversation3.addParticipatedUser(users[2]);
        }
        catch(err){
            return res.status(500).json({
                status: "system error",
                msg: "Init fail"
            });
        }

        return res.json({
            status: "success",
            msg: "Init ok"
        });
    }
}

export default DataBaseController;