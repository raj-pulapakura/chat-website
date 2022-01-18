import { Entity, Column, OneToMany } from "typeorm";
import { BaseModel } from "../../objects/BaseModel";
import { AccountRoomEntity } from "../AccountRoom/AccountRoomEntity";
import { ChatEntity } from "../Chat/ChatEntity";
import { RoomEntity } from "../Room/RoomEntity";

@Entity("account")
export class AccountEntity extends BaseModel {
  @Column({ type: "varchar" })
  username!: string;

  @Column({ type: "varchar" })
  password!: string;

  // a single account can create multiple rooms
  @OneToMany(() => RoomEntity, (room) => room.roomCreatorConnection)
  roomCreatorConnection!: RoomEntity[];

  // a single account can be joined to multiple rooms
  @OneToMany(
    () => AccountRoomEntity,
    (accountRoomConn) => accountRoomConn.accountsConnection
  )
  accountJoinedToRooms!: AccountRoomEntity;

  // a single account can create multiple chats
  @OneToMany(() => ChatEntity, (chat) => chat.chatSenderConnection)
  chatSenderConnection!: ChatEntity[];
}
