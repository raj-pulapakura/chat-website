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
exports.AuthorResolver = void 0;
const type_graphql_1 = require("type-graphql");
const AuthorGraphql_1 = require("./AuthorGraphql");
const AuthorService_1 = require("./AuthorService");
const CreateAuthorInput_1 = require("./inputs/CreateAuthorInput");
const UpdateAuthorInput_1 = require("./inputs/UpdateAuthorInput");
const AuthorGeneralResponse_1 = require("./objects/AuthorGeneralResponse");
let AuthorResolver = class AuthorResolver {
    authors() {
        return AuthorService_1.AuthorService.fetchAuthors();
    }
    author(authorId) {
        return AuthorService_1.AuthorService.fetchAuthor(authorId);
    }
    createAuthor(createAuthorInput) {
        const { firstName, lastName } = createAuthorInput;
        return AuthorService_1.AuthorService.createAuthor(firstName, lastName);
    }
    updateAuthor(updateAuthorInput) {
        const { id, firstName, lastName } = updateAuthorInput;
        return AuthorService_1.AuthorService.updateAuthor(id, firstName, lastName);
    }
    deleteAuthor(authorId) {
        return AuthorService_1.AuthorService.deleteAuthor(authorId);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [AuthorGraphql_1.AuthorGraphql])
], AuthorResolver.prototype, "authors", null);
__decorate([
    (0, type_graphql_1.Query)(() => AuthorGeneralResponse_1.AuthorGeneralResponse),
    __param(0, (0, type_graphql_1.Arg)("authorId", () => type_graphql_1.ID))
], AuthorResolver.prototype, "author", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AuthorGeneralResponse_1.AuthorGeneralResponse),
    __param(0, (0, type_graphql_1.Arg)("input", () => CreateAuthorInput_1.CreateAuthorInput))
], AuthorResolver.prototype, "createAuthor", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("input", () => UpdateAuthorInput_1.UpdateAuthorInput))
], AuthorResolver.prototype, "updateAuthor", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("authorId", () => type_graphql_1.ID))
], AuthorResolver.prototype, "deleteAuthor", null);
AuthorResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AuthorResolver);
exports.AuthorResolver = AuthorResolver;
