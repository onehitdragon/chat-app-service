import db from "../database/db";
import { Request, Response } from "express";
import User from "../model/User";
import { StandardResponse } from ".";
import Conversation from "../model/Conversation";

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
            await user.addConversation(conversation);
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
            await Conversation.create({
                title: "Conversation 2",
                creatorId: users[0].id
            });
            await Conversation.create({
                title: "Conversation 3",
                creatorId: users[1].id
            });
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