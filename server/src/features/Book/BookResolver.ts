import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { BookGraphql } from "./BookGraphql";
import { BookService } from "./BookService";
import { CreateBookInput } from "./inputs/CreateBookInput";
import { UpdateBookInput } from "./inputs/UpdateBookInput";
import { BookGeneralResponse } from "./objects/BookGeneralResponse";

@Resolver()
export class BookResolver {
  @Query(() => [BookGraphql])
  books(): Promise<BookGraphql[]> {
    return BookService.fetchBooks();
  }

  @Query(() => BookGeneralResponse)
  book(@Arg("bookId", () => ID) bookId: string): Promise<BookGeneralResponse> {
    return BookService.fetchBook(bookId);
  }

  @Mutation(() => BookGeneralResponse)
  createBook(
    @Arg("input", () => CreateBookInput) createBookInput: CreateBookInput
  ): Promise<BookGeneralResponse> {
    const { title, price, authorId } = createBookInput;
    return BookService.createBook(title, price, authorId);
  }

  @Mutation(() => Boolean)
  updateBook(
    @Arg("input", () => UpdateBookInput) updateBookInput: UpdateBookInput
  ): Promise<Boolean> {
    const { id, title, price, authorId } = updateBookInput;
    return BookService.updateBook(id, title, price, authorId);
  }

  @Mutation(() => Boolean)
  deleteBook(@Arg("bookId", () => ID) bookId: string): Promise<Boolean> {
    return BookService.deleteBook(bookId);
  }
}
