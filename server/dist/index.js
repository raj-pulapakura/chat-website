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
const dotenv_1 = require("dotenv");
const constants_1 = require("./constants");
const connectToDB_1 = require("./utils/connectToDB");
const BookResolver_1 = require("./features/Book/BookResolver");
const AuthorResolver_1 = require("./features/Author/AuthorResolver");
const main = async () => {
    const app = (0, express_1.default)();
    // Fetch environment variables
    (0, dotenv_1.config)();
    // Connect to database
    await (0, connectToDB_1.connectToDB)();
    app.use((0, cors_1.default)({
        credentials: true,
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Set-Cookie"],
        origin: ["https://studio.apollographql.com"],
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            validate: false,
            resolvers: [BookResolver_1.BookResolver, AuthorResolver_1.AuthorResolver],
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(constants_1.env.PORT, () => {
        console.log(`The server is listening on port ${constants_1.env.PORT}`);
    });
};
main().catch((e) => console.error(e));
