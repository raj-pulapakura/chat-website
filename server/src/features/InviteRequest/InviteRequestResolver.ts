import { Arg, Mutation, Resolver } from "type-graphql";
import { InviteRequestInput } from "./inputs/InviteRequestInput";
import { InviteRequestGeneralResponse } from "./objects/InviteRequestGeneralResponse";
import { InviteRequestService } from "./InviteRequestService";
import { AcceptInviteRequestResponse } from "./objects/AcceptInviteRequestResponse";

@Resolver()
export class InviteRequestResolver {
  @Mutation(() => InviteRequestGeneralResponse)
  createInviteRequest(
    @Arg("input", () => InviteRequestInput)
    input: InviteRequestInput
  ): Promise<InviteRequestGeneralResponse> {
    return InviteRequestService.createInviteRequest(
      input.senderId,
      input.recepientId,
      input.roomId
    );
  }

  // @Mutation(() => AcceptInviteRequestResponse)
  // acceptInviteRequest(
  //   @Arg("input", () => InviteRequestInput) input: InviteRequestInput
  // ): Promise<AcceptInviteRequestResponse> {
  //   return InviteRequestService.acceptInviteRequest(
  //     input.senderId,
  //     input.recepientId,
  //     input.roomId
  //   );
  // }
}
