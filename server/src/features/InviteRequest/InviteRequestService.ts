import { FieldError } from "../../objects/FieldError";
import { TargettedError } from "../../objects/TargettedError";
import { AccountEntity } from "../Account/AccountEntity";
import { InviteRequestGeneralResponse } from "./objects/InviteRequestGeneralResponse";
import { InviteRequestEntity } from "./InviteRequestEntity";
import { AcceptInviteRequestResponse } from "./objects/AcceptInviteRequestResponse";
import { AccountRoomService } from "../AccountRoom/AccountRoomService";
import { RoomEntity } from "../Room/RoomEntity";
import { AccountError } from "../Account/AccountError";
import { RoomError } from "../Room/RoomError";
import { InviteRequestError } from "./InviteRequestError";
import { InviteRequestGraphql } from "./InviteRequestGraphql";
import { InviteRequestsGeneralResponse } from "./objects/InviteRequestsGeneralResponse";

export class InviteRequestService {
  static async fetchInviteRequestBySender(
    senderId: string
  ): Promise<InviteRequestsGeneralResponse> {
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

    return {
      inviteRequests: await InviteRequestEntity.find({ where: { senderId } }),
    };
  }

  static async fetchInviteRequestsByRecepient(
    recepientId: string
  ): Promise<InviteRequestsGeneralResponse> {
    const recepient = await AccountEntity.findOne(recepientId);

    if (!recepient) {
      return {
        error: {
          field: "recepientId",
          message: AccountError.accountWithThatIdDoesNotExist.message,
          ufm: AccountError.accountWithThatIdDoesNotExist.ufm,
        },
      };
    }
    return {
      inviteRequests: await InviteRequestEntity.find({ where: { recepientId } }),
    };
  }

  static async acceptInviteRequest(
    senderId: string,
    recepientId: string,
    roomId: string
  ): Promise<AcceptInviteRequestResponse> {
    // delete the invite request entity from the database
    try {
      await InviteRequestEntity.delete({ senderId, recepientId, roomId });
    } catch {
      return {
        error: {
          message: InviteRequestError.inviteRequestDoesNotExist.message,
          ufm: InviteRequestError.inviteRequestDoesNotExist.ufm,
        } as TargettedError,
        successfullyAccepted: false,
      };
    }

    // join the user into the room
    const response = await AccountRoomService.joinAccountToRoom(
      recepientId,
      roomId,
      false
    );

    if (response.error) {
      // recreate invite request
      await this.createInviteRequest(senderId, recepientId, roomId);

      return {
        error: response.error,
        successfullyAccepted: false,
      };
    }

    return {
      successfullyAccepted: true,
    };
  }

  static async createInviteRequest(
    senderId: string,
    recepientId: string,
    roomId: string
  ): Promise<InviteRequestGeneralResponse> {
    const sender = await AccountEntity.findOne(senderId);

    if (!sender) {
      return {
        error: {
          field: "senderId",
          message: AccountError.accountWithThatIdDoesNotExist.message,
          ufm: AccountError.accountWithThatIdDoesNotExist.ufm,
        } as FieldError,
      };
    }

    const recepient = await AccountEntity.findOne(recepientId);

    if (!recepient) {
      return {
        error: {
          field: "recepientId",
          message: AccountError.accountWithThatIdDoesNotExist.message,
          ufm: AccountError.accountWithThatIdDoesNotExist.ufm,
        } as FieldError,
      };
    }

    const room = await RoomEntity.findOne(roomId);

    if (!room) {
      return {
        error: {
          field: "roomId",
          message: RoomError.roomWithThatIdDoesNotExist.message,
          ufm: RoomError.roomWithThatIdDoesNotExist.ufm,
        } as FieldError,
      };
    }

    const inviteRequestAlreadyExists = await InviteRequestEntity.findOne({
      where: { senderId, recepientId, roomId },
    });

    if (inviteRequestAlreadyExists) {
      return {
        error: {
          message: InviteRequestError.inviteRequestAlreadyExists.message,
          ufm: InviteRequestError.inviteRequestAlreadyExists.ufm,
        } as TargettedError,
      };
    }

    const newInviteRequest = await InviteRequestEntity.create({
      senderId,
      recepientId,
      roomId,
    }).save();

    return {
      inviteRequest: newInviteRequest,
    };
  }
}
