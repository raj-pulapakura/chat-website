import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../../../objects/FieldError";
import { AccountGraphql } from "../AccountGraphql";

@ObjectType()
export class AccountGeneralResponse {
  @Field(() => AccountGraphql, { nullable: true })
  account?: AccountGraphql;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
