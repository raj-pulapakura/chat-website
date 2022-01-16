"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const AuthorEntity_1 = require("../Author/AuthorEntity");
const BookEntity_1 = require("./BookEntity");
class BookService {
    static async createBook(title, price, authorId) {
        const author = await AuthorEntity_1.AuthorEntity.findOne(authorId);
        if (!author) {
            return {
                error: {
                    field: "authorId",
                    message: "an author with that id does not exist",
                    ufm: "an author with that id does not exist",
                },
            };
        }
        const book = await BookEntity_1.BookEntity.create({ title, price, authorId }).save();
        return {
            book: {
                ...book,
                author,
            },
        };
    }
    static async fetchBooks() {
        const bookIds = (await BookEntity_1.BookEntity.find({})).map((book) => book.id);
        const bookGraphqls = [];
        for (const bookId of bookIds) {
            const book = await this.fetchBook(bookId);
            if (book.error || !book.book) {
                continue;
            }
            bookGraphqls.push(book.book);
        }
        return bookGraphqls;
    }
    static async fetchBook(bookId) {
        const book = await BookEntity_1.BookEntity.findOne(bookId);
        if (!book) {
            return {
                error: {
                    field: "bookId",
                    message: "a book with that id does not exist",
                    ufm: "A book with that id does not exist",
                },
            };
        }
        const author = await AuthorEntity_1.AuthorEntity.findOne(book.authorId);
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
    static async deleteBook(bookId) {
        try {
            await BookEntity_1.BookEntity.delete(bookId);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    static async updateBook(id, title, price, authorId) {
        const entity = {};
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
            await BookEntity_1.BookEntity.update(id, entity);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
exports.BookService = BookService;
