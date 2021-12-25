import "reflect-metadata";
import { connectToDB } from "./utils/config/connectToDB";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { RoomResolver } from "./resolvers/RoomResolver";
import { connectToRedis } from "./utils/config/connectToRedis";
import { TEN_YEARS, SECRET, AUTH_COOKIE } from "./constants";
import cors from "cors";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import { ChatResolver } from "./resolvers/ChatResolver";
import { UserRoomResolver } from "./resolvers/UserRoomResolver";

const main = async () => {
  connectToDB();
  const app = express();

  app.use(
    cors({
      origin: [
        "https://studio.apollographql.com",
        "http://localhost:3000",
        "https://chathub.ninja",
      ],
      credentials: true,
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Set-Cookie"],
    })
  );
  const RedisStore = connectRedis(session);
  const redisClient = await connectToRedis();

  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
      }),
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: TEN_YEARS,
        path: "/",
      },
      resave: false,
      saveUninitialized: false,
      secret: SECRET,
      name: AUTH_COOKIE,
      proxy: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, RoomResolver, ChatResolver, UserRoomResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis: redisClient }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(80, () => {
    console.log("connected to server");
  });
};

main().catch((e) => console.error(e));
