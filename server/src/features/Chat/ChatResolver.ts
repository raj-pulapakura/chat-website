import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { ChatService } from "./ChatService";
import { CreateChatInput } from "./inputs/CreateChatInput";
import { ChatGeneralResponse } from "./objects/ChatGeneralResponse";

@Resolver()
export class ChatResolver {
  @Mutation(() => ChatGeneralResponse)
  createChat(
    @Arg("input", () => CreateChatInput) input: CreateChatInput
  ): Promise<ChatGeneralResponse> {
    return ChatService.createChat(input.text, input.senderId, input.roomId);
  }
}
