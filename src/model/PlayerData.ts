import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../database/db";
import User from "./User";

class PlayerData extends Model<InferAttributes<PlayerData>, InferCreationAttributes<PlayerData>>{
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User["id"]>;
    declare gold: CreationOptional<number>;
    declare match: CreationOptional<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

PlayerData.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    gold: {
        type: DataTypes.INTEGER,
        defaultValue: 350
    },
    match: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize: db,
    tableName: "PlayerDatas"
});

export default PlayerData;