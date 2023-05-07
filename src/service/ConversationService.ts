import { ConversationCreationDTO, ConversationDTO, UserDTO, ParticipantInfoDTO } from "../dto";
import Conversation from "../model/Conversation";
import User from "../model/User";

class ConversationService{
    public static async create(conversation: ConversationCreationDTO): Promise<ConversationDTO>{
        const createdConversation = await Conversation.create(conversation);

        console.log(Object.getPrototypeOf(createdConversation));

        return createdConversation.get();
    }

    public static async addParticipant(conversation: ConversationDTO, userOrUserId: string): Promise<ConversationDTO>;
    public static async addParticipant(conversation: ConversationDTO, userOrUserId: UserDTO | string): Promise<ConversationDTO>{
        const conversationMapped = new Conversation(conversation);
        if(typeof userOrUserId === "string"){
            await conversationMapped.addParticipatedUser(userOrUserId);
        }
        else{
            const userNeedAddMapped = new User(userOrUserId);
            await conversationMapped.addParticipatedUser(userNeedAddMapped);
        }

        return conversationMapped.get();
    }

    public static async getParticipantsById(conversationId: string): Promise<ParticipantInfoDTO[] | null>{
        const conversation = await Conversation.findOne({
            where: {
                id: conversationId
            }
        });
        if(conversation !== null){
            const participants = await conversation.getParticipatedUsers({
                attributes: {
                    exclude: ["email", "phone", "password", "token"]
                }
            });

            return participants.map((participant) => {
                return {
                    ...participant.get(),
                    Participant: undefined
                }
            });
        }

        return null;
    }

    public static async getParticipants(conversation: ConversationDTO): Promise<ParticipantInfoDTO[]>{
        const conversationMapped = new Conversation(conversation);
        const participants = await conversationMapped.getParticipatedUsers({
            attributes: {
                exclude: ["email", "phone", "password", "token"]
            }
        });

        return participants.map((participant) => {
            return {
                ...participant.get(),
                Participant: undefined
            }
        });
    }

    public static async findsByUserId(userId: string): Promise<ConversationDTO[]>{
        const conversations = await Conversation.findAll({
            where: {
                creatorId: userId
            }
        });

        return conversations.map((conversation) => {
            return conversation.get();
        })
    }
}

export default ConversationService;