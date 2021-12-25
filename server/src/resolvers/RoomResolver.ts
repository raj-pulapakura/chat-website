import { Arg, ID, Int, Mutation, Query, Resolver } from "type-graphql";
import { Room } from "../entities/Room";
import { User } from "../entities/User";
import { RoomResponse } from "../objectTypes";
import { v4 as uuid } from "uuid";
import { UserRoom } from "../entities/UserRoom";

@Resolver()
export class RoomResolver {
  @Query(() => Room, { nullable: true })
  async roomById(@Arg("id", () => ID!) id: number): Promise<Room | null> {
    const room = await Room.findOne(id);
    if (!room) {
      return null;
    }
    return room;
  }

  @Query(() => Room, { nullable: true })
  async roomByPublicId(
    @Arg("publicId", () => String!) publicId: string
  ): Promise<Room | null> {
    const room = await Room.findOne({ where: { publicId } });
    if (!room) {
      return null;
    }
    return room;
  }

  @Query(() => Room, { nullable: true })
  async roomByName(
    @Arg("name", () => String!) name: string
  ): Promise<Room | null> {
    const room = await Room.findOne({ where: { name } });
    if (!room) {
      return null;
    }
    return room;
  }

  @Query(() => [Room])
  async roomsByUser(@Arg("userId", () => ID!) userId: number) {
    const userRoomConnections = await UserRoom.find({
      where: { userId },
    });
    const rooms = [];
    for (const userRoomConnection of userRoomConnections) {
      rooms.push(await Room.findOne(userRoomConnection.roomId));
    }
    return rooms as Room[];
  }

  @Query(() => [Room])
  async roomsByCreator(
    @Arg("creatorId", () => ID!) creatorId: number
  ): Promise<Room[]> {
    return await Room.find({ where: { creatorId } });
  }

  @Query(() => [Room])
  async roomsByJoin(@Arg("userId", () => ID!) userId: number): Promise<Room[]> {
    const userRoomConnections = await UserRoom.find({
      where: { userId, creator: false },
    });
    const rooms = [];
    for (const userRoomConnection of userRoomConnections) {
      rooms.push(await Room.findOne(userRoomConnection.roomId));
    }
    return rooms as Room[];
  }

  @Query(() => [Room])
  rooms(): Promise<Room[]> {
    return Room.find({});
  }

  @Mutation(() => RoomResponse)
  async createRoom(
    @Arg("name", () => String!) name: string,
    @Arg("description", () => String!) description: string,
    @Arg("creatorId", () => ID!) creatorId: number
  ): Promise<RoomResponse> {
    // check if creator exists
    const creatorExists = await User.findOne(creatorId);
    if (!creatorExists) {
      return {
        error: {
          field: "creatorId",
          message: "a user with that id does not exist",
        },
      };
    }

    const room = Room.create({
      name,
      creatorId,
      publicId: uuid(),
      description,
    });
    const savedRoom = await room.save();

    // joining creator to room
    UserRoom.create({
      userId: creatorId,
      roomId: savedRoom.id,
      creator: true,
    }).save();

    return {
      room: savedRoom,
    };
  }
}
