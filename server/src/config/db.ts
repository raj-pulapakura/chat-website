import { ConnectionOptions } from "typeorm";
import { env } from "../constants";
import { AccountEntity } from "../features/Account/AccountEntity";
import { RoomEntity } from "../features/Room/RoomEntity";
import { ChatEntity } from "../features/Chat/ChatEntity";
import { AccountRoomEntity } from "../features/AccountRoom/AccountRoomEntity";

export const dbConfig: ConnectionOptions = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  type: "mysql",
  synchronize: true,
  entities: [AccountEntity, RoomEntity, ChatEntity, AccountRoomEntity],
};
