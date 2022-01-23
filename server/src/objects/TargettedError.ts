import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TargettedError {
  @Field(() => String)
  message!: string;

  @Field(() => String)
  ufm!: String; // user friendly message
}
