import { Op } from "sequelize";
import User from "../model/User";
import { UserDTO } from "../dto";

class UserService{
    public static async findByUsernameAndPassword(username: string, password: string){
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

        return user ? user.get() as UserDTO : null;
    }

    public static updateUserWithToken(id: string, token: string): Promise<boolean>;
    public static updateUserWithToken(id: UserDTO, token: string): Promise<boolean>;
    public static async updateUserWithToken(id: string | UserDTO, token: string){
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
}

export default UserService;