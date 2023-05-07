import { NextFunction, Response, Handler } from "express";
import { AuthPayload, StandardResponse } from "../controller";
import { Request as JWTRequest } from "express-jwt";

const isAdmin: Handler = ((req: JWTRequest<AuthPayload>, res: Response<StandardResponse>, next: NextFunction) => {
    if(!req.auth){
        return res.status(401).json({
            status: "not authorized",
            msg: "you are not admin"
        });
    }

    if(req.auth.role !== "admin"){
        return res.status(401).json({
            status: "not authorized",
            msg: "you are not admin"
        });
    }

    next();
})

export { isAdmin }