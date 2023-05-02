import db from "../database/db";
import { Request, Response } from "express";
import User from "../model/User";
import { StandardResponse } from ".";

class DataBaseController{
    public async reCreate(req: Request, res: Response<StandardResponse>){
        try{
            await db.sync({ force: true });
            await User.create(
                {
                    username: "admin",
                    password: "admin",
                    role: "admin"
                }
            );
        }
        catch(err){
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
            await User.bulkCreate([
                {
                    username: "a",
                    password: "a"
                },
                {
                    username: "b",
                    password: "b"
                },
                {
                    username: "c",
                    password: "c"
                },
                {
                    username: "d",
                    password: "d"
                }
            ])
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