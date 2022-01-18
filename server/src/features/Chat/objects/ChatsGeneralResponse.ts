import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../../../objects/FieldError";
import { ChatGraphql } from "../ChatGraphql";

@ObjectType()
export class ChatsGeneralResponse {
  @Field(() => [ChatGraphql], { nullable: true })
  chats?: ChatGraphql[];

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
