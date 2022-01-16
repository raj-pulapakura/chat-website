import { Field, ObjectType } from "type-graphql";
import { BaseGraphql } from "../../objects/BaseGraphql";
import { BookGraphql } from "../Book/BookGraphql";

@ObjectType()
export class AuthorGraphql extends BaseGraphql {
  @Field(() => String)
  firstName!: string;

  @Field(() => String)
  lastName!: string;

  @Field(() => [BookGraphql])
  books!: BookGraphql[];
}

