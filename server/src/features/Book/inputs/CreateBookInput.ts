import { Field, Float, ID, InputType } from "type-graphql";

@InputType()
export class CreateBookInput {
  @Field(() => String)
  title!: string;

  @Field(() => Float)
  price!: number;

  @Field(() => ID)
  authorId!: string;
}
