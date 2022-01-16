import { Field, Float, ObjectType } from "type-graphql";
import { BaseGraphql } from "../../objects/BaseGraphql";
import { AuthorGraphql } from "../Author/AuthorGraphql";

@ObjectType()
export class BookGraphql extends BaseGraphql {
  @Field(() => String)
  title!: string;

  @Field(() => Float)
  price!: number;

  @Field(() => AuthorGraphql)
  author!: AuthorGraphql;
}
