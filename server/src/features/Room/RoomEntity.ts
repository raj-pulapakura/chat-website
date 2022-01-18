import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "../../objects/BaseModel";
import { AccountEntity } from "../Account/AccountEntity";
import { AccountRoomEntity } from "../AccountRoom/AccountRoomEntity";
import { ChatEntity } from "../Chat/ChatEntity";

@Entity("room")
export class RoomEntity extends BaseModel {
  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  // multiple rooms can be created by a single account
  @Column({ type: "varchar" })
  creatorId!: string;
  @ManyToOne(() => AccountEntity, (account) => account.roomCreatorConnection)
  @JoinColumn({ name: "creatorId" })
  roomCreatorConnection!: AccountEntity;

  // a single room can by joined to by multiple accounts
  @OneToMany(
    () => AccountRoomEntity,
    (accountRoomConn) => accountRoomConn.roomsConnection
  )
  roomJoinedToAccounts!: AccountRoomEntity[];

  // a single room can have multiple chats
  @OneToMany(() => ChatEntity, chat => chat.chatRoomConnection)
  chatRoomConnection!: ChatEntity[];
}
