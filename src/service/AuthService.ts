import jwt from "jsonwebtoken";
import { UserDTO } from "../dto";

class AuthService{
    public static newToken<TPayload extends Pick<UserDTO, "id" | "username" | "role">>(payload: TPayload){
        return jwt.sign(
            payload,
            process.env.SECRET_KEY || "",
            {
                expiresIn: "60000"
            }
        )
    }
}

export default AuthService;