import { Field, ID, InputType } from "type-graphql";

@InputType()
export class UpdateAuthorInput {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;
}

