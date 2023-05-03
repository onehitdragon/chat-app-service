import { InferAttributes } from "sequelize";
import User from "../model/User";
import PlayerData from "../model/PlayerData";

interface UserDTO extends InferAttributes<User>{}
interface PlayerDataDTO extends InferAttributes<PlayerData>{}