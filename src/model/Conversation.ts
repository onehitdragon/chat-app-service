import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../database/db";

class Conversation extends Model<InferAttributes<Conversation>, InferCreationAttributes<Conversation>>{
    declare id: CreationOptional<String>;
    declare title: String;
    declare creatorId: ForeignKey<String>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Conversation.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize: db,
    tableName: "Conversations"
});

export default Conversation;