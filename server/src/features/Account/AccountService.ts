import { AccountEntity } from "./AccountEntity";
import { AccountGraphql } from "./AccountGraphql";
import { AccountGeneralResponse } from "./objects/AccountGeneralResponse";
import { hash, genSalt, compare } from "bcrypt";
import { Context } from "../../types";
import { RoomService } from "../Room/RoomService";
import { ChatService } from "../Chat/ChatService";
import { CurrentUserResponse } from "./objects/CurrentUserResponse";

export class AccountService {
  static async fetchCurrentUser(
    context: Context
  ): Promise<CurrentUserResponse> {
    const { accountId } = context.req.session;
    const account = await AccountEntity.findOne(accountId);
    if (!account) {
      return {
        userIsLoggedIn: false,
      };
    }

    const accountChats = await ChatService.fetchChatsByAccount(account.id);
    const accountRooms = await RoomService.fetchRoomsByAccount(account.id);

    return {
      userIsLoggedIn: true,
      account: {
        ...account,
        chats: accountChats.chats || [],
        rooms: accountRooms.rooms || [],
      },
    };
  }

  static checkAccountAndExposeAuthCookie(
    context: Context,
    accountResponse: AccountGeneralResponse
  ): void {
    if (!accountResponse.error && accountResponse.account) {
      context.req.session.accountId = accountResponse.account.id;
    }
  }

  static async verifyLoginCredentials(
    username: string,
    password: string
  ): Promise<AccountGeneralResponse> {
    const account = await AccountEntity.findOne({ where: { username } });
    if (!account) {
      return {
        error: {
          field: "username",
          message: "an account with that username does not exist",
          ufm: "Invalid credentials",
        },
      };
    }

    const passwordIsValid = await compare(password, account.password);

    if (!passwordIsValid) {
      return {
        error: {
          field: "password",
          message: "incorrect password for given username",
          ufm: "Invalid credentials",
        },
      };
    }

    const accountChats = await ChatService.fetchChatsByAccount(account.id);
    const accountRooms = await RoomService.fetchRoomsByAccount(account.id);

    return {
      account: {
        ...account,
        chats: accountChats.chats || [],
        rooms: accountRooms.rooms || [],
      },
    };
  }

  static async deleteAccount(accountId: string): Promise<Boolean> {
    try {
      await AccountEntity.delete(accountId);
      return true;
    } catch {
      return false;
    }
  }

  static async createAccount(
    username: string,
    password: string
  ): Promise<AccountGeneralResponse> {
    const existingAccount = await AccountEntity.findOne({
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

    const hashedPassword = await hash(password, await genSalt());

    const createdAccount = await AccountEntity.create({
      username,
      password: hashedPassword,
    }).save();

    return {
      account: {
        ...createdAccount,
        rooms: [],
        chats: [],
      },
    };
  }

  static async fetchAccounts(): Promise<AccountGraphql[]> {
    const accountIds = (await AccountEntity.find({})).map(
      (account) => account.id
    );
    const accounts: AccountGraphql[] = [];
    for (const id of accountIds) {
      const fetchedAccount = await this.fetchAccount(id);
      if (!fetchedAccount.error && fetchedAccount.account) {
        accounts.push(fetchedAccount.account);
      }
    }
    return accounts;
  }

  static async fetchAccount(
    accountId: string
  ): Promise<AccountGeneralResponse> {
    const account = await AccountEntity.findOne(accountId);
    const accountDoesNotExistError: AccountGeneralResponse["error"] = {
      field: "accountId",
      message: "an account with that id does not exist",
      ufm: "An account with that id does not exist",
    };

    if (!account) {
      return {
        error: accountDoesNotExistError,
      };
    }
    const { id, username, password, createdAt, updatedAt } = account;

    const accountChats = await ChatService.fetchChatsByAccount(id);
    const accountRooms = await RoomService.fetchRoomsByAccount(id);

    return {
      account: {
        id,
        username,
        password,
        createdAt,
        updatedAt,
        rooms: accountRooms.rooms || [],
        chats: accountChats.chats || [],
      },
    };
  }
}
