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
exports.VendorProfile = exports.VendorStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var VendorStatus;
(function (VendorStatus) {
    VendorStatus["PENDING"] = "pending";
    VendorStatus["APPROVED"] = "approved";
    VendorStatus["REJECTED"] = "rejected";
    VendorStatus["SUSPENDED"] = "suspended";
})(VendorStatus || (exports.VendorStatus = VendorStatus = {}));
let VendorProfile = class VendorProfile {
    id;
    user;
    userId;
    businessName;
    businessEmail;
    businessPhone;
    description;
    status;
    createdAt;
    updatedAt;
};
exports.VendorProfile = VendorProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VendorProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({
        name: "userId",
    }),
    __metadata("design:type", user_entity_1.User)
], VendorProfile.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], VendorProfile.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 150,
    }),
    __metadata("design:type", String)
], VendorProfile.prototype, "businessName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
    }),
    __metadata("design:type", String)
], VendorProfile.prototype, "businessEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 20,
    }),
    __metadata("design:type", String)
], VendorProfile.prototype, "businessPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", String)
], VendorProfile.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: VendorStatus,
        default: VendorStatus.PENDING,
    }),
    __metadata("design:type", String)
], VendorProfile.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], VendorProfile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], VendorProfile.prototype, "updatedAt", void 0);
exports.VendorProfile = VendorProfile = __decorate([
    (0, typeorm_1.Entity)("vendor_profiles")
], VendorProfile);
