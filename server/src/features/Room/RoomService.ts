import { AccountEntity } from "../Account/AccountEntity";
import { AccountRoomEntity } from "../AccountRoom/AccountRoomEntity";
import { ChatService } from "../Chat/ChatService";
import { RoomGeneralResponse } from "./objects/RoomGeneralResponse";
import { RoomsGeneralResponse } from "./objects/RoomsGeneralResponse";
import { RoomEntity } from "./RoomEntity";
import { RoomGraphql } from "./RoomGraphql";

export class RoomService {
  static async fetchRoom(roomId: string): Promise<RoomGeneralResponse> {
    const room = await RoomEntity.findOne(roomId);
    const roomDoesNotExistError: RoomGeneralResponse["error"] = {
      field: "id",
      message: "a room with that id does not exist",
      ufm: "A room with that id does not exist",
    };

    if (!room) {
      return {
        error: roomDoesNotExistError,
      };
    }

    const roomChats = await ChatService.fetchChatsByRoom(roomId);

    return {
      room: {
        ...room,
        chats: roomChats.chats || [],
      },
    };
  }

  static async fetchRoomsWithIds(roomIds: string[]): Promise<RoomGraphql[]> {
    const roomGraphqls: RoomGraphql[] = [];
    for (const id of roomIds) {
      const roomResponse = await this.fetchRoom(id);
      if (!roomResponse.error && roomResponse.room) {
        roomGraphqls.push(roomResponse.room);
      }
    }
    return roomGraphqls;
  }

  static async fetchAllRooms(): Promise<RoomGraphql[]> {
    const roomIds = (await RoomEntity.find({})).map((room) => room.id);
    return this.fetchRoomsWithIds(roomIds);
  }

  static async fetchRoomsByAccount(
    accountId: string
  ): Promise<RoomsGeneralResponse> {
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

    const roomIds = (
      await RoomEntity.find({ where: { creatorId: accountId } })
    ).map((room) => room.id);

    return {
      rooms: await this.fetchRoomsWithIds(roomIds),
    };
  }

  static async createRoom(
    title: string,
    creatorId: string,
    description?: string
  ): Promise<RoomGeneralResponse> {
    const userHasAlreadyCreatedRoom = await RoomEntity.findOne({
      where: { title, creatorId },
    });
    if (userHasAlreadyCreatedRoom) {
      return {
        error: {
          field: "title",
          message:
            "the user with that id has already created a room with that title",
          ufm: "You have already created a room with that title. Please choose a different one",
        },
      };
    }

    const newRoom = await RoomEntity.create({
      title,
      description,
      creatorId,
    }).save();

    await AccountRoomEntity.create({
      accountId: creatorId,
      roomId: newRoom.id,
      isCreator: true,
    }).save();

    return {
      room: {
        ...newRoom,
        chats: [],
      },
    };
  }
}
