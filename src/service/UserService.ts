import { Op } from "sequelize";
import User from "../model/User";
import { UserDTO, UserInfoDTO } from "../dto";

class UserService{
    public static async findByEmailAndPassword(email: string, password: string): Promise<UserDTO | null>{
        const user = await User.findOne({
            where: {
                [Op.and]: [
                    {
                        email: email
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

    public static async findById(id: string): Promise<UserInfoDTO | null>{
        const user = await User.findOne({
            attributes: {
                exclude: ["password", "token", "createdAt", "updatedAt"]
            },
            where: {
                id: id
            }
        });

        return user ? user.get() : null;
    }

    public static async create(user: Pick<UserDTO, "email" | "password" | "firstName" | "lastName" | "birthDay" | "phone">): Promise<UserDTO>{
        const createdUser = await User.create({
            email: user.email,
            password:  user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            birthDay: user.birthDay,
            phone: user.phone
        });

        return createdUser.get();
    }

    // public static async getInfo(token: string): Promise<UserDTO | null>{
    //     const user = await User.findOne({
            
    //         where: {
    //             token: token
    //         }
    //     })

    //     return user ? user.get() : null
    // }
}

export default UserService;