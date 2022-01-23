import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseModel } from "../../objects/BaseModel";
import { AccountEntity } from "../Account/AccountEntity";
import { RoomEntity } from "../Room/RoomEntity";

@Entity("account_room")
export class AccountRoomEntity extends BaseModel {
  // multiple accounts can by joined to a single room
  @Column({ type: "varchar" })
  accountId!: string;
  @ManyToOne(() => AccountEntity, (account) => account.accountJoinedToRooms, {
    primary: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "accountId" })
  accountsConnection!: AccountEntity;

  // multiple rooms can be joined to a single account
  @Column({ type: "varchar" })
  roomId!: string;
  @ManyToOne(() => RoomEntity, (room) => room.roomJoinedToAccounts, {
    primary: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "roomId" })
  roomsConnection!: RoomEntity;

  @Column({ type: "boolean" })
  isCreator!: boolean;
}
