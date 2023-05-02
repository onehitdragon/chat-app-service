import { Request } from "express";
import { UserDTO } from "../dto";

interface StandardResponse<TBody = any>{
    status: "success" | "error" | "missing" | "system error" | "not authorized",
    msg?: string,
    content?: TBody
}

interface AuthPayload extends Pick<UserDTO, "id" | "username" | "role">{}