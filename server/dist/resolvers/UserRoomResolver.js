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
exports.UserRoomResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Room_1 = require("../entities/Room");
const User_1 = require("../entities/User");
const UserRoom_1 = require("../entities/UserRoom");
const objectTypes_1 = require("../objectTypes");
let UserRoomResolver = class UserRoomResolver {
    async userRooms() {
        return await UserRoom_1.UserRoom.find({});
    }
    async userRoomsByUser(userId) {
        return await UserRoom_1.UserRoom.find({ where: { userId } });
    }
    async userRoomsByRoom(roomId) {
        return await UserRoom_1.UserRoom.find({ where: { roomId } });
    }
    async userRoom(userId, roomId) {
        const userRoom = await UserRoom_1.UserRoom.findOne({ where: { userId, roomId } });
        if (!userRoom) {
            return null;
        }
        return userRoom;
    }
    async createUserRoom(userId, roomId) {
        // check if userRoom already exists
        const userRoomAlreadyExists = await UserRoom_1.UserRoom.findOne({
            where: { userId, roomId },
        });
        if (userRoomAlreadyExists) {
            return {
                error: {
                    field: "userId",
                    message: "this userId is already joined to this room",
                },
            };
        }
        // create userRoom
        const userRoom = await UserRoom_1.UserRoom.create({
            userId,
            roomId,
            creator: true,
        }).save();
        return {
            userRoom,
        };
    }
    async joinRoom(userId, publicId) {
        // check if user exists
        const userExists = await User_1.User.findOne(userId);
        if (!userExists) {
            return {
                error: {
                    field: "userId",
                    message: "a user with that id does not exist",
                    resp: "",
                },
            };
        }
        // check if room exists
        const room = await Room_1.Room.findOne({ where: { publicId } });
        if (!room) {
            return {
                error: {
                    field: "publicId",
                    message: "a room with that publicId does not exist",
                    resp: "A room with that ID does not exist. Try again.",
                },
            };
        }
        // check if user is already joined to room
        const userIsAlreadyJoinedToRoom = await UserRoom_1.UserRoom.findOne({
            where: { userId, roomId: room.id },
        });
        if (userIsAlreadyJoinedToRoom) {
            if (room.creatorId.toString() === userId) {
                return {
                    error: {
                        field: "userId",
                        message: "the user with that id is already joined to this room, in fact he/she is the creator of the room!",
                        resp: "You are already joined to this room, in fact, you created it!",
                    },
                };
            }
            return {
                error: {
                    field: "userId",
                    message: "the user with that id is already joined to this room",
                    resp: "You are already joined to this room",
                },
            };
        }
        // join user to room
        const userRoom = await UserRoom_1.UserRoom.create({
            userId: parseInt(userId),
            roomId: room.id,
            creator: false,
        }).save();
        return {
            userRoom,
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [UserRoom_1.UserRoom])
], UserRoomResolver.prototype, "userRooms", null);
__decorate([
    (0, type_graphql_1.Query)(() => [UserRoom_1.UserRoom]),
    __param(0, (0, type_graphql_1.Arg)("userId", () => type_graphql_1.ID))
], UserRoomResolver.prototype, "userRoomsByUser", null);
__decorate([
    (0, type_graphql_1.Query)(() => [UserRoom_1.UserRoom]),
    __param(0, (0, type_graphql_1.Arg)("roomId", () => type_graphql_1.ID))
], UserRoomResolver.prototype, "userRoomsByRoom", null);
__decorate([
    (0, type_graphql_1.Query)(() => UserRoom_1.UserRoom),
    __param(0, (0, type_graphql_1.Arg)("userId", () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)("roomId", () => type_graphql_1.ID))
], UserRoomResolver.prototype, "userRoom", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => objectTypes_1.UserRoomResponse),
    __param(0, (0, type_graphql_1.Arg)("userId", () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)("roomId", () => type_graphql_1.ID))
], UserRoomResolver.prototype, "createUserRoom", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => objectTypes_1.ExtendedUserRoomResponse),
    __param(0, (0, type_graphql_1.Arg)("userId", () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)("publicId", () => type_graphql_1.ID))
], UserRoomResolver.prototype, "joinRoom", null);
UserRoomResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserRoomResolver);
exports.UserRoomResolver = UserRoomResolver;
