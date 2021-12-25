import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Chat } from "./Chat";
import { User } from "./User";
import { UserRoom } from "./UserRoom";

@Entity()
@ObjectType()
export class Room extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true, type: "varchar" })
  publicId!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  name!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  description!: string;

  @Field(() => Number)
  @Column({ type: "int" })
  creatorId!: number;

  @ManyToOne(() => User, (user) => user.rooms, { onDelete: "CASCADE" })
  creator!: User;

  @OneToMany(() => Chat, (chat) => chat.room)
  chats!: Chat[];

  @OneToMany(() => UserRoom, (userRoom) => userRoom.room)
  userRoom!: UserRoom;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: string;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: string;
}
