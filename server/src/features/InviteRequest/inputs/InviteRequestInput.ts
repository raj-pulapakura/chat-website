import { Field, ID, InputType } from "type-graphql";

@InputType()
export class InviteRequestInput {
  @Field(() => ID)
  senderId!: string;

  @Field(() => ID)
  recepientId!: string;

  @Field(() => ID)
  roomId!: string;
}
