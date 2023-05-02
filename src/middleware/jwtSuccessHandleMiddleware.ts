import { Request as JWTReqeust } from "express-jwt";
import { AuthPayload, StandardResponse } from "../controller";
import { Handler, NextFunction, Response } from "express";
import UserService from "../service/UserService";
import { UserDTO } from "../dto";

export const jwtSuccessHandleMiddleware: Handler = 
async (req: JWTReqeust<AuthPayload | undefined>, res: Response<StandardResponse>, next: NextFunction) => {
    if(!req.auth){
        return next();
    }

    const token = (req.headers.authorization as string).split(" ")[1];
    let user: UserDTO | null;
    try{
        user = await UserService.findByToken(token);
    }
    catch(err){
        return res.status(500).json({
            status: "system error"
        });
    }

    if(user === null){
        return res.status(401).json({
            status: "not authorized",
            msg: "token not existed"
        });
    }

    return next();
}