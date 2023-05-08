import { CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin,
    InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import db from "../database/db";
import User from "./User";

class Conversation extends Model<InferAttributes<Conversation>, InferCreationAttributes<Conversation>>{
    declare id: CreationOptional<string>;
    declare title: string;
    declare creatorId: ForeignKey<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare createCreator: HasOneCreateAssociationMixin<User>;
    declare getCreator: HasOneGetAssociationMixin<User>;
    declare setCreator: HasOneSetAssociationMixin<User, string>;
    declare addParticipatedUser: HasManyAddAssociationMixin<User, string>;
    declare getParticipatedUsers: HasManyGetAssociationsMixin<User>;
    declare Creator: NonAttribute<User>;
    declare ParticipatedUsers: NonAttribute<User[]>;
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