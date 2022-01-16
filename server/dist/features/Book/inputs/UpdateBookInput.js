"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookInput = void 0;
const type_graphql_1 = require("type-graphql");
let UpdateBookInput = class UpdateBookInput {
    id;
    title;
    price;
    authorId;
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID)
], UpdateBookInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true })
], UpdateBookInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float, { nullable: true })
], UpdateBookInput.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID, { nullable: true })
], UpdateBookInput.prototype, "authorId", void 0);
UpdateBookInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateBookInput);
exports.UpdateBookInput = UpdateBookInput;
