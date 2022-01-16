import { Field, Float, ID, InputType } from "type-graphql";

@InputType()
export class UpdateBookInput {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => ID, { nullable: true })
  authorId?: string;
}
