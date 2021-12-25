"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedUserRoomResponse = exports.UserRoomResponse = exports.ChatResponse = exports.RoomResponse = exports.UserResponse = exports.ExtendedFieldError = exports.FieldError = void 0;
const type_graphql_1 = require("type-graphql");
const Chat_1 = require("../entities/Chat");
const Room_1 = require("../entities/Room");
const User_1 = require("../entities/User");
const UserRoom_1 = require("../entities/UserRoom");
let FieldError = class FieldError {
    field;
    message;
};
__decorate([
    (0, type_graphql_1.Field)(() => String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
exports.FieldError = FieldError;
let ExtendedFieldError = class ExtendedFieldError {
    field;
    message;
    resp;
};
__decorate([
    (0, type_graphql_1.Field)(() => String)
], ExtendedFieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String)
], ExtendedFieldError.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String)
], ExtendedFieldError.prototype, "resp", void 0);
ExtendedFieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExtendedFieldError);
exports.ExtendedFieldError = ExtendedFieldError;
let UserResponse = class UserResponse {
    user;
    error;
};
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true })
], UserResponse.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => FieldError, { nullable: true })
], UserResponse.prototype, "error", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
exports.UserResponse = UserResponse;
let RoomResponse = class RoomResponse {
    room;
    error;
};
__decorate([
    (0, type_graphql_1.Field)(() => Room_1.Room, { nullable: true })
], RoomResponse.prototype, "room", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => FieldError, { nullable: true })
], RoomResponse.prototype, "error", void 0);
RoomResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], RoomResponse);
exports.RoomResponse = RoomResponse;
let ChatResponse = class ChatResponse {
    chat;
    error;
};
__decorate([
    (0, type_graphql_1.Field)(() => Chat_1.Chat, { nullable: true })
], ChatResponse.prototype, "chat", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => FieldError, { nullable: true })
], ChatResponse.prototype, "error", void 0);
ChatResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], ChatResponse);
exports.ChatResponse = ChatResponse;
let UserRoomResponse = class UserRoomResponse {
    userRoom;
    error;
};
__decorate([
    (0, type_graphql_1.Field)(() => UserRoom_1.UserRoom, { nullable: true })
], UserRoomResponse.prototype, "userRoom", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => FieldError, { nullable: true })
], UserRoomResponse.prototype, "error", void 0);
UserRoomResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserRoomResponse);
exports.UserRoomResponse = UserRoomResponse;
let ExtendedUserRoomResponse = class ExtendedUserRoomResponse {
    userRoom;
    error;
};
__decorate([
    (0, type_graphql_1.Field)(() => UserRoom_1.UserRoom, { nullable: true })
], ExtendedUserRoomResponse.prototype, "userRoom", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => ExtendedFieldError, { nullable: true })
], ExtendedUserRoomResponse.prototype, "error", void 0);
ExtendedUserRoomResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExtendedUserRoomResponse);
exports.ExtendedUserRoomResponse = ExtendedUserRoomResponse;
