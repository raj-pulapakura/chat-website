"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorEntity = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../objects/BaseModel");
const BookEntity_1 = require("../Book/BookEntity");
let AuthorEntity = class AuthorEntity extends BaseModel_1.BaseModel {
    firstName;
    lastName;
    books;
};
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" })
], AuthorEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" })
], AuthorEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BookEntity_1.BookEntity, (book) => book.author, { onDelete: "CASCADE" })
], AuthorEntity.prototype, "books", void 0);
AuthorEntity = __decorate([
    (0, typeorm_1.Entity)()
], AuthorEntity);
exports.AuthorEntity = AuthorEntity;
