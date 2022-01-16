import { AuthorEntity } from "../Author/AuthorEntity";
import { BookEntity } from "./BookEntity";
import { BookGraphql } from "./BookGraphql";
import { BookGeneralResponse } from "./objects/BookGeneralResponse";

export class BookService {
  static async createBook(
    title: string,
    price: number,
    authorId: string
  ): Promise<BookGeneralResponse> {
    const author = await AuthorEntity.findOne(authorId);
    if (!author) {
      return {
        error: {
          field: "authorId",
          message: "an author with that id does not exist",
          ufm: "an author with that id does not exist",
        },
      };
    }

    const book = await BookEntity.create({ title, price, authorId }).save();

    return {
      book: {
        ...book,
        author,
      },
    };
  }

  static async fetchBooks(): Promise<BookGraphql[]> {
    const bookIds = (await BookEntity.find({})).map((book) => book.id);
    const bookGraphqls: BookGraphql[] = [];
    for (const bookId of bookIds) {
      const book = await this.fetchBook(bookId);
      if (book.error || !book.book) {
        continue;
      }
      bookGraphqls.push(book.book);
    }
    return bookGraphqls;
  }

  static async fetchBook(bookId: string): Promise<BookGeneralResponse> {
    const book = await BookEntity.findOne(bookId);
    if (!book) {
      return {
        error: {
          field: "bookId",
          message: "a book with that id does not exist",
          ufm: "A book with that id does not exist",
        },
      };
    }
    const author = await AuthorEntity.findOne(book.authorId);
    if (!author) {
      return {
        error: {
          field: "book.authorId",
          message: "an author with that authorId does not exist",
          ufm: "An author with that authorId does not exist",
        },
      };
    }
    return {
      book: {
        ...book,
        author,
      },
    };
  }

  static async deleteBook(bookId: string): Promise<Boolean> {
    try {
      await BookEntity.delete(bookId);
      return true;
    } catch (e) {
      return false;
    }
  }

  static async updateBook(
    id: string,
    title: string | undefined,
    price: number | undefined,
    authorId: string | undefined
  ): Promise<Boolean> {
    const entity: { title?: string; price?: number; authorId?: string } = {};
    if (title) {
      entity.title = title;
    }
    if (price) {
      entity.price = price;
    }
    if (authorId) {
      entity.authorId = authorId;
    }

    try {
      await BookEntity.update(id, entity);
      return true;
    } catch (e) {
      return false;
    }
  }
}
