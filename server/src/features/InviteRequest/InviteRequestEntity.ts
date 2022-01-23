import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseModel } from "../../objects/BaseModel";
import { AccountEntity } from "../Account/AccountEntity";
import { RoomEntity } from "../Room/RoomEntity";

@Entity("invite_request")
export class InviteRequestEntity extends BaseModel {
  // an invite request can only have one recepient
  @ManyToOne(
    () => AccountEntity,
    (account) => account.inviteRequestRecepientConnection,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "recepientId" })
  inviteRequestRecepientConnection!: AccountEntity;

  @Column({ type: "varchar" })
  recepientId!: string;

  // an invite request can only be created by a single account
  @ManyToOne(
    () => AccountEntity,
    (account) => account.inviteRequestSenderConnection,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "senderId" })
  inviteRequestSenderConnection!: AccountEntity;

  @Column({ type: "varchar" })
  senderId!: string;

  // an invite request can only belong to a single room
  @ManyToOne(() => RoomEntity, (room) => room, { onDelete: "CASCADE" })
  @JoinColumn({ name: "roomId" })
  inviteRequestRoomConnection!: RoomEntity;

  @Column({ type: "varchar" })
  roomId!: string;
}
