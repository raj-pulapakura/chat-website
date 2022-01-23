import { ConnectionOptions } from "typeorm";
import { env } from "../constants";
import { AccountEntity } from "../features/Account/AccountEntity";
import { RoomEntity } from "../features/Room/RoomEntity";
import { ChatEntity } from "../features/Chat/ChatEntity";
import { AccountRoomEntity } from "../features/AccountRoom/AccountRoomEntity";
import { InviteRequestEntity } from "../features/InviteRequest/InviteRequestEntity";

export const dbConfig: ConnectionOptions = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  type: "mysql",
  synchronize: true,
  entities: [
    AccountEntity, // user accounts
    RoomEntity, // rooms
    ChatEntity, // chat objects
    AccountRoomEntity, // accounts joined to rooms
    InviteRequestEntity, // room invite requests
  ],
};
