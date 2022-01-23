import "reflect-metadata";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { env } from "./constants";
import { connectToDB } from "./utils/connectToDB";
import { AccountResolver } from "./features/Account/AccountResolver";
import { RoomResolver } from "./features/Room/RoomResolver";
import { ChatResolver } from "./features/Chat/ChatResolver";

const main = async () => {
  const app = express();

  await connectToDB();

  app.use(cookieParser());

  app.use(
    cors({
      credentials: true,
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Set-Cookie"],
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    })
  );

  // app.use((req, res, next) => {
  //   console.log({ cookies: req.cookies });
  //   next();
  // });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [AccountResolver, RoomResolver, ChatResolver],
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
