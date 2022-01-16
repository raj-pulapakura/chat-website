"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookResolver = void 0;
const type_graphql_1 = require("type-graphql");
const BookGraphql_1 = require("./BookGraphql");
const BookService_1 = require("./BookService");
const CreateBookInput_1 = require("./inputs/CreateBookInput");
const UpdateBookInput_1 = require("./inputs/UpdateBookInput");
const BookGeneralResponse_1 = require("./objects/BookGeneralResponse");
let BookResolver = class BookResolver {
    books() {
        return BookService_1.BookService.fetchBooks();
    }
    book(bookId) {
        return BookService_1.BookService.fetchBook(bookId);
    }
    createBook(createBookInput) {
        const { title, price, authorId } = createBookInput;
        return BookService_1.BookService.createBook(title, price, authorId);
    }
    updateBook(updateBookInput) {
        const { id, title, price, authorId } = updateBookInput;
        return BookService_1.BookService.updateBook(id, title, price, authorId);
    }
    deleteBook(bookId) {
        return BookService_1.BookService.deleteBook(bookId);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [BookGraphql_1.BookGraphql])
], BookResolver.prototype, "books", null);
__decorate([
    (0, type_graphql_1.Query)(() => BookGeneralResponse_1.BookGeneralResponse),
    __param(0, (0, type_graphql_1.Arg)("bookId", () => type_graphql_1.ID))
], BookResolver.prototype, "book", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => BookGeneralResponse_1.BookGeneralResponse),
    __param(0, (0, type_graphql_1.Arg)("input", () => CreateBookInput_1.CreateBookInput))
], BookResolver.prototype, "createBook", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("input", () => UpdateBookInput_1.UpdateBookInput))
], BookResolver.prototype, "updateBook", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("bookId", () => type_graphql_1.ID))
], BookResolver.prototype, "deleteBook", null);
BookResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], BookResolver);
exports.BookResolver = BookResolver;
