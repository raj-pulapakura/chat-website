import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { CreateRoomInput } from "./inputs/CreateRoomInput";
import { RoomGeneralResponse } from "./objects/RoomGeneralResponse";
import { RoomGraphql } from "./RoomGraphql";
import { RoomService } from "./RoomService";

@Resolver()
export class RoomResolver {
  @Mutation(() => RoomGeneralResponse)
  createRoom(
    @Arg("input", () => CreateRoomInput) input: CreateRoomInput
  ): Promise<RoomGeneralResponse> {
    return RoomService.createRoom(
      input.title,
      input.creatorId,
      input.description
    );
  }

  @Query(() => [RoomGraphql])
  rooms(): Promise<RoomGraphql[]> {
    return RoomService.fetchAllRooms();
  }

  @Query(() => RoomGeneralResponse)
  room(@Arg("roomId", () => ID) roomId: string): Promise<RoomGeneralResponse> {
    return RoomService.fetchRoom(roomId);
  }
}
