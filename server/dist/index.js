"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const redis_1 = require("redis");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const constants_1 = require("./constants");
const connectToDB_1 = require("./utils/connectToDB");
const BookResolver_1 = require("./features/Book/BookResolver");
const AuthorResolver_1 = require("./features/Author/AuthorResolver");
const AccountResolver_1 = require("./features/Account/AccountResolver");
const main = async () => {
    const app = (0, express_1.default)();
    await (0, connectToDB_1.connectToDB)();
    app.use((0, cors_1.default)({
        credentials: true,
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Set-Cookie"],
        origin: ["https://studio.apollographql.com"],
    }));
    const client = (0, redis_1.createClient)({ url: "redis://:secret@redis:6379" });
    client.on("error", (err) => console.log("Redis Client Error", err));
    client.on("connect", () => console.log("Connected to session store (redis)"));
    await client.connect();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    app.use((0, express_session_1.default)({
        secret: constants_1.SECRET,
        name: constants_1.AUTH_COOKIE,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: false,
            sameSite: "lax",
            secure: false,
            maxAge: constants_1.TEN_YEARS,
        },
        store: new RedisStore({ client }),
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            validate: false,
            resolvers: [BookResolver_1.BookResolver, AuthorResolver_1.AuthorResolver, AccountResolver_1.AccountResolver],
        }),
        context: ({ req, res }) => ({ req, res, redisClient: client }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(constants_1.env.PORT, () => {
        console.log(`The server is listening on port ${constants_1.env.PORT}`);
    });
};
main().catch((e) => console.error(e));
