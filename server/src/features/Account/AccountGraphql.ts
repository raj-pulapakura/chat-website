import { Field, ObjectType } from "type-graphql";
import { BaseGraphql } from "../../objects/BaseGraphql";
import { ChatGraphql } from "../Chat/ChatGraphql";
import { RoomGraphql } from "../Room/RoomGraphql";

@ObjectType()
export class AccountGraphql extends BaseGraphql {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  password!: string;

  @Field(() => [RoomGraphql])
  rooms!: RoomGraphql[];

  @Field(() => [ChatGraphql])
  chats!: ChatGraphql[];
}
