import { MessageCreationDTO, MessageDTO } from "../dto";
import Message from "../model/Message";

class MessageService{
    public static async create(message: MessageCreationDTO): Promise<MessageDTO>{
        const createdMessage = await Message.create(message);

        return createdMessage.get();
    }
}

export default MessageService;