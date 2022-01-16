import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../../../objects/FieldError";
import { BookGraphql } from "../BookGraphql";

@ObjectType()
export class BookGeneralResponse {
  @Field(() => BookGraphql, { nullable: true })
  book?: BookGraphql;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}
