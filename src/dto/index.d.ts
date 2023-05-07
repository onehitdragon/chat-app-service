import { InferAttributes } from "sequelize";
import User from "../model/User";
import Conversation from "../model/Conversation";

interface UserDTO extends InferAttributes<User>{};
interface UserInfoDTO extends Pick<UserDTO, "id" | "email" | "firstName" | "lastName" | "birthDay" | "phone" | "role">{};
interface ConversationDTO extends InferAttributes<Conversation>{};