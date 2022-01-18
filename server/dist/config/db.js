"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const constants_1 = require("../constants");
const BookEntity_1 = require("../features/Book/BookEntity");
const AuthorEntity_1 = require("../features/Author/AuthorEntity");
const AccountEntity_1 = require("../features/Account/AccountEntity");
exports.dbConfig = {
    username: constants_1.env.DB_USERNAME,
    password: constants_1.env.DB_PASSWORD,
    database: constants_1.env.DB_DATABASE,
    host: constants_1.env.DB_HOST,
    port: constants_1.env.DB_PORT,
    type: "mysql",
    synchronize: true,
    entities: [BookEntity_1.BookEntity, AuthorEntity_1.AuthorEntity, AccountEntity_1.AccountEntity],
};
