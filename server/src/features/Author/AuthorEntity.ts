import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "../../objects/BaseModel";
import { BookEntity } from "../Book/BookEntity";

@Entity()
export class AuthorEntity extends BaseModel {
  @Column({ type: "varchar" })
  firstName!: string;

  @Column({ type: "varchar" })
  lastName!: string;

  @OneToMany(() => BookEntity, (book) => book.author, { onDelete: "CASCADE" })
  books!: BookEntity[];
}

