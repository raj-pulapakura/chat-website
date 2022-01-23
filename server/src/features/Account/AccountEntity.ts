import { Entity, Column, OneToMany } from "typeorm";
import { BaseModel } from "../../objects/BaseModel";
import { AccountRoomEntity } from "../AccountRoom/AccountRoomEntity";
import { ChatEntity } from "../Chat/ChatEntity";
import { InviteRequestEntity } from "../InviteRequest/InviteRequestEntity";
import { RoomEntity } from "../Room/RoomEntity";

@Entity("account")
export class AccountEntity extends BaseModel {
  @Column({ type: "varchar" })
  username!: string;

  @Column({ type: "varchar" })
  password!: string;

  // a single account can create multiple rooms
  @OneToMany(() => RoomEntity, (room) => room.roomCreatorConnection, {
    onDelete: "CASCADE",
  })
  roomCreatorConnection!: RoomEntity[];

  // a single account can be joined to multiple rooms
  @OneToMany(
    () => AccountRoomEntity,
    (accountRoomConn) => accountRoomConn.accountsConnection,
    { onDelete: "CASCADE" }
  )
  accountJoinedToRooms!: AccountRoomEntity;

  // a single account can create multiple chats
  @OneToMany(() => ChatEntity, (chat) => chat.chatSenderConnection, {
    onDelete: "CASCADE",
  })
  chatSenderConnection!: ChatEntity[];

  // a single account can be the sender multiple invite requests
  @OneToMany(
    () => InviteRequestEntity,
    (inviteRequest) => inviteRequest.inviteRequestSenderConnection,
    { onDelete: "CASCADE" }
  )
  inviteRequestSenderConnection!: InviteRequestEntity[];

  // a single account can be the recepient of multiple invite requests
  @OneToMany(() => InviteRequestEntity, (inviteRequest) => inviteRequest, {
    onDelete: "CASCADE",
  })
  inviteRequestRecepientConnection!: InviteRequestEntity[];
}
