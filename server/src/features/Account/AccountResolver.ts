import { Arg, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../types";
import { AccountRoomService } from "../AccountRoom/AccountRoomService";
import { JoinAccountToRoomResponse } from "../AccountRoom/objects/JoinAccountToRoomResponse";
import { AccountGraphql } from "./AccountGraphql";
import { AccountService } from "./AccountService";
import { LoginInput } from "./inputs/LoginInput";
import { RegisterInput } from "./inputs/RegisterInput";
import { AccountGeneralResponse } from "./objects/AccountGeneralResponse";

@Resolver()
export class AccountResolver {
  @Query(() => AccountGeneralResponse)
  accountById(
    @Arg("accountId", () => ID) accountId: string
  ): Promise<AccountGeneralResponse> {
    return AccountService.fetchAccountById(accountId);
  }

  @Query(() => AccountGeneralResponse)
  accountByUsername(
    @Arg("username", () => String) username: string
  ): Promise<AccountGeneralResponse> {
    return AccountService.fetchAccountByUsername(username);
  }

  @Query(() => [AccountGraphql])
  accounts(): Promise<AccountGraphql[]> {
    return AccountService.fetchAccounts();
  }

  @Mutation(() => AccountGeneralResponse)
  async register(
    @Arg("input", () => RegisterInput) input: RegisterInput,
    @Ctx() context: Context
  ): Promise<AccountGeneralResponse> {
    const accountResponse = await AccountService.createAccount(
      input.username,
      input.password
    );
    if (!accountResponse.error && accountResponse.account) {
      AccountService.exposeAuthCookie(context, accountResponse.account.id);
    }
    return accountResponse;
  }

  @Mutation(() => AccountGeneralResponse)
  async login(
    @Arg("input", () => LoginInput) input: LoginInput,
    @Ctx() context: Context
  ): Promise<AccountGeneralResponse> {
    const accountResponse = await AccountService.verifyLoginCredentials(
      input.username,
      input.password
    );
    if (!accountResponse.error && accountResponse.account) {
      AccountService.exposeAuthCookie(context, accountResponse.account.id);
    }
    return accountResponse;
  }

  @Mutation(() => Boolean)
  deleteAccount(
    @Arg("accountId", () => String) accountId: string
  ): Promise<Boolean> {
    return AccountService.deleteAccount(accountId);
  }

  @Mutation(() => JoinAccountToRoomResponse)
  async joinRoom(
    @Arg("accountId", () => ID) accountId: string,
    @Arg("roomId", () => ID) roomId: string
  ): Promise<JoinAccountToRoomResponse> {
    return AccountRoomService.joinAccountToRoom(accountId, roomId, false);
  }

  @Query(() => AccountGeneralResponse)
  me(@Ctx() context: Context): Promise<AccountGeneralResponse> {
    return AccountService.fetchCurrentUser(context);
  }

  @Mutation(() => Boolean)
  logout(@Ctx() context: Context): Boolean {
    AccountService.logout(context);
    return true;
  }
}
