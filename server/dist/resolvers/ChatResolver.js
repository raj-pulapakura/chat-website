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
exports.ChatResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Chat_1 = require("../entities/Chat");
const Room_1 = require("../entities/Room");
const User_1 = require("../entities/User");
const objectTypes_1 = require("../objectTypes");
let ChatResolver = class ChatResolver {
    async chats() {
        return await Chat_1.Chat.find({});
    }
    async chatById(id) {
        const chat = await Chat_1.Chat.findOne(id);
        if (!chat) {
            return null;
        }
        return chat;
    }
    async chatsBySender(senderId) {
        return await Chat_1.Chat.find({ where: { senderId } });
    }
    async chatsByRoom(roomId) {
        return await Chat_1.Chat.find({ where: { roomId }, order: { createdAt: "ASC" } });
    }
    async createChat(text, senderId, roomId) {
        // check if sender exists
        const senderExists = await User_1.User.findOne(senderId);
        if (!senderExists) {
            return {
                error: {
                    field: "senderId",
                    message: "a user with that id does not exist",
                },
            };
        }
        // check if room exists
        const roomExists = await Room_1.Room.findOne({
            where: { id: roomId },
        });
        if (!roomExists) {
            return {
                error: {
                    field: "roomId",
                    message: "a room with that id does not exist",
                },
            };
        }
        const chat = Chat_1.Chat.create({
            text,
            senderId,
            roomId,
        });
        const savedChat = await chat.save();
        return {
            chat: savedChat,
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Chat_1.Chat])
], ChatResolver.prototype, "chats", null);
__decorate([
    (0, type_graphql_1.Query)(() => Chat_1.Chat, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID))
], ChatResolver.prototype, "chatById", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Chat_1.Chat]),
    __param(0, (0, type_graphql_1.Arg)("senderId", () => type_graphql_1.ID))
], ChatResolver.prototype, "chatsBySender", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Chat_1.Chat]),
    __param(0, (0, type_graphql_1.Arg)("roomId", () => type_graphql_1.ID))
], ChatResolver.prototype, "chatsByRoom", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => objectTypes_1.ChatResponse),
    __param(0, (0, type_graphql_1.Arg)("text", () => String)),
    __param(1, (0, type_graphql_1.Arg)("senderId", () => type_graphql_1.ID)),
    __param(2, (0, type_graphql_1.Arg)("roomId", () => type_graphql_1.ID))
], ChatResolver.prototype, "createChat", null);
ChatResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ChatResolver);
exports.ChatResolver = ChatResolver;
