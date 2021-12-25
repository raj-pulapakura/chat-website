import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Chat } from "./Chat";
import { Room } from "./Room";
import { UserRoom } from "./UserRoom";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  password!: string;

  @OneToMany(() => Room, (room) => room.creator)
  rooms!: Room[];

  @OneToMany(() => Chat, (chat) => chat.sender)
  chats!: Chat[];

  @OneToMany(() => UserRoom, (userRoom) => userRoom.user)
  userRoom!: UserRoom;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: string;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: string;
}
