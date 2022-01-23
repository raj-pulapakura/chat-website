import { Field, ObjectType } from "type-graphql";
import { ErrorUnionType } from "../../../objects/ErrorUnionType";
import { FieldError } from "../../../objects/FieldError";

@ObjectType()
export class AcceptInviteRequestResponse {
  @Field(() => Boolean)
  successfullyAccepted!: boolean;

  @Field(() => ErrorUnionType, { nullable: true })
  error?: typeof ErrorUnionType;
}
