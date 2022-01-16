"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorService = void 0;
const BookEntity_1 = require("../Book/BookEntity");
const AuthorEntity_1 = require("./AuthorEntity");
class AuthorService {
    static async createAuthor(firstName, lastName) {
        const author = await AuthorEntity_1.AuthorEntity.create({ firstName, lastName }).save();
        const books = await BookEntity_1.BookEntity.find({ where: { authorId: author.id } });
        return { author: { ...author, books } };
    }
    static async fetchAuthors() {
        const authorIds = (await AuthorEntity_1.AuthorEntity.find({})).map((author) => author.id);
        const authorGraphqls = [];
        for (const id of authorIds) {
            const author = await this.fetchAuthor(id);
            if (author.error || !author.author) {
                continue;
            }
            authorGraphqls.push(author.author);
        }
        return authorGraphqls;
    }
    static async fetchAuthor(authorId) {
        const author = await AuthorEntity_1.AuthorEntity.findOne(authorId);
        if (!author) {
            return {
                error: {
                    field: "authorId",
                    message: "an author with that id does not exist",
                    ufm: "An author with that id does not exists",
                },
            };
        }
        const books = await BookEntity_1.BookEntity.find({ where: { authorId: author.id } });
        return {
            author: {
                ...author,
                books,
            },
        };
    }
    static async deleteAuthor(authorId) {
        try {
            await AuthorEntity_1.AuthorEntity.delete(authorId);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    static async updateAuthor(authorId, firstName, lastName) {
        const entity = {};
        if (firstName) {
            entity.firstName = firstName;
        }
        if (lastName) {
            entity.lastName = lastName;
        }
        try {
            await AuthorEntity_1.AuthorEntity.update(authorId, entity);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
exports.AuthorService = AuthorService;
