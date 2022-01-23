import { Field, ObjectType } from "type-graphql";
import { ErrorUnionType } from "../../../objects/ErrorUnionType";
import { InviteRequestGraphql } from "../InviteRequestGraphql";

@ObjectType()
export class InviteRequestGeneralResponse {
  @Field(() => InviteRequestGraphql, { nullable: true })
  inviteRequest?: InviteRequestGraphql;

  @Field(() => ErrorUnionType, { nullable: true })
  error?: typeof ErrorUnionType;
}
