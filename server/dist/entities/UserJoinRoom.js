"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoom = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Room_1 = require("./Room");
const User_1 = require("./User");
let UserRoom = class UserRoom extends typeorm_1.BaseEntity {
    userId;
    roomId;
    user;
    room;
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryColumn)({ type: "int" })
], UserRoom.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryColumn)({ type: "int" })
], UserRoom.prototype, "roomId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.userRoom, { primary: true }),
    (0, typeorm_1.JoinColumn)({ name: "userId" })
], UserRoom.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Room_1.Room, (room) => room.userRoom, { primary: true }),
    (0, typeorm_1.JoinColumn)({ name: "roomId" })
], UserRoom.prototype, "room", void 0);
UserRoom = __decorate([
    (0, typeorm_1.Entity)()
], UserRoom);
exports.UserRoom = UserRoom;
