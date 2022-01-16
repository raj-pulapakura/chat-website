"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorGraphql = void 0;
const type_graphql_1 = require("type-graphql");
const BaseGraphql_1 = require("../../objects/BaseGraphql");
const BookGraphql_1 = require("../Book/BookGraphql");
let AuthorGraphql = class AuthorGraphql extends BaseGraphql_1.BaseGraphql {
    firstName;
    lastName;
    books;
};
__decorate([
    (0, type_graphql_1.Field)(() => String)
], AuthorGraphql.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String)
], AuthorGraphql.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [BookGraphql_1.BookGraphql])
], AuthorGraphql.prototype, "books", void 0);
AuthorGraphql = __decorate([
    (0, type_graphql_1.ObjectType)()
], AuthorGraphql);
exports.AuthorGraphql = AuthorGraphql;
