import { Field, InputType } from "type-graphql";

@InputType()
export class CreateAuthorInput {
  @Field(() => String)
  firstName!: string;

  @Field(() => String)
  lastName!: string;
}

