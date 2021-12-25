import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Room } from "./Room";
import { User } from "./User";

@ObjectType()
@Entity()
export class Chat extends BaseEntity {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String!)
  @Column({ type: "varchar" })
  text!: string;

  @ManyToOne(() => Room, (room) => room.chats, { onDelete: "CASCADE" })
  room!: Room;

  @Field(() => Int!)
  @Column({ type: "int" })
  roomId!: number;

  @ManyToOne(() => User, (user) => user.chats, { onDelete: "CASCADE" })
  sender!: User;

  @Field(() => ID!)
  @Column({ type: "int" })
  senderId!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: string;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: string;
}
