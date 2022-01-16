import { BookEntity } from "../Book/BookEntity";
import { AuthorEntity } from "./AuthorEntity";
import { AuthorGraphql } from "./AuthorGraphql";
import { AuthorGeneralResponse } from "./objects/AuthorGeneralResponse";

export class AuthorService {
  static async createAuthor(
    firstName: string,
    lastName: string
  ): Promise<AuthorGeneralResponse> {
    const author = await AuthorEntity.create({ firstName, lastName }).save();
    const books = await BookEntity.find({ where: { authorId: author.id } });
    return { author: { ...author, books } };
  }

  static async fetchAuthors(): Promise<AuthorGraphql[]> {
    const authorIds = (await AuthorEntity.find({})).map((author) => author.id);
    const authorGraphqls: AuthorGraphql[] = [];
    for (const id of authorIds) {
      const author = await this.fetchAuthor(id);
      if (author.error || !author.author) {
        continue;
      }
      authorGraphqls.push(author.author);
    }
    return authorGraphqls;
  }

  static async fetchAuthor(authorId: string): Promise<AuthorGeneralResponse> {
    const author = await AuthorEntity.findOne(authorId);
    if (!author) {
      return {
        error: {
          field: "authorId",
          message: "an author with that id does not exist",
          ufm: "An author with that id does not exists",
        },
      };
    }

    const books = await BookEntity.find({ where: { authorId: author.id } });
    return {
      author: {
        ...author,
        books,
      },
    };
  }

  static async deleteAuthor(authorId: string): Promise<Boolean> {
    try {
      await AuthorEntity.delete(authorId);
      return true;
    } catch (e) {
      return false;
    }
  }

  static async updateAuthor(
    authorId: string,
    firstName?: string,
    lastName?: string
  ): Promise<Boolean> {
    const entity: { firstName?: string; lastName?: string } = {};
    if (firstName) {
      entity.firstName = firstName;
    }
    if (lastName) {
      entity.lastName = lastName;
    }

    try {
      await AuthorEntity.update(authorId, entity);
      return true;
    } catch (e) {
      return false;
    }
  }
}

