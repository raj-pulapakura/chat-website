import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { AuthorGraphql } from "./AuthorGraphql";
import { AuthorService } from "./AuthorService";
import { CreateAuthorInput } from "./inputs/CreateAuthorInput";
import { UpdateAuthorInput } from "./inputs/UpdateAuthorInput";
import { AuthorGeneralResponse } from "./objects/AuthorGeneralResponse";

@Resolver()
export class AuthorResolver {
  @Query(() => [AuthorGraphql])
  authors(): Promise<AuthorGraphql[]> {
    return AuthorService.fetchAuthors();
  }

  @Query(() => AuthorGeneralResponse)
  author(
    @Arg("authorId", () => ID) authorId: string
  ): Promise<AuthorGeneralResponse> {
    return AuthorService.fetchAuthor(authorId);
  }

  @Mutation(() => AuthorGeneralResponse)
  createAuthor(
    @Arg("input", () => CreateAuthorInput) createAuthorInput: CreateAuthorInput
  ): Promise<AuthorGeneralResponse> {
    const { firstName, lastName } = createAuthorInput;
    return AuthorService.createAuthor(firstName, lastName);
  }

  @Mutation(() => Boolean)
  updateAuthor(
    @Arg("input", () => UpdateAuthorInput) updateAuthorInput: UpdateAuthorInput
  ): Promise<Boolean> {
    const { id, firstName, lastName } = updateAuthorInput;
    return AuthorService.updateAuthor(id, firstName, lastName);
  }

  @Mutation(() => Boolean)
  deleteAuthor(@Arg("authorId", () => ID) authorId: string): Promise<Boolean> {
    return AuthorService.deleteAuthor(authorId);
  }
}

