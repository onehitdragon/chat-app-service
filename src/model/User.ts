import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, HasManyAddAssociationMixin
    } from "sequelize";
import db from "../database/db";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare id: CreationOptional<string>;
    declare email: string;
    declare password: string;
    declare firstName: string;
    declare lastName: string;
    declare birthDay: Date;
    declare phone: string;
    declare role: CreationOptional<"admin" | "user">;
    declare token: null | CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDay: DataTypes.DATE,
    phone: DataTypes.STRING,
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



export default User;