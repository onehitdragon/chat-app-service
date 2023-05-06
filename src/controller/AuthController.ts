import { Request, Response } from "express";
import z from "zod";
import UserService from "../service/UserService";
import { UserDTO } from "../dto";
import AuthService from "../service/AuthService";
import { StandardResponse } from ".";
import { UniqueConstraintError } from "sequelize";

const loginBodySchema = z.object({
    email: z.string(),
    password: z.string()

});
const registerBodySchema = z.object({
    email: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    birthDay: z.coerce.date(),
    phone: z.string()
});

class AuthController{
    public async login(req: Request, res: Response<StandardResponse>){
        const validate = loginBodySchema.safeParse(req.body);
        if(!validate.success){
            return res.status(400).json({
                status: "missing",
                msg: "You are missing some field",
                content: validate.error
            });
        }
        const body = validate.data;

        let user: UserDTO | null;
        try{
            user = await UserService.findByEmailAndPassword(body.email, body.password);
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
            email: user.email,
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
                msg: "You are missing some field",
                content: validate.error
            });
        }
        const body = validate.data;

        let user: UserDTO | null;
        try{
            user = await UserService.createUser(body);
        }
        catch(err){
            if(err instanceof UniqueConstraintError){
                return res.status(400).json({
                    status: "error",
                    msg: `${body.email} is existed`
                });
            }
            return res.status(500).json({
                status: "system error"
            });
        }

        return res.json({
            status: "success",
            content: {
                user: body
            }
        });
    }
}

export default AuthController;