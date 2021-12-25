"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Chat_1 = require("./Chat");
const User_1 = require("./User");
const UserRoom_1 = require("./UserRoom");
let Room = class Room extends typeorm_1.BaseEntity {
    id;
    publicId;
    name;
    description;
    creatorId;
    creator;
    chats;
    userRoom;
    createdAt;
    updatedAt;
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Room.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ unique: true, type: "varchar" })
], Room.prototype, "publicId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: "varchar" })
], Room.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: "varchar" })
], Room.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)({ type: "int" })
], Room.prototype, "creatorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.rooms, { onDelete: "CASCADE" })
], Room.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Chat_1.Chat, (chat) => chat.room)
], Room.prototype, "chats", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserRoom_1.UserRoom, (userRoom) => userRoom.room)
], Room.prototype, "userRoom", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)()
], Room.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)()
], Room.prototype, "updatedAt", void 0);
Room = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], Room);
exports.Room = Room;
