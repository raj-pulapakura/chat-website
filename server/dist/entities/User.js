"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Chat_1 = require("./Chat");
const Room_1 = require("./Room");
const UserRoom_1 = require("./UserRoom");
let User = class User extends typeorm_1.BaseEntity {
    id;
    name;
    password;
    rooms;
    chats;
    userRoom;
    createdAt;
    updatedAt;
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)()
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: "varchar" })
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" })
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Room_1.Room, (room) => room.creator)
], User.prototype, "rooms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Chat_1.Chat, (chat) => chat.sender)
], User.prototype, "chats", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserRoom_1.UserRoom, (userRoom) => userRoom.user)
], User.prototype, "userRoom", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)()
], User.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)()
], User.prototype, "updatedAt", void 0);
User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], User);
exports.User = User;
