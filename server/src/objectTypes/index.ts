import { ObjectType, Field } from "type-graphql";
import { Chat } from "../entities/Chat";
import { Room } from "../entities/Room";
import { User } from "../entities/User";
import { UserRoom } from "../entities/UserRoom";

@ObjectType()
export class FieldError {
  @Field(() => String)
  field!: string;

  @Field(() => String)
  message!: string;
}

@ObjectType()
export class ExtendedFieldError {
  @Field(() => String)
  field!: string;

  @Field(() => String)
  message!: string;

  @Field(() => String)
  resp!: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}

@ObjectType()
export class RoomResponse {
  @Field(() => Room, { nullable: true })
  room?: Room;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}

@ObjectType()
export class ChatResponse {
  @Field(() => Chat, { nullable: true })
  chat?: Chat;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}

@ObjectType()
export class UserRoomResponse {
  @Field(() => UserRoom, { nullable: true })
  userRoom?: UserRoom;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}

@ObjectType()
export class ExtendedUserRoomResponse {
  @Field(() => UserRoom, { nullable: true })
  userRoom?: UserRoom;

  @Field(() => ExtendedFieldError, { nullable: true })
  error?: ExtendedFieldError;
}
