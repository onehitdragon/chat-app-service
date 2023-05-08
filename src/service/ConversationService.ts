import { Op } from "sequelize";
import { ConversationCreationDTO, ConversationDTO, UserDTO, ParticipantInfoDTO, ConversationDetailDTO } from "../dto";
import Conversation from "../model/Conversation";
import Participant from "../model/Participant";
import User from "../model/User";
import Message from "../model/Message";

class ConversationService{
    public static async create(conversation: ConversationCreationDTO): Promise<ConversationDTO>{
        const createdConversation = await Conversation.create(conversation);

        return createdConversation.get();
    }

    public static async addParticipant(conversation: ConversationDTO, userOrUserId: string): Promise<void>;
    public static async addParticipant(conversation: ConversationDTO, userOrUserId: UserDTO | string): Promise<void>{
        const conversationMapped = new Conversation(conversation);
        if(typeof userOrUserId === "string"){
            await conversationMapped.addParticipatedUser(userOrUserId);
        }
        else{
            const userNeedAddMapped = new User(userOrUserId);
            await conversationMapped.addParticipatedUser(userNeedAddMapped);
        }

        console.log(Object.getPrototypeOf(conversationMapped));
    }

    public static async findById(id: string): Promise<ConversationDetailDTO | null>{
        const conversation = await Conversation.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: User,
                    as: "Creator",
                    attributes: ["id", "firstName", "lastName", "birthDay", "role"]
                },
                {
                    model: User,
                    as: "ParticipatedUsers",
                    attributes: ["id", "firstName", "lastName", "birthDay", "role"],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Message,
                    attributes: {
                        exclude: ["conversationId"]
                    }
                }
            ]
        });

        return conversation === null ? null : {
            id: conversation.id,
            title: conversation.title,
            createdAt: conversation.createdAt,
            updatedAt: conversation.updatedAt,
            Creator: conversation.Creator,
            ParticipatedUsers: conversation.ParticipatedUsers,
            Messages: conversation.Messages
        }
    }

    public static async findsByUserId(userId: string): Promise<ConversationDetailDTO[]>{
        const conversationParticipatedIds = (await Participant.findAll({
            where: {
                userId: userId
            },
            attributes: ["conversationId"]
        })).map(participant => participant.conversationId as string);

        const conversations = await Conversation.findAll({
            where: {
                id: {
                    [Op.in]: conversationParticipatedIds
                }
            },
            include: [
                {
                    model: User,
                    as: "Creator",
                    attributes: ["id", "firstName", "lastName", "birthDay", "role"]
                },
                {
                    model: User,
                    as: "ParticipatedUsers",
                    attributes: ["id", "firstName", "lastName", "birthDay", "role"],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Message,
                    attributes: {
                        exclude: ["conversationId"]
                    }
                }
            ]
        });

        return conversations.map((conversation) => {
            return {
                id: conversation.id,
                title: conversation.title,
                createdAt: conversation.createdAt,
                updatedAt: conversation.updatedAt,
                Creator: conversation.Creator,
                ParticipatedUsers: conversation.ParticipatedUsers,
                Messages: conversation.Messages
            }
        })
    }
}

export default ConversationService;