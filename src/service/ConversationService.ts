import { ConversationDTO, UserDTO } from "../dto";
import Conversation from "../model/Conversation";
import User from "../model/User";

class ConversationService{
    public static async create(conversation: Pick<ConversationDTO, "title" | "creatorId">): Promise<ConversationDTO>{
        const createdConversation = await Conversation.create(conversation);

        return createdConversation.get();
    }

    public static async addParticipant(conversation: ConversationDTO, user: string): Promise<void>;
    public static async addParticipant(conversation: ConversationDTO, user: UserDTO | string): Promise<void>{
        const conversationMapped = new Conversation(conversation);
        if(typeof user === "string"){
            await conversationMapped.addParticipatedUser(user);
        }
        else{
            const userNeedAddMapped = new User(user);
            await conversationMapped.addParticipatedUser(userNeedAddMapped);
        }
    }
}

export default ConversationService;