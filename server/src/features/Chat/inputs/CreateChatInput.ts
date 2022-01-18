import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateChatInput {
  @Field(() => String)
  text!: string;

  @Field(() => ID)
  senderId!: string;

  @Field(() => ID)
  roomId!: string;
}
