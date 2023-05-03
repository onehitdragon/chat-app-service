import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, 
    HasOneCreateAssociationMixin, 
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    NonAttribute} from "sequelize";
import db from "../database/db";
import PlayerData from "./PlayerData";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare id: CreationOptional<string>;
    declare username: string;
    declare password: string;
    declare role: CreationOptional<"admin" | "user">;
    declare token: null | CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare createPlayerDatum: HasOneCreateAssociationMixin<PlayerData>;
    declare getPlayerDatum: HasOneGetAssociationMixin<PlayerData>;
    declare setPlayerDatum: HasOneSetAssociationMixin<PlayerData, "userId">;
    declare playerDatum?: NonAttribute<PlayerData>
}

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user"
    },
    token: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize: db,
    tableName: "Users",
});

User.hasOne(PlayerData, {
    foreignKey: {
        name: "userId"
    }
});

export default User;