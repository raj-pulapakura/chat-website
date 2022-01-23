import { AccountEntity } from "../Account/AccountEntity";
import { AccountError } from "../Account/AccountError";
import { RoomEntity } from "../Room/RoomEntity";
import { RoomError } from "../Room/RoomError";
import { ChatEntity } from "./ChatEntity";
import { ChatGeneralResponse } from "./objects/ChatGeneralResponse";
import { ChatsGeneralResponse } from "./objects/ChatsGeneralResponse";

export class ChatService {
  static async createChat(
    text: string,
    senderId: string,
    roomId: string
  ): Promise<ChatGeneralResponse> {
    const sender = await AccountEntity.findOne(senderId);

    if (!sender) {
      return {
        error: {
          field: "senderId",
          message: AccountError.accountWithThatIdDoesNotExist.message,
          ufm: AccountError.accountWithThatIdDoesNotExist.ufm,
        },
      };
    }

    const room = await RoomEntity.findOne(roomId);

    if (!room) {
      return {
        error: {
          field: "roomId",
          message: RoomError.roomWithThatIdDoesNotExist.message,
          ufm: RoomError.roomWithThatIdDoesNotExist.ufm,
        },
      };
    }

    const newChat = await ChatEntity.create({ text, senderId, roomId }).save();
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
          message: RoomError.roomWithThatIdDoesNotExist.message,
          ufm: RoomError.roomWithThatIdDoesNotExist.ufm,
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
          message: AccountError.accountWithThatIdDoesNotExist.message,
          ufm: AccountError.accountWithThatIdDoesNotExist.ufm,
        },
      };
    }

    const chats = await ChatEntity.find({ where: { senderId: accountId } });

    return {
      chats,
    };
  }
}
