import { Request as JWTReqeust } from "express-jwt";
import { AuthPayload, StandardResponse } from "../controller";
import { Handler, NextFunction, Response } from "express";
import AuthService from "../service/AuthService";

export const jwtSuccessHandleMiddleware: Handler = 
async (req: JWTReqeust<AuthPayload>, res: Response<StandardResponse>, next: NextFunction) => {
    if(!req.auth || !req.headers.authorization){
        return next();
    }

    const token = req.headers.authorization.split(" ")[1];
    req.headers.authorization = token;

    try{
        if(!(await AuthService.tokenIsExist(token))){
            return res.status(401).json({
                status: "not authorized",
                msg: "token not existed"
            });
        }
    }
    catch(err){
        return res.status(500).json({
            status: "system error"
        });
    }

    return next();
}