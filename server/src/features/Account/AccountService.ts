import { AccountEntity } from "./AccountEntity";
import { AccountGraphql } from "./AccountGraphql";
import { AccountGeneralResponse } from "./objects/AccountGeneralResponse";
import { hash, genSalt, compare } from "bcrypt";
import { Context } from "../../types";
import { RoomService } from "../Room/RoomService";
import { ChatService } from "../Chat/ChatService";
import jwt from "jsonwebtoken";
import { AUTH_COOKIE, SECRET, TEN_YEARS } from "../../constants";
import { AccountError } from "./AccountError";
import { InviteRequestService } from "../InviteRequest/InviteRequestService";

export class AccountService {
  static async convertAccountEntityToAccountGraphql(
    accountId: string
  ): Promise<AccountGeneralResponse> {
    const account = await AccountEntity.findOne();

    if (!account) {
      return {
        error: {
          field: "accountId",
          message: AccountError.accountWithThatIdDoesNotExist.message,
          ufm: AccountError.accountWithThatIdDoesNotExist.ufm,
        },
      };
    }

    const accountChats = await ChatService.fetchChatsByAccount(accountId);
    const accountRooms = await RoomService.fetchRoomsByAccount(accountId);
    const accountInviteRequestSent =
      await InviteRequestService.fetchInviteRequestBySender(accountId);
    const accountInviteRequestReceived =
      await InviteRequestService.fetchInviteRequestsByRecepient(accountId);

    return {
      account: {
        ...account,
        chats: accountChats.chats || [],
        rooms: accountRooms.rooms || [],
        inviteRequestsSent: accountInviteRequestSent.inviteRequests || [],
        inviteRequestReceived:
          accountInviteRequestReceived.inviteRequests || [],
      },
    };
  }

  static logout(context: Context): void {
    if (context.req.cookies[AUTH_COOKIE]) {
      context.res.clearCookie(AUTH_COOKIE);
    }
  }

  static async fetchCurrentUser(
    context: Context
  ): Promise<AccountGeneralResponse> {
    const token = context.req.cookies[AUTH_COOKIE];
    if (!token) {
      return {
        error: {
          field: "accountId",
          message: AccountError.userIsNotLoggedIn.message,
          ufm: AccountError.userIsNotLoggedIn.ufm,
        },
      };
    }

    const { accountId } = jwt.verify(token, SECRET) as {
      accountId: string;
      iat: number;
    };

    const account = await AccountEntity.findOne(accountId);

    if (!account) {
      return {
        error: {
          field: "accountId",
          message: AccountError.accountWithThatIdDoesNotExist.message,
          ufm: AccountError.accountWithThatIdDoesNotExist.ufm,
        },
      };
    }

    const accountData = await this.convertAccountEntityToAccountGraphql(
      accountId
    );

    if (accountData.error) {
      return {
        error: accountData.error,
      };
    }

    return {
      account: accountData.account,
    };
  }

  static exposeAuthCookie(context: Context, accountId: string): void {
    const token = jwt.sign({ accountId }, SECRET);
    context.res.cookie(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: TEN_YEARS,
    });
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
          message: AccountError.invalidLoginCredentials.message,
          ufm: AccountError.invalidLoginCredentials.ufm,
        },
      };
    }

    const passwordIsValid = await compare(password, account.password);

    if (!passwordIsValid) {
      return {
        error: {
          field: "password",
          message: AccountError.invalidLoginCredentials.message,
          ufm: AccountError.invalidLoginCredentials.ufm,
        },
      };
    }

    const accountData = await this.convertAccountEntityToAccountGraphql(
      account.id
    );

    if (accountData.error) {
      return {
        error: accountData.error,
      };
    }

    return {
      account: accountData.account,
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
          message: AccountError.userWithThatUsernameAlreadyExists.message,
          ufm: AccountError.userWithThatUsernameAlreadyExists.ufm,
        },
      };
    }

    if (password.length < 6) {
      return {
        error: {
          field: "password",
          message: AccountError.passwordMustBeAtLeastSixChars.message,
          ufm: AccountError.passwordMustBeAtLeastSixChars.ufm,
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
        inviteRequestReceived: [],
        inviteRequestsSent: [],
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
      message: AccountError.accountWithThatIdDoesNotExist.message,
      ufm: AccountError.accountWithThatIdDoesNotExist.ufm,
    };

    if (!account) {
      return {
        error: accountDoesNotExistError,
      };
    }

    const accountData = await this.convertAccountEntityToAccountGraphql(
      accountId
    );

    if (accountData.error) {
      return {
        error: accountData.error,
      };
    }

    return {
      account: accountData.account,
    };
  }
}
