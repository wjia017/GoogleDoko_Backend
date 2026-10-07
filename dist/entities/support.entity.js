"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = exports.SupportMessage = void 0;
const typeorm_1 = require("typeorm");
let SupportMessage = class SupportMessage {
    id;
    fullName;
    email;
    phone;
    address;
    subject;
    inquiry;
    status;
    createdAt;
    updatedAt;
};
exports.SupportMessage = SupportMessage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SupportMessage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 100,
        name: "full_name",
        default: "",
    }),
    __metadata("design:type", String)
], SupportMessage.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
    }),
    __metadata("design:type", String)
], SupportMessage.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        default: "",
        nullable: true,
    }),
    __metadata("design:type", String)
], SupportMessage.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: "",
        nullable: true,
    }),
    __metadata("design:type", String)
], SupportMessage.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
        default: "Customer Inquiry",
        nullable: true,
    }),
    __metadata("design:type", String)
], SupportMessage.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        name: "message",
    }),
    __metadata("design:type", String)
], SupportMessage.prototype, "inquiry", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        default: "Open",
    }),
    __metadata("design:type", String)
], SupportMessage.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: "created_at",
    }),
    __metadata("design:type", Date)
], SupportMessage.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        nullable: true,
    }),
    __metadata("design:type", Date)
], SupportMessage.prototype, "updatedAt", void 0);
exports.SupportMessage = SupportMessage = __decorate([
    (0, typeorm_1.Entity)("support_messages")
], SupportMessage);
let Subscriber = class Subscriber {
    email;
    createdAt;
};
exports.Subscriber = Subscriber;
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: "varchar",
        length: 255,
    }),
    __metadata("design:type", String)
], Subscriber.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: "created_at",
    }),
    __metadata("design:type", Date)
], Subscriber.prototype, "createdAt", void 0);
exports.Subscriber = Subscriber = __decorate([
    (0, typeorm_1.Entity)("subscribers")
], Subscriber);
