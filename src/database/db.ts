import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.MY_SQL_DB || "",
    process.env.MY_SQL_USER || "",
    process.env.MY_SQL_PASSWORD || "",
    {
        host: process.env.MY_SQL_HOST || "",
        dialect: "mysql",
        logging: (msg) => {
            console.log("\x1b[36m", msg, "\x1b[0m");
        },
        timezone: "+07:00"
    },
);

export default sequelize;