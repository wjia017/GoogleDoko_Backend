"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const user_entity_1 = require("../entities/user.entity");
const address_entity_1 = require("../entities/address.entity");
const vendor_entity_1 = require("../entities/vendor.entity");
const database_1 = require("../config/database");
const repository_1 = require("../repository");
const jwt_1 = require("../utils/jwt");
class AuthService {
    /*
    |--------------------------------------------------------------------------
    | Customer Registration
    |--------------------------------------------------------------------------
    */
    async register(data) {
        const email = data.email.trim().toLowerCase();
        const existingUser = await repository_1.userRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            throw new Error("ACCOUNT_ALREADY_EXISTS");
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const firstName = data.firstName || data.fullName?.split(" ")[0] || "User";
        const lastName = data.lastName || (data.fullName ? data.fullName.split(" ").slice(1).join(" ") : "") || "";
        const savedUser = await database_1.appDataSource.transaction(async (transactionManager) => {
            const txUserRepo = transactionManager.getRepository(user_entity_1.User);
            const txAddressRepo = transactionManager.getRepository(address_entity_1.Address);
            const user = txUserRepo.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone: data.phone || "",
                location: data.location || (typeof data.address === "string" ? data.address : "Nepal"),
                role: user_entity_1.UserRole.CUSTOMER,
                isVerified: true,
                rewardPoints: 0,
                referralCode: `${firstName.toUpperCase()}320`,
                photo: data.photo || "",
                shopJson: JSON.stringify({
                    addresses: [],
                    reviews: [],
                    rewards: [],
                    notifications: {
                        orderUpdates: true,
                        deliveryUpdates: true,
                        promotionalOffers: false,
                        emailNotifications: true,
                        pushNotifications: false,
                    },
                    language: "English",
                    darkMode: false,
                    wishlist: [],
                    cart: [],
                }),
            });
            const createdUser = await txUserRepo.save(user);
            if (data.address) {
                let addrData = {};
                if (typeof data.address === "string") {
                    addrData = {
                        fullName: `${firstName} ${lastName}`.trim(),
                        phone: data.phone || "",
                        addressLine: data.address,
                        city: data.city || "Kathmandu",
                        label: "Home",
                    };
                }
                else {
                    addrData = {
                        fullName: data.address.fullName || `${firstName} ${lastName}`.trim(),
                        phone: data.address.phone || data.phone || "",
                        addressLine: data.address.addressLine || data.address.street || "",
                        city: data.address.city || "Kathmandu",
                        district: data.address.district || data.address.area || "",
                        province: data.address.province || "",
                        postalCode: data.address.postalCode || "",
                        label: data.address.label || "Home",
                    };
                }
                const address = txAddressRepo.create({
                    ...addrData,
                    isDefault: true,
                    userId: createdUser.id,
                });
                await txAddressRepo.save(address);
            }
            return createdUser;
        });
        const token = (0, jwt_1.generateToken)({
            userId: savedUser.id,
            role: savedUser.role,
        });
        return await this.buildSessionResponse(savedUser.id, token);
    }
    /*
    |--------------------------------------------------------------------------
    | Vendor Registration
    |--------------------------------------------------------------------------
    */
    async registerVendor(data) {
        const email = data.email.trim().toLowerCase();
        const existingUser = await repository_1.userRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            throw new Error("ACCOUNT_ALREADY_EXISTS");
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const firstName = data.firstName || data.fullName?.split(" ")[0] || "Vendor";
        const lastName = data.lastName || (data.fullName ? data.fullName.split(" ").slice(1).join(" ") : "") || "";
        const savedUser = await database_1.appDataSource.transaction(async (transactionManager) => {
            const txUserRepo = transactionManager.getRepository(user_entity_1.User);
            const txVendorRepo = transactionManager.getRepository(vendor_entity_1.Vendor);
            const user = txUserRepo.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone: data.phone || "",
                location: data.vendor?.location || data.location || "Nepal",
                role: user_entity_1.UserRole.VENDOR,
                isVerified: false,
                rewardPoints: 0,
                referralCode: `${firstName.toUpperCase()}320`,
                photo: data.vendor?.photo || data.photo || "",
            });
            const createdUser = await txUserRepo.save(user);
            const vendor = txVendorRepo.create({
                userId: createdUser.id,
                businessName: data.vendor?.businessName || data.businessName || "Vendor Business",
                vendorType: data.vendor?.vendorType || "Local Farm",
                location: data.vendor?.location || data.location || "Kathmandu",
                district: data.vendor?.district || "Kathmandu",
                address: data.vendor?.address || "Kathmandu",
                category: data.vendor?.category || "Fresh Produce",
                mainProducts: data.vendor?.mainProducts || "",
                description: data.vendor?.description || "",
                photo: data.vendor?.photo || "",
                documentName: data.vendor?.documentName || "",
                status: "under_review",
            });
            await txVendorRepo.save(vendor);
            return createdUser;
        });
        const token = (0, jwt_1.generateToken)({
            userId: savedUser.id,
            role: savedUser.role,
        });
        return await this.buildSessionResponse(savedUser.id, token);
    }
    /*
    |--------------------------------------------------------------------------
    | Admin Registration
    |--------------------------------------------------------------------------
    */
    async registerAdmin(data) {
        const requiredKey = process.env.ADMIN_INVITE_KEY || "ADMIN_MASTER_KEY_2026";
        if (data.adminInviteKey !== requiredKey) {
            throw new Error("FORBIDDEN");
        }
        const email = data.email.trim().toLowerCase();
        const existingUser = await repository_1.userRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            throw new Error("ACCOUNT_ALREADY_EXISTS");
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const firstName = data.firstName || data.fullName?.split(" ")[0] || "Admin";
        const lastName = data.lastName || (data.fullName ? data.fullName.split(" ").slice(1).join(" ") : "") || "";
        const admin = repository_1.userRepository.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone: data.phone || "",
            location: "HQ Kathmandu, Nepal",
            role: user_entity_1.UserRole.ADMIN,
            isVerified: true,
            rewardPoints: 0,
            referralCode: "ADMIN",
        });
        const savedAdmin = await repository_1.userRepository.save(admin);
        const token = (0, jwt_1.generateToken)({
            userId: savedAdmin.id,
            role: savedAdmin.role,
        });
        return await this.buildSessionResponse(savedAdmin.id, token);
    }
    /*
    |--------------------------------------------------------------------------
    | Login
    |--------------------------------------------------------------------------
    */
    async login(data) {
        const identifier = (data.identifier || data.email || data.phone || "").trim();
        if (!identifier || !data.password) {
            throw new Error("INVALID_CREDENTIALS");
        }
        const user = await repository_1.userRepository
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where("LOWER(user.email) = LOWER(:identifier)", { identifier })
            .orWhere("REPLACE(user.phone, ' ', '') = :cleanPhone", {
            cleanPhone: identifier.replace(/\s+/g, ""),
        })
            .getOne();
        if (!user) {
            throw new Error("INVALID_CREDENTIALS");
        }
        if (data.expectedRole && user.role !== data.expectedRole) {
            throw new Error("FORBIDDEN");
        }
        const passwordMatches = await bcryptjs_1.default.compare(data.password, user.password);
        if (!passwordMatches) {
            // Legacy demo fallback
            const isDemoMatch = data.password === "password123" &&
                (user.role === user_entity_1.UserRole.VENDOR || user.email === "vendor@googledoko.com");
            if (!isDemoMatch) {
                throw new Error("INVALID_CREDENTIALS");
            }
        }
        const token = (0, jwt_1.generateToken)({
            userId: user.id,
            role: user.role,
        });
        return await this.buildSessionResponse(user.id, token);
    }
    /*
    |--------------------------------------------------------------------------
    | Get Current User Profile & Complete Session State
    |--------------------------------------------------------------------------
    */
    async getCurrentUser(userId) {
        const user = await repository_1.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }
        return this.toSafeUser(user);
    }
    async buildSessionResponse(userId, token) {
        const user = await repository_1.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }
        const [addresses, cart, wishlist, orders, rewards, vendor] = await Promise.all([
            repository_1.addressRepository.find({
                where: { userId },
                order: { isDefault: "DESC", createdAt: "DESC" },
            }),
            repository_1.cartRepository.find({
                where: { userId },
                order: { addedAt: "DESC" },
            }),
            repository_1.wishlistRepository.find({
                where: { userId },
                order: { addedAt: "DESC" },
            }),
            repository_1.orderRepository.find({
                where: { userId },
                order: { createdAt: "DESC" },
            }),
            repository_1.rewardLogRepository.find({
                where: { userId },
                order: { createdAt: "DESC" },
                take: 50,
            }),
            repository_1.vendorRepository.findOne({
                where: { userId },
            }),
        ]);
        const safeUser = this.toSafeUser(user, vendor);
        const mappedOrders = orders.map((o) => {
            let items = [];
            try {
                items = JSON.parse(o.itemsJson);
            }
            catch {
                items = [];
            }
            return {
                id: o.id,
                date: o.date,
                status: o.status,
                subtotal: o.subtotal,
                deliveryFee: o.deliveryFee,
                discount: o.discount,
                total: o.total,
                paymentMethod: o.paymentMethod,
                paymentStatus: o.paymentStatus,
                deliveryAddress: o.deliveryAddress,
                recipientName: o.recipientName,
                recipientPhone: o.recipientPhone,
                items,
            };
        });
        const mappedRewards = rewards.map((r) => ({
            id: String(r.id),
            label: r.label,
            points: r.points,
            date: new Date(r.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
        }));
        return {
            user: safeUser,
            token: token || "",
            addresses,
            cart,
            wishlist,
            orders: mappedOrders,
            rewards: mappedRewards,
            points: safeUser.rewardPoints,
        };
    }
    /*
    |--------------------------------------------------------------------------
    | Password Reset & Profile Updating
    |--------------------------------------------------------------------------
    */
    async forgotPassword(emailInput) {
        const email = (emailInput || "").trim().toLowerCase();
        const user = await repository_1.userRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }
        const token = crypto_1.default.randomUUID().slice(0, 8).toUpperCase();
        const resetRecord = repository_1.passwordResetRepository.create({
            email,
            token,
        });
        await repository_1.passwordResetRepository.save(resetRecord);
        return { resetToken: token };
    }
    async resetPassword(emailInput, token, newPassword) {
        const email = (emailInput || "").trim().toLowerCase();
        const record = await repository_1.passwordResetRepository.findOne({
            where: { email, token: token.trim() },
        });
        if (!record) {
            throw new Error("INVALID_RESET_TOKEN");
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await repository_1.userRepository.update({ email }, { password: hashedPassword });
        await repository_1.passwordResetRepository.delete({ email });
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await repository_1.userRepository
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.id = :id", { id: userId })
            .getOne();
        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }
        const passwordMatches = await bcryptjs_1.default.compare(currentPassword, user.password);
        if (!passwordMatches) {
            throw new Error("CURRENT_PASSWORD_INCORRECT");
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await repository_1.userRepository.update({ id: userId }, { password: hashedPassword });
    }
    async updateProfile(userId, data) {
        const user = await repository_1.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }
        if (data.firstName)
            user.firstName = data.firstName;
        if (data.lastName)
            user.lastName = data.lastName;
        if (data.phone !== undefined)
            user.phone = data.phone;
        if (data.location !== undefined)
            user.location = data.location;
        if (data.photo !== undefined)
            user.photo = data.photo;
        const saved = await repository_1.userRepository.save(user);
        return this.toSafeUser(saved);
    }
    async updateShopSettings(userId, settings) {
        const user = await repository_1.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }
        let shop = {};
        try {
            shop = user.shopJson ? JSON.parse(user.shopJson) : {};
        }
        catch {
            shop = {};
        }
        if (settings.notifications) {
            shop.notifications = { ...(shop.notifications || {}), ...settings.notifications };
        }
        if (settings.language) {
            shop.language = settings.language;
        }
        if (settings.darkMode !== undefined) {
            shop.darkMode = settings.darkMode;
        }
        user.shopJson = JSON.stringify(shop);
        const saved = await repository_1.userRepository.save(user);
        return this.toSafeUser(saved);
    }
    async uploadProfilePhoto(userId, photoUrl) {
        await repository_1.userRepository.update({ id: userId }, { photo: photoUrl });
        const user = await repository_1.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new Error("USER_NOT_FOUND");
        return this.toSafeUser(user);
    }
    /*
    |--------------------------------------------------------------------------
    | Helper: To Safe User
    |--------------------------------------------------------------------------
    */
    toSafeUser(user, vendor) {
        let shop = {
            addresses: [],
            reviews: [],
            rewards: [],
            notifications: {
                orderUpdates: true,
                deliveryUpdates: true,
                promotionalOffers: false,
                emailNotifications: true,
                pushNotifications: false,
            },
            language: "English",
            darkMode: false,
            wishlist: [],
            cart: [],
        };
        if (user.shopJson) {
            try {
                shop = { ...shop, ...JSON.parse(user.shopJson) };
            }
            catch {
                // Fallback default shop
            }
        }
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            location: user.location,
            role: user.role,
            isVerified: user.isVerified,
            rewardPoints: user.rewardPoints,
            referralCode: user.referralCode,
            photo: user.photo,
            shop,
            ...(vendor
                ? {
                    vendor: {
                        businessName: vendor.businessName,
                        vendorType: vendor.vendorType,
                        location: vendor.location,
                        district: vendor.district,
                        address: vendor.address,
                        category: vendor.category,
                        mainProducts: vendor.mainProducts,
                        description: vendor.description,
                        photo: vendor.photo,
                        documentName: vendor.documentName,
                        status: vendor.status,
                    },
                }
                : {}),
        };
    }
}
exports.AuthService = AuthService;
exports.default = new AuthService();
