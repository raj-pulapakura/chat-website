import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../../../objects/FieldError";

@ObjectType()
export class JoinAccountToRoomResponse {
  @Field(() => Boolean)
  successfullyJoined!: Boolean;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
