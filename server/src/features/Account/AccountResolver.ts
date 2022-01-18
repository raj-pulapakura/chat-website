import { Arg, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../types";
import { AccountRoomService } from "../AccountRoom/AccountRoomService";
import { JoinAccountToRoomResponse } from "../AccountRoom/objects/JoinAccountToRoomResponse";
import { AccountGraphql } from "./AccountGraphql";
import { AccountService } from "./AccountService";
import { LoginInput } from "./inputs/LoginInput";
import { RegisterInput } from "./inputs/RegisterInput";
import { AccountGeneralResponse } from "./objects/AccountGeneralResponse";
import { CurrentUserResponse } from "./objects/CurrentUserResponse";

@Resolver()
export class AccountResolver {
  @Query(() => AccountGeneralResponse)
  account(
    @Arg("accountId", () => String) accountId: string
  ): Promise<AccountGeneralResponse> {
    return AccountService.fetchAccount(accountId);
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
    AccountService.checkAccountAndExposeAuthCookie(context, accountResponse);
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
    AccountService.checkAccountAndExposeAuthCookie(context, accountResponse);
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
    @Arg("roomId", () => ID) roomId: string,
    @Ctx() context: Context
  ): Promise<JoinAccountToRoomResponse> {
    return AccountRoomService.joinCurrentUserToRoom(context, roomId, false);
  }

  @Query(() => CurrentUserResponse)
  me(@Ctx() context: Context): Promise<CurrentUserResponse> {
    return AccountService.fetchCurrentUser(context);
  }
}
