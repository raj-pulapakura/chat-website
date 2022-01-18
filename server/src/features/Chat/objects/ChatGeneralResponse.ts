import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../../../objects/FieldError";
import { ChatGraphql } from "../ChatGraphql";

@ObjectType()
export class ChatGeneralResponse {
  @Field(() => ChatGraphql, { nullable: true })
  chat?: ChatGraphql;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
