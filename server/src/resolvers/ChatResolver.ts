import { Arg, ID, Int, Mutation, Query, Resolver } from "type-graphql";
import { Chat } from "../entities/Chat";
import { Room } from "../entities/Room";
import { User } from "../entities/User";
import { ChatResponse } from "../objectTypes";

@Resolver()
export class ChatResolver {
  @Query(() => [Chat])
  async chats(): Promise<Chat[]> {
    return await Chat.find({});
  }

  @Query(() => Chat, { nullable: true })
  async chatById(@Arg("id", () => ID!) id: number): Promise<Chat | null> {
    const chat = await Chat.findOne(id);
    if (!chat) {
      return null;
    }
    return chat;
  }

  @Query(() => [Chat])
  async chatsBySender(
    @Arg("senderId", () => ID!) senderId: number
  ): Promise<Chat[]> {
    return await Chat.find({ where: { senderId } });
  }

  @Query(() => [Chat])
  async chatsByRoom(@Arg("roomId", () => ID!) roomId: number): Promise<Chat[]> {
    return await Chat.find({ where: { roomId }, order: { createdAt: "ASC" } });
  }

  @Mutation(() => ChatResponse)
  async createChat(
    @Arg("text", () => String!) text: string,
    @Arg("senderId", () => ID!) senderId: number,
    @Arg("roomId", () => ID!) roomId: number
  ): Promise<ChatResponse> {
    // check if sender exists
    const senderExists = await User.findOne(senderId);
    if (!senderExists) {
      return {
        error: {
          field: "senderId",
          message: "a user with that id does not exist",
        },
      };
    }

    // check if room exists
    const roomExists = await Room.findOne({
      where: { id: roomId },
    });
    if (!roomExists) {
      return {
        error: {
          field: "roomId",
          message: "a room with that id does not exist",
        },
      };
    }

    const chat = Chat.create({
      text,
      senderId,
      roomId,
    });
    const savedChat = await chat.save();

    return {
      chat: savedChat,
    };
  }
}
