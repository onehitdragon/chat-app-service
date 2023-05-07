import { Request as JWTRequest } from "express-jwt";
import { AuthPayload, StandardResponse } from ".";
import { Response } from "express";
import { UserInfoDTO } from "../dto";
import UserService from "../service/UserService";

class UserController{
    public async info(req: JWTRequest<AuthPayload>, res: Response<StandardResponse>){
        if(!req.auth){
            return res.status(401).json({
                status: "not authorized"
            });
        }

        let user: UserInfoDTO | null;
        try{
            user = await UserService.findById(req.auth.id);
        }
        catch(err){
            return res.status(500).json({
                status: "system error"
            });
        }

        if(user === null){
            return res.status(500).json({
                status: "error",
                msg: "user dont exist"
            });
        }

        return res.json({
            status: "success",
            content: {
                user
            }
        });
    }
}

export default UserController;