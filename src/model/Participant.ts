import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../database/db";
import User from "./User";
import Conversation from "./Conversation";

class Participant extends Model<InferAttributes<Participant>, InferCreationAttributes<Participant>>{
    declare id: CreationOptional<String>;
    declare conversationId: ForeignKey<String>;
    declare userId: ForeignKey<String>;
    declare amountMessageNotRead: CreationOptional<Number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Participant.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    amountMessageNotRead: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize: db,
    tableName: "Participants"
});

User.belongsToMany(
    Conversation,
    {
        through: Participant,
        foreignKey: "userId",
        as: "ParticipatedConversations"
    }
);

Conversation.belongsToMany(
    User,
    {
        through: Participant,
        foreignKey: "conversationId",
        as: "ParticipatedUsers"
    }
);

export default Participant;