"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../../constants");
const Chat_1 = require("../../entities/Chat");
const Room_1 = require("../../entities/Room");
const User_1 = require("../../entities/User");
const UserRoom_1 = require("../../entities/UserRoom");
const delay_1 = require("../misc/delay");
const dbConfig = {
    username: constants_1.env.DB_USERNAME,
    password: constants_1.env.DB_PASSWORD,
    host: constants_1.env.DB_HOST,
    port: constants_1.env.DB_PORT,
    database: constants_1.env.DB_DATABASE,
    type: "mysql",
    entities: [User_1.User, Room_1.Room, Chat_1.Chat, UserRoom_1.UserRoom],
    synchronize: true,
};
const connectToDB = async () => {
    try {
        console.log("attempting to reach database");
        console.log("DB CONFIG", dbConfig);
        const conn = await (0, typeorm_1.createConnection)(dbConfig);
        console.log("connected to database");
        return conn;
    }
    catch (e) {
        console.log("couldn't connect because...");
        console.log(e);
        await (0, delay_1.delay)(3000);
        return await (0, exports.connectToDB)();
    }
};
exports.connectToDB = connectToDB;
