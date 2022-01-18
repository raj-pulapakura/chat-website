import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../../../objects/FieldError";
import { RoomGraphql } from "../RoomGraphql";

@ObjectType()
export class RoomsGeneralResponse {
  @Field(() => [RoomGraphql], { nullable: true })
  rooms?: RoomGraphql[];

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
