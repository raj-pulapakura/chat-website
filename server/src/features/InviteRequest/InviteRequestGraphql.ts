import { Field, ID, ObjectType } from "type-graphql";
import { BaseGraphql } from "../../objects/BaseGraphql";

@ObjectType()
export class InviteRequestGraphql extends BaseGraphql {
  @Field(() => ID)
  senderId!: string;

  @Field(() => ID)
  recepientId!: string;

  @Field(() => ID)
  roomId!: string;
}
