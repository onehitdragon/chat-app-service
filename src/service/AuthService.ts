import jwt from "jsonwebtoken";
import { AuthPayload } from "../controller";
import User from "../model/User";

class AuthService{
    public static newToken(payload: AuthPayload){
        return jwt.sign(
            payload,
            process.env.SECRET_KEY || "",
            {
                expiresIn: 60000 * 60,
                header: {
                    alg: "HS256",
                    typ: "JWT"
                }
            }
        )
    }

    public static async tokenIsExist(token: string): Promise<boolean>{
        const user = await User.findOne({
            attributes: {
                include: ["id"]
            },
            where: {
                token: token
            }
        });

        return user !== null;
    }
}

export default AuthService;