import { GraphQLClient } from "graphql-request";

const clientURL = {
  dev: "http://localhost:4000/graphql",
  prod: "/api/graphql",
};

export const graphqlClient = new GraphQLClient(clientURL.prod, {
  credentials: "include",
});
