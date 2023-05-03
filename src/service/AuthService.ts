import jwt from "jsonwebtoken";
import { AuthPayload } from "../controller";

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
}

export default AuthService;