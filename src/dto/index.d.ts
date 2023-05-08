import { InferAttributes } from "sequelize";
import User from "../model/User";
import Conversation from "../model/Conversation";

interface UserDTO extends InferAttributes<User>{};
interface UserInfoDTO extends Omit<UserDTO, "password" | "token">{};

interface ConversationDTO extends InferAttributes<Conversation>{};
interface ConversationInfoDTO extends Omit<ConversationDTO, "creatorId">{};
interface ConversationCreationDTO extends Pick<ConversationDTO, "title" | "creatorId">{}
interface ParticipantInfoDTO extends Pick<UserDTO, "id" | "firstName" | "lastName" | "birthDay" | "role">{};
interface ConversationDetailDTO extends ConversationInfoDTO{
    Creator: ParticipantInfoDTO,
    ParticipatedUsers: ParticipantInfoDTO[]
}