import { AccountEntity } from "../Account/AccountEntity";
import { RoomEntity } from "../Room/RoomEntity";
import { ChatEntity } from "./ChatEntity";
import { ChatGeneralResponse } from "./objects/ChatGeneralResponse";
import { ChatsGeneralResponse } from "./objects/ChatsGeneralResponse";

export class ChatService {
  static async createChat(
    text: string,
    senderId: string,
    roomId: string
  ): Promise<ChatGeneralResponse> {
    console.log({ text, senderId, roomId });
    const newChat = await ChatEntity.create({ text, senderId, roomId }).save();
    console.log({ newChat });
    return {
      chat: newChat,
    };
  }

  static async fetchChatsByRoom(roomId: string): Promise<ChatsGeneralResponse> {
    const room = await RoomEntity.findOne(roomId);
    if (!room) {
      return {
        error: {
          field: "roomId",
          message: "a room with that id does not exist",
          ufm: "A room with that id does not exist",
        },
      };
    }

    const chats = await ChatEntity.find({ where: { roomId } });

    return {
      chats,
    };
  }

  static async fetchChatsByAccount(
    accountId: string
  ): Promise<ChatsGeneralResponse> {
    const account = await AccountEntity.findOne(accountId);
    if (!account) {
      return {
        error: {
          field: "accountId",
          message: "an account with that id does not exist",
          ufm: "An account with that id does not exist",
        },
      };
    }

    const chats = await ChatEntity.find({ where: { senderId: accountId } });

    return {
      chats,
    };
  }
}
