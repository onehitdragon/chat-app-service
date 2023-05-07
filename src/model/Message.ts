import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../database/db";
import User from "./User";
import Conversation from "./Conversation";

class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>>{
    declare id: CreationOptional<string>;
    declare content: string;
    declare type: CreationOptional<"text" | "file">;
    declare attachmentUrl: string | null;
    declare senderId: ForeignKey<string>;
    declare conversationId: ForeignKey<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Message.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    content: DataTypes.STRING,
    type: {
        type: DataTypes.ENUM("text", "file"),
        defaultValue: "text"
    },
    attachmentUrl: {
        type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize: db,
    tableName: "Messages"
});

Message.belongsTo(User, {
    foreignKey: "senderId",
    as: "Sender"
});
Conversation.hasMany(Message, {
    foreignKey: "conversationId"
});

export default Message;