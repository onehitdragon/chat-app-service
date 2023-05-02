import { UnauthorizedError } from "express-jwt";
import { Response, ErrorRequestHandler, NextFunction, Request } from "express";
import { StandardResponse } from "../controller";

export const jwtErrorHandleMiddleware = 
(async (err: UnauthorizedError, req: Request, res: Response<StandardResponse>, next: NextFunction) => {
    if(err.code){
        return res.status(401).json({
            status: "not authorized",
            msg: err.message
        });
    }

    next();
}) as ErrorRequestHandler