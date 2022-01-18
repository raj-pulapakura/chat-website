import { Field, ID, ObjectType } from "type-graphql";
import { BaseGraphql } from "../../objects/BaseGraphql";

@ObjectType()
export class ChatGraphql extends BaseGraphql {
  @Field(() => String)
  text!: string;

  @Field(() => ID)
  senderId!: String;

  @Field(() => ID)
  roomId!: String;
}
