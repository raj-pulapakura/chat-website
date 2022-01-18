import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../../../objects/FieldError";
import { RoomGraphql } from "../RoomGraphql";

@ObjectType()
export class RoomGeneralResponse {
  @Field(() => RoomGraphql, { nullable: true })
  room?: RoomGraphql;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
