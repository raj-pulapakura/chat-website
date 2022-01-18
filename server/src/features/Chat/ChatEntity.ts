import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseModel } from "../../objects/BaseModel";
import { AccountEntity } from "../Account/AccountEntity";
import { RoomEntity } from "../Room/RoomEntity";

@Entity("chat")
export class ChatEntity extends BaseModel {
  @Column({ type: "varchar" })
  text!: string;

  // multiple chats can be created by a single account
  @Column({ type: "varchar" })
  senderId!: string;
  @ManyToOne(() => AccountEntity, (account) => account.chatSenderConnection)
  @JoinColumn({ name: "senderId" })
  chatSenderConnection!: AccountEntity;

  // mutiple chats can belong to a single room
  @ManyToOne(() => RoomEntity, (room) => room.chatRoomConnection)
  @JoinColumn({ name: "roomId" })
  chatRoomConnection!: RoomEntity;
  @Column({ type: "varchar" })
  roomId!: string;
}
