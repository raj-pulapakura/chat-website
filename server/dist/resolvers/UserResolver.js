"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const argon2_1 = require("argon2");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const objectTypes_1 = require("../objectTypes");
let UserResolver = class UserResolver {
    async me({ req, redis }) {
        const { userId } = req.session;
        console.log({ session: req.session });
        redis.keys("*", (err, reply) => {
            if (err) {
                return console.log({ err });
            }
            console.log({ reply });
        });
        if (!userId) {
            console.log("NO USER ID HERE");
            return null;
        }
        const user = await User_1.User.findOne(userId);
        console.log({ user });
        if (!user) {
            return null;
        }
        console.log("RETURNING");
        return user;
    }
    async userById(id) {
        const user = await User_1.User.findOne(id);
        if (!user) {
            return null;
        }
        return user;
    }
    async userByName(name) {
        const user = await User_1.User.findOne({ where: { name } });
        if (!user) {
            return null;
        }
        return user;
    }
    users() {
        return User_1.User.find({});
    }
    async register(name, password, { req }) {
        // check if user already exists
        const userAlreadyExists = await User_1.User.findOne({ where: { name } });
        if (userAlreadyExists) {
            return {
                error: {
                    field: "name",
                    message: "a user with that name already exists",
                },
            };
        }
        // hash password
        const hashedPassword = await (0, argon2_1.hash)(password);
        // create user
        const user = User_1.User.create({ name, password: hashedPassword });
        const savedUser = await user.save();
        req.session.userId = savedUser.id;
        console.log(req.session);
        return {
            user: savedUser,
        };
    }
    async login(name, password, { req }) {
        // check if user exists
        const user = await User_1.User.findOne({ where: { name } });
        if (!user) {
            return {
                error: {
                    field: "name",
                    message: "a user with that name does not exist",
                },
            };
        }
        // check if password is correct
        const passwordIsValid = await (0, argon2_1.verify)(user.password, password);
        if (!passwordIsValid) {
            return {
                error: {
                    field: "password",
                    message: "incorrect password",
                },
            };
        }
        req.session.userId = user.id;
        console.log(req.session);
        return {
            user,
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)())
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID))
], UserResolver.prototype, "userById", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("name", () => String))
], UserResolver.prototype, "userByName", null);
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User])
], UserResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => objectTypes_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("name", () => String)),
    __param(1, (0, type_graphql_1.Arg)("password", () => String)),
    __param(2, (0, type_graphql_1.Ctx)())
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => objectTypes_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("name", () => String)),
    __param(1, (0, type_graphql_1.Arg)("password", () => String)),
    __param(2, (0, type_graphql_1.Ctx)())
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
