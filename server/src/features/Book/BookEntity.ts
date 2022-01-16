import { Column, Entity, ManyToOne } from "typeorm";
import { BaseModel } from "../../objects/BaseModel";
import { AuthorEntity } from "../Author/AuthorEntity";

@Entity()
export class BookEntity extends BaseModel {
  @Column({ type: "text" })
  title!: string;

  @Column({ type: "float" })
  price!: number;

  @Column({ type: "varchar" })
  authorId!: string;

  @ManyToOne(() => AuthorEntity, (author) => author.books, {
    onDelete: "CASCADE",
  })
  author!: AuthorEntity;
}
