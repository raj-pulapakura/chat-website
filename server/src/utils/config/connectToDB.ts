import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { env } from "../../constants";
import { Chat } from "../../entities/Chat";
import { Room } from "../../entities/Room";
import { User } from "../../entities/User";
import { UserRoom } from "../../entities/UserRoom";
import { delay } from "../misc/delay";

const dbConfig = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_DATABASE,
  type: "mysql",
  entities: [User, Room, Chat, UserRoom],
  synchronize: true,
} as ConnectionOptions;

export const connectToDB = async (): Promise<Connection> => {
  try {
    console.log("attempting to reach database");
    console.log("DB CONFIG", dbConfig);
    const conn = await createConnection(dbConfig);
    console.log("connected to database");
    return conn;
  } catch (e) {
    console.log("couldn't connect because...");
    console.log(e);
    await delay(3000);
    return await connectToDB();
  }
};
