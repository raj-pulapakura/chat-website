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
exports.AccountResolver = void 0;
const type_graphql_1 = require("type-graphql");
const AccountGraphql_1 = require("./AccountGraphql");
const AccountService_1 = require("./AccountService");
const CreateAccountInput_1 = require("./inputs/CreateAccountInput");
const AccountGeneralResponse_1 = require("./objects/AccountGeneralResponse");
let AccountResolver = class AccountResolver {
    account(accountId) {
        return AccountService_1.AccountService.fetchAccount(accountId);
    }
    accounts() {
        return AccountService_1.AccountService.fetchAccounts();
    }
    createAccount(input) {
        return AccountService_1.AccountService.createAccount(input.username, input.password);
    }
    deleteAccount(accountId) {
        return AccountService_1.AccountService.deleteAccount(accountId);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => AccountGeneralResponse_1.AccountGeneralResponse),
    __param(0, (0, type_graphql_1.Arg)("accountId", () => String))
], AccountResolver.prototype, "account", null);
__decorate([
    (0, type_graphql_1.Query)(() => [AccountGraphql_1.AccountGraphql])
], AccountResolver.prototype, "accounts", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AccountGeneralResponse_1.AccountGeneralResponse),
    __param(0, (0, type_graphql_1.Arg)("input", () => CreateAccountInput_1.CreateProductInput))
], AccountResolver.prototype, "createAccount", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("accountId", () => String))
], AccountResolver.prototype, "deleteAccount", null);
AccountResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AccountResolver);
exports.AccountResolver = AccountResolver;
