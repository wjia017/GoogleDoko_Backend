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
exports.Coupon = void 0;
const typeorm_1 = require("typeorm");
let Coupon = class Coupon {
    id;
    code;
    discountType;
    discountValue;
    minOrder;
    maxUses;
    timesUsed;
    expiryDate;
    active;
    createdAt;
};
exports.Coupon = Coupon;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Coupon.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        unique: true,
    }),
    __metadata("design:type", String)
], Coupon.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "discount_type",
        type: "varchar",
        length: 20,
        default: "percentage",
    }),
    __metadata("design:type", String)
], Coupon.prototype, "discountType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "discount_value",
        type: "double",
    }),
    __metadata("design:type", Number)
], Coupon.prototype, "discountValue", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "min_order",
        type: "double",
        default: 0,
    }),
    __metadata("design:type", Number)
], Coupon.prototype, "minOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "max_uses",
        type: "int",
        default: 100,
    }),
    __metadata("design:type", Number)
], Coupon.prototype, "maxUses", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "times_used",
        type: "int",
        default: 0,
    }),
    __metadata("design:type", Number)
], Coupon.prototype, "timesUsed", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "expiry_date",
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Coupon.prototype, "expiryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        default: 1,
    }),
    __metadata("design:type", Number)
], Coupon.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: "created_at",
    }),
    __metadata("design:type", Date)
], Coupon.prototype, "createdAt", void 0);
exports.Coupon = Coupon = __decorate([
    (0, typeorm_1.Entity)("coupons")
], Coupon);
