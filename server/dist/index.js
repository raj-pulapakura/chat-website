"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectToDB_1 = require("./utils/config/connectToDB");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./resolvers/UserResolver");
const RoomResolver_1 = require("./resolvers/RoomResolver");
const connectToRedis_1 = require("./utils/config/connectToRedis");
const constants_1 = require("./constants");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const ChatResolver_1 = require("./resolvers/ChatResolver");
const UserRoomResolver_1 = require("./resolvers/UserRoomResolver");
const main = async () => {
    (0, connectToDB_1.connectToDB)();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: [
            "https://studio.apollographql.com",
            "http://localhost:3000",
            "https://chathub.ninja",
        ],
        credentials: true,
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Set-Cookie"],
    }));
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redisClient = await (0, connectToRedis_1.connectToRedis)();
    app.use((0, express_session_1.default)({
        store: new RedisStore({
            client: redisClient,
        }),
        cookie: {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: constants_1.TEN_YEARS,
            path: "/",
        },
        resave: false,
        saveUninitialized: false,
        secret: constants_1.SECRET,
        name: constants_1.AUTH_COOKIE,
        proxy: true,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [UserResolver_1.UserResolver, RoomResolver_1.RoomResolver, ChatResolver_1.ChatResolver, UserRoomResolver_1.UserRoomResolver],
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
