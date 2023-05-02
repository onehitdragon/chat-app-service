import { UnauthorizedError } from "express-jwt";
import { Response, ErrorRequestHandler, NextFunction, Request } from "express";
import { StandardResponse } from "../controller";

export const jwtErrorHandleMiddleware = 
(async (err: UnauthorizedError, req: Request, res: Response<StandardResponse>, next: NextFunction) => {
    return res.status(401).json({
        status: "not authorized",
        msg: err.message
    });
}) as ErrorRequestHandler