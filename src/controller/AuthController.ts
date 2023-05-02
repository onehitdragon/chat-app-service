import { Request, Response } from "express";
import z from "zod";
import UserService from "../service/UserService";
import { UserDTO } from "../dto";
import AuthService from "../service/AuthService";
import { StandardResponse } from ".";
import { UniqueConstraintError } from "sequelize";

const loginBodySchema = z.object({
    username: z.string(),
    password: z.string()
});
const registerBodySchema = z.object({
    username: z.string(),
    password: z.string()
});

class AuthController{
    public async login(req: Request, res: Response<StandardResponse>){
        const validate = loginBodySchema.safeParse(req.body);
        if(!validate.success){
            return res.status(400).json({
                status: "missing",
                msg: "You are missing some field"
            });
        }
        const body = validate.data;

        let user: UserDTO | null;
        try{
            user = await UserService.findByUsernameAndPassword(body.username, body.password);
        }
        catch(err){
            return res.status(500).json({
                status: "system error"
            });
        }

        if(user === null){
            return res.json({
                status: "error",
                msg: "wrong username or password"
            });
        }

        const token = AuthService.newToken({
            id: user.id,
            username: user.username,
            role: user.role
        });
        try{
            UserService.updateWithToken(user.id, token);
        }
        catch(err){
            return res.status(500).json({
                status: "system error"
            });
        }

        return res.json({
            status: "success",
            msg: "login ok",
            content: {
                token
            }
        });
    }

    public async register(req: Request, res: Response<StandardResponse>){
        const validate = registerBodySchema.safeParse(req.body);
        if(!validate.success){
            return res.status(400).json({
                status: "missing",
                msg: "You are missing some field"
            });
        }
        const body = validate.data;

        let user: UserDTO | null;
        try{
            user = await UserService.createUser({
                username: body.username,
                password: body.password
            });
        }
        catch(err){
            if(err instanceof UniqueConstraintError){
                return res.status(400).json({
                    status: "error",
                    msg: `${body.username} is existed`
                });
            }
            return res.status(500).json({
                status: "system error"
            });
        }

        return res.json({
            status: "success",
            content: {
                user: {
                    username: user.username
                }
            }
        });
    }
}

export default AuthController;