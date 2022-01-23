import { createUnionType } from "type-graphql";
import { FieldError } from "./FieldError";
import { TargettedError } from "./TargettedError";

export const ErrorUnionType = createUnionType({
  name: "Error",
  types: () => [FieldError, TargettedError] as const,
});
