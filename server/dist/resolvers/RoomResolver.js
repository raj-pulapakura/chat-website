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
exports.RoomResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Room_1 = require("../entities/Room");
const User_1 = require("../entities/User");
const objectTypes_1 = require("../objectTypes");
const uuid_1 = require("uuid");
const UserRoom_1 = require("../entities/UserRoom");
let RoomResolver = class RoomResolver {
    async roomById(id) {
        const room = await Room_1.Room.findOne(id);
        if (!room) {
            return null;
        }
        return room;
    }
    async roomByPublicId(publicId) {
        const room = await Room_1.Room.findOne({ where: { publicId } });
        if (!room) {
            return null;
        }
        return room;
    }
    async roomByName(name) {
        const room = await Room_1.Room.findOne({ where: { name } });
        if (!room) {
            return null;
        }
        return room;
    }
    async roomsByUser(userId) {
        const userRoomConnections = await UserRoom_1.UserRoom.find({
            where: { userId },
        });
        const rooms = [];
        for (const userRoomConnection of userRoomConnections) {
            rooms.push(await Room_1.Room.findOne(userRoomConnection.roomId));
        }
        return rooms;
    }
    async roomsByCreator(creatorId) {
        return await Room_1.Room.find({ where: { creatorId } });
    }
    async roomsByJoin(userId) {
        const userRoomConnections = await UserRoom_1.UserRoom.find({
            where: { userId, creator: false },
        });
        const rooms = [];
        for (const userRoomConnection of userRoomConnections) {
            rooms.push(await Room_1.Room.findOne(userRoomConnection.roomId));
        }
        return rooms;
    }
    rooms() {
        return Room_1.Room.find({});
    }
    async createRoom(name, description, creatorId) {
        // check if creator exists
        const creatorExists = await User_1.User.findOne(creatorId);
        if (!creatorExists) {
            return {
                error: {
                    field: "creatorId",
                    message: "a user with that id does not exist",
                },
            };
        }
        const room = Room_1.Room.create({
            name,
            creatorId,
            publicId: (0, uuid_1.v4)(),
            description,
        });
        const savedRoom = await room.save();
        // joining creator to room
        UserRoom_1.UserRoom.create({
            userId: creatorId,
            roomId: savedRoom.id,
            creator: true,
        }).save();
        return {
            room: savedRoom,
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => Room_1.Room, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID))
], RoomResolver.prototype, "roomById", null);
__decorate([
    (0, type_graphql_1.Query)(() => Room_1.Room, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("publicId", () => String))
], RoomResolver.prototype, "roomByPublicId", null);
__decorate([
    (0, type_graphql_1.Query)(() => Room_1.Room, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("name", () => String))
], RoomResolver.prototype, "roomByName", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Room_1.Room]),
    __param(0, (0, type_graphql_1.Arg)("userId", () => type_graphql_1.ID))
], RoomResolver.prototype, "roomsByUser", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Room_1.Room]),
    __param(0, (0, type_graphql_1.Arg)("creatorId", () => type_graphql_1.ID))
], RoomResolver.prototype, "roomsByCreator", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Room_1.Room]),
    __param(0, (0, type_graphql_1.Arg)("userId", () => type_graphql_1.ID))
], RoomResolver.prototype, "roomsByJoin", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Room_1.Room])
], RoomResolver.prototype, "rooms", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => objectTypes_1.RoomResponse),
    __param(0, (0, type_graphql_1.Arg)("name", () => String)),
    __param(1, (0, type_graphql_1.Arg)("description", () => String)),
    __param(2, (0, type_graphql_1.Arg)("creatorId", () => type_graphql_1.ID))
], RoomResolver.prototype, "createRoom", null);
RoomResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], RoomResolver);
exports.RoomResolver = RoomResolver;
