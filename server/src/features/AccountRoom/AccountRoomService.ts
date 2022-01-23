import { AccountEntity } from "../Account/AccountEntity";
import { AccountError } from "../Account/AccountError";
import { RoomEntity } from "../Room/RoomEntity";
import { RoomError } from "../Room/RoomError";
import { AccountRoomEntity } from "./AccountRoomEntity";
import { AccountRoomError } from "./AccountRoomError";
import { JoinAccountToRoomResponse } from "./objects/JoinAccountToRoomResponse";

export class AccountRoomService {
  static async joinAccountToRoom(
    accountId: string,
    roomId: string,
    isCreator: boolean
  ): Promise<JoinAccountToRoomResponse> {
    const account = await AccountEntity.findOne(accountId);

    if (!account) {
      return {
        error: {
          field: "accountId",
          message: AccountError.accountWithThatIdDoesNotExist.message,
          ufm: AccountError.accountWithThatIdDoesNotExist.ufm,
        },
        successfullyJoined: false,
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
        successfullyJoined: false,
      };
    }
    const accountRoom = await AccountRoomEntity.findOne({
      where: { accountId, roomId },
    });

    if (accountRoom) {
      if (accountRoom.isCreator) {
        return {
          error: {
            field: "accountId",
            message:
              AccountRoomError.accountAlreadyJoinedToRoomAndIsCreator.message,
            ufm: AccountRoomError.accountAlreadyJoinedToRoomAndIsCreator.ufm,
          },
          successfullyJoined: false,
        };
      } else {
        return {
          error: {
            field: "accountId",
            message: AccountRoomError.accountAlreadyJoinedToRoom.message,
            ufm: AccountRoomError.accountAlreadyJoinedToRoom.ufm,
          },
          successfullyJoined: false,
        };
      }
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
