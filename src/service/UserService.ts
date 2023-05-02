import { Op } from "sequelize";
import User from "../model/User";
import { UserDTO } from "../dto";

class UserService{
    public static async findByUsernameAndPassword(username: string, password: string): Promise<UserDTO | null>{
        const user = await User.findOne({
            where: {
                [Op.and]: [
                    {
                        username: username
                    },
                    {
                        password: password
                    }
                ]
            }
        });

        return user ? user.get() : null;
    }

    public static updateWithToken(id: string, token: string): Promise<boolean>;
    public static updateWithToken(id: UserDTO, token: string): Promise<boolean>;
    public static async updateWithToken(id: string | UserDTO, token: string){
        const user = await User.update(
            {
                token: token
            },
            {
                where: {
                    id: typeof id === "string" ? id : id.id
                }
            }
        )

        return user[0] > 0;
    }

    public static async findByToken(token: string): Promise<UserDTO | null>{
        const user = await User.findOne({
            where: {
                token: token
            }
        })

        return user ? user.get() : null
    }
}

export default UserService;