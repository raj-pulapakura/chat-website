import { Context } from "../../types";
import { AccountEntity } from "../Account/AccountEntity";
import { AccountService } from "../Account/AccountService";
import { RoomEntity } from "../Room/RoomEntity";
import { RoomService } from "../Room/RoomService";
import { AccountRoomEntity } from "./AccountRoomEntity";
import { JoinAccountToRoomResponse } from "./objects/JoinAccountToRoomResponse";

export class AccountRoomService {
  static async joinCurrentUserToRoom(
    context: Context,
    roomId: string,
    isCreator: boolean
  ): Promise<JoinAccountToRoomResponse> {
    const room = await RoomEntity.findOne(roomId);

    if (!room) {
      return {
        error: {
          field: "roomId",
          message: "a room with that id does not exist",
          ufm: "A room with that id does not exist",
        },
        successfullyJoined: false,
      };
    }

    const { userIsLoggedIn, account } = await AccountService.fetchCurrentUser(
      context
    );

    if (!userIsLoggedIn || !account) {
      return {
        error: {
          field: "accountId",
          message: "not logged in",
          ufm: "You are not logged in",
        },
        successfullyJoined: false,
      };
    }

    await AccountRoomEntity.create({
      accountId: account.id,
      roomId,
      isCreator,
    }).save();

    return {
      successfullyJoined: true,
    };
  }

  static async joinAccountToRoom(
    accountId: string,
    roomId: string,
    isCreator: boolean
  ): Promise<JoinAccountToRoomResponse> {
    const accountRoom = await AccountRoomEntity.findOne({
      where: { accountId, roomId },
    });

    if (accountRoom) {
      if (accountRoom.isCreator) {
        return {
          error: {
            field: "accountId",
            message:
              "the account with that accountId is already joined to the room with that roomId",
            ufm: "You are already joined to this room, in fact, you created it!",
          },
          successfullyJoined: false,
        };
      } else {
        return {
          error: {
            field: "accountId",
            message:
              "the account with that accountId is already joined to the room with that roomId",
            ufm: "You are already joined to this room",
          },
          successfullyJoined: false,
        };
      }
    }

    const account = await AccountEntity.findOne(accountId);

    if (!account) {
      return {
        error: {
          field: "accountId",
          message: "an account with that id does not exist",
          ufm: "An account with that id does not exist",
        },
        successfullyJoined: false,
      };
    }

    const room = await RoomEntity.findOne(roomId);

    if (!room) {
      return {
        error: {
          field: "roomId",
          message: "a room with that id does not exist",
          ufm: "A room with that id does not exist",
        },
        successfullyJoined: false,
      };
    }

    await AccountRoomEntity.create({
      accountId,
      roomId,
      isCreator,
    }).save();

    return {
      successfullyJoined: true,
    };
  }
}
