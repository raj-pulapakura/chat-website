"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookEntity = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../objects/BaseModel");
const AuthorEntity_1 = require("../Author/AuthorEntity");
let BookEntity = class BookEntity extends BaseModel_1.BaseModel {
    title;
    price;
    authorId;
    author;
};
__decorate([
    (0, typeorm_1.Column)({ type: "text" })
], BookEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float" })
], BookEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" })
], BookEntity.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AuthorEntity_1.AuthorEntity, (author) => author.books, {
        onDelete: "CASCADE",
    })
], BookEntity.prototype, "author", void 0);
BookEntity = __decorate([
    (0, typeorm_1.Entity)()
], BookEntity);
exports.BookEntity = BookEntity;
