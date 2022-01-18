import { Field, ObjectType } from "type-graphql";
import { AccountGraphql } from "../AccountGraphql";

@ObjectType()
export class CurrentUserResponse {
  @Field(() => Boolean)
  userIsLoggedIn!: boolean;

  @Field(() => AccountGraphql, { nullable: true })
  account?: AccountGraphql;
}
