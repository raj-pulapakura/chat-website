import { Field, ObjectType } from "type-graphql";
import { ErrorUnionType } from "../../../objects/ErrorUnionType";
import { InviteRequestGraphql } from "../InviteRequestGraphql";

@ObjectType()
export class InviteRequestsGeneralResponse {
  @Field(() => [InviteRequestGraphql], { nullable: true })
  inviteRequests?: InviteRequestGraphql[];

  @Field(() => ErrorUnionType, { nullable: true })
  error?: typeof ErrorUnionType;
}
