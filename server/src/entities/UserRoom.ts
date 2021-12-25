import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Room } from "./Room";
import { User } from "./User";

@Entity()
@ObjectType()
export class UserRoom extends BaseEntity {
  @Field(() => ID!)
  @PrimaryColumn({ type: "int" })
  userId!: number;

  @Field(() => ID!)
  @PrimaryColumn({ type: "int" })
  roomId!: number;

  @Field(() => Boolean)
  @Column({ type: "tinyint" })
  creator!: boolean;

  @ManyToOne(() => User, (user) => user.userRoom, {
    primary: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => Room, (room) => room.userRoom, {
    primary: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "roomId" })
  room!: Room;
}
