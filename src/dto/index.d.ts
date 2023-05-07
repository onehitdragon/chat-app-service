import { InferAttributes } from "sequelize";
import User from "../model/User";
import Conversation from "../model/Conversation";

interface UserDTO extends InferAttributes<User>{};
interface UserInfoDTO extends Omit<UserDTO, "password" | "token">{};
interface ConversationDTO extends InferAttributes<Conversation>{};
interface ConversationCreationDTO extends Pick<ConversationDTO, "title" | "creatorId">{}
interface ParticipantInfoDTO extends Omit<UserDTO, "password" | "token" | "phone" | "email">{};