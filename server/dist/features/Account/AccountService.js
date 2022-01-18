"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const argon2_1 = require("argon2");
const AccountEntity_1 = require("./AccountEntity");
class AccountService {
    static async deleteAccount(accountId) {
        try {
            await AccountEntity_1.AccountEntity.delete(accountId);
            return true;
        }
        catch {
            return false;
        }
    }
    static async createAccount(username, password) {
        const existingAccount = await AccountEntity_1.AccountEntity.findOne({
            where: { username },
        });
        if (existingAccount) {
            return {
                error: {
                    field: "username",
                    message: "a user with that username already exists",
                    ufm: "A user with that username already exists. Please choose a different one",
                },
            };
        }
        if (password.length < 6) {
            return {
                error: {
                    field: "password",
                    message: "password must have at least six characters",
                    ufm: "Please enter a password with at least six characters",
                },
            };
        }
        const hashedPassword = await (0, argon2_1.hash)(password);
        const createdAccount = await AccountEntity_1.AccountEntity.create({
            username,
            password: hashedPassword,
        }).save();
        return {
            account: {
                ...createdAccount,
            },
        };
    }
    static async fetchAccounts() {
        const accountIds = (await AccountEntity_1.AccountEntity.find({})).map((account) => account.id);
        const accounts = [];
        for (const id of accountIds) {
            const fetchedAccount = await this.fetchAccount(id);
            if (!fetchedAccount.error && fetchedAccount.account) {
                accounts.push(fetchedAccount.account);
            }
        }
        return accounts;
    }
    static async fetchAccount(accountId) {
        const account = await AccountEntity_1.AccountEntity.findOne(accountId);
        if (!account) {
            return {
                error: {
                    field: "accountId",
                    message: "an account with that id does not exist",
                    ufm: "An account with that id does not exist",
                },
            };
        }
        const { id, username, password, createdAt, updatedAt } = account;
        return {
            account: {
                id,
                username,
                password,
                createdAt,
                updatedAt,
            },
        };
    }
}
exports.AccountService = AccountService;
