import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../../../objects/FieldError";
import { AuthorGraphql } from "../AuthorGraphql";

@ObjectType()
export class AuthorGeneralResponse {
  @Field(() => AuthorGraphql, { nullable: true })
  author?: AuthorGraphql;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}

