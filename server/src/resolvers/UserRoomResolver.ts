import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Room } from "../entities/Room";
import { User } from "../entities/User";
import { UserRoom } from "../entities/UserRoom";
import { UserRoomResponse, ExtendedUserRoomResponse } from "../objectTypes";

@Resolver()
export class UserRoomResolver {
  @Query(() => [UserRoom])
  async userRooms(): Promise<UserRoom[]> {
    return await UserRoom.find({});
  }

  @Query(() => [UserRoom])
  async userRoomsByUser(
    @Arg("userId", () => ID!) userId: number
  ): Promise<UserRoom[]> {
    return await UserRoom.find({ where: { userId } });
  }

  @Query(() => [UserRoom])
  async userRoomsByRoom(
    @Arg("roomId", () => ID!) roomId: number
  ): Promise<UserRoom[]> {
    return await UserRoom.find({ where: { roomId } });
  }

  @Query(() => UserRoom)
  async userRoom(
    @Arg("userId", () => ID!) userId: number,
    @Arg("roomId", () => ID!) roomId: number
  ): Promise<UserRoom | null> {
    const userRoom = await UserRoom.findOne({ where: { userId, roomId } });
    if (!userRoom) {
      return null;
    }
    return userRoom;
  }

  @Mutation(() => UserRoomResponse)
  async createUserRoom(
    @Arg("userId", () => ID!) userId: number,
    @Arg("roomId", () => ID!) roomId: number
  ): Promise<UserRoomResponse> {
    // check if userRoom already exists
    const userRoomAlreadyExists = await UserRoom.findOne({
      where: { userId, roomId },
    });
    if (userRoomAlreadyExists) {
      return {
        error: {
          field: "userId",
          message: "this userId is already joined to this room",
        },
      };
    }

    // create userRoom
    const userRoom = await UserRoom.create({
      userId,
      roomId,
      creator: true,
    }).save();

    return {
      userRoom,
    };
  }

  @Mutation(() => ExtendedUserRoomResponse)
  async joinRoom(
    @Arg("userId", () => ID!) userId: string,
    @Arg("publicId", () => ID!) publicId: string
  ): Promise<ExtendedUserRoomResponse> {
    // check if user exists
    const userExists = await User.findOne(userId);
    if (!userExists) {
      return {
        error: {
          field: "userId",
          message: "a user with that id does not exist",
          resp: "",
        },
      };
    }

    // check if room exists
    const room = await Room.findOne({ where: { publicId } });
    if (!room) {
      return {
        error: {
          field: "publicId",
          message: "a room with that publicId does not exist",
          resp: "A room with that ID does not exist. Try again.",
        },
      };
    }

    // check if user is already joined to room
    const userIsAlreadyJoinedToRoom = await UserRoom.findOne({
      where: { userId, roomId: room.id },
    });

    if (userIsAlreadyJoinedToRoom) {
      if (room.creatorId.toString() === userId) {
        return {
          error: {
            field: "userId",
            message:
              "the user with that id is already joined to this room, in fact he/she is the creator of the room!",
            resp: "You are already joined to this room, in fact, you created it!",
          },
        };
      }

      return {
        error: {
          field: "userId",
          message: "the user with that id is already joined to this room",
          resp: "You are already joined to this room",
        },
      };
    }

    // join user to room
    const userRoom = await UserRoom.create({
      userId: parseInt(userId),
      roomId: room.id,
      creator: false,
    }).save();

    return {
      userRoom,
    };
  }
}
