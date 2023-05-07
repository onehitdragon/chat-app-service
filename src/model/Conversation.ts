import { CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../database/db";
import User from "./User";

class Conversation extends Model<InferAttributes<Conversation>, InferCreationAttributes<Conversation>>{
    declare id: CreationOptional<String>;
    declare title: String;
    declare creatorId: ForeignKey<String>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare createCreator: HasOneCreateAssociationMixin<User>;
    declare getCreator: HasOneGetAssociationMixin<User>;
    declare setCreator: HasOneSetAssociationMixin<User, String>;
    declare addParticipatedUser: HasManyAddAssociationMixin<User, String>;
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

User.hasMany(
    Conversation,
    {
        foreignKey: "creatorId"
    }
)

Conversation.belongsTo(
    User,
    {
        foreignKey: "creatorId",
        as: "Creator"
    }
);

export default Conversation;