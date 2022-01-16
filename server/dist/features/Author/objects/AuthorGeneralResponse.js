"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorGeneralResponse = void 0;
const type_graphql_1 = require("type-graphql");
const FieldError_1 = require("../../../objects/FieldError");
const AuthorGraphql_1 = require("../AuthorGraphql");
let AuthorGeneralResponse = class AuthorGeneralResponse {
    author;
    error;
};
__decorate([
    (0, type_graphql_1.Field)(() => AuthorGraphql_1.AuthorGraphql, { nullable: true })
], AuthorGeneralResponse.prototype, "author", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => FieldError_1.FieldError, { nullable: true })
], AuthorGeneralResponse.prototype, "error", void 0);
AuthorGeneralResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], AuthorGeneralResponse);
exports.AuthorGeneralResponse = AuthorGeneralResponse;
