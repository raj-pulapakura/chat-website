import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createClient } from "redis";
import session from "express-session";
import connectRedis from "connect-redis";

import { AUTH_COOKIE, env, SECRET, TEN_YEARS } from "./constants";
import { connectToDB } from "./utils/connectToDB";
import { AccountResolver } from "./features/Account/AccountResolver";
import { RoomResolver } from "./features/Room/RoomResolver";
import { ChatResolver } from "./features/Chat/ChatResolver";

const main = async () => {
  const app = express();

  await connectToDB();

  app.use(
    cors({
      credentials: true,
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Set-Cookie"],
      origin: ["https://studio.apollographql.com"],
    })
  );

  const client = createClient({ url: "redis://:secret@redis:6379" });

  client.on("error", (err) => console.log("Redis Client Error", err));
  client.on("connect", () => console.log("Connected to session store (redis)"));

  await client.connect();

  const RedisStore = connectRedis(session);

  app.use(
    session({
      secret: SECRET,
      name: AUTH_COOKIE,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,
        sameSite: "lax",
        secure: false,
        maxAge: TEN_YEARS,
      },
      store: new RedisStore({ client }),
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [
        AccountResolver,
        RoomResolver,
        ChatResolver,
      ],
    }),
    context: ({ req, res }) => ({ req, res, redisClient: client }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(env.PORT, () => {
    console.log(`The server is listening on port ${env.PORT}`);
  });
};

main().catch((e) => console.error(e));
