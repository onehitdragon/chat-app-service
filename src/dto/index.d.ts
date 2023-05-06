import { InferAttributes } from "sequelize";
import User from "../model/User";

interface UserDTO extends InferAttributes<User>{}