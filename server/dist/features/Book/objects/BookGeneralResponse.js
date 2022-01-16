"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookGeneralResponse = void 0;
const type_graphql_1 = require("type-graphql");
const FieldError_1 = require("../../../objects/FieldError");
const BookGraphql_1 = require("../BookGraphql");
let BookGeneralResponse = class BookGeneralResponse {
    book;
    error;
};
__decorate([
    (0, type_graphql_1.Field)(() => BookGraphql_1.BookGraphql, { nullable: true })
], BookGeneralResponse.prototype, "book", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => FieldError_1.FieldError, { nullable: true })
], BookGeneralResponse.prototype, "error", void 0);
BookGeneralResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], BookGeneralResponse);
exports.BookGeneralResponse = BookGeneralResponse;
