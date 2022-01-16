import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { env } from "./constants";
import { connectToDB } from "./utils/connectToDB";
import { BookResolver } from "./features/Book/BookResolver";
import { AuthorResolver } from "./features/Author/AuthorResolver";

const main = async () => {
  const app = express();

  // Connect to database
  await connectToDB();

  app.use(
    cors({
      credentials: true,
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Set-Cookie"],
      origin: ["https://studio.apollographql.com"],
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [BookResolver, AuthorResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(env.PORT, () => {
    console.log(`The server is listening on port ${env.PORT}`);
  });
};

main().catch((e) => console.error(e));
