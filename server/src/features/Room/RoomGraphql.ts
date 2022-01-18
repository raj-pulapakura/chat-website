import { Field, ID, ObjectType } from "type-graphql";
import { BaseGraphql } from "../../objects/BaseGraphql";
import { ChatGraphql } from "../Chat/ChatGraphql";

@ObjectType()
export class RoomGraphql extends BaseGraphql {
  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => ID)
  creatorId!: string;

  @Field(() => [ChatGraphql])
  chats!: ChatGraphql[];
}
