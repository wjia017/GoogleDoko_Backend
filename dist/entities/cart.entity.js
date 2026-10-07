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
exports.Cart = void 0;
const typeorm_1 = require("typeorm");
let Cart = class Cart {
    userId;
    productId;
    quantity;
    addedAt;
};
exports.Cart = Cart;
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        name: "user_id",
        type: "int",
    }),
    __metadata("design:type", Number)
], Cart.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        name: "product_id",
        type: "varchar",
        length: 100,
    }),
    __metadata("design:type", String)
], Cart.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        default: 1,
    }),
    __metadata("design:type", Number)
], Cart.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: "added_at",
    }),
    __metadata("design:type", Date)
], Cart.prototype, "addedAt", void 0);
exports.Cart = Cart = __decorate([
    (0, typeorm_1.Entity)("carts")
], Cart);
