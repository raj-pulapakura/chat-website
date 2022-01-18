import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateRoomInput {
  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => ID)
  creatorId!: string;
}
