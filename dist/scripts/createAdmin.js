"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../config/database");
const user_entity_1 = require("../entities/user.entity");
const repository_1 = require("../repository");
/*
|--------------------------------------------------------------------------
| Create Admin Account
|--------------------------------------------------------------------------
*/
const createAdmin = async () => {
    try {
        console.log("----------------------------------------");
        console.log("GoogleDoko Admin Setup");
        console.log("----------------------------------------");
        console.log("Connecting to database...");
        if (!database_1.appDataSource.isInitialized) {
            await database_1.appDataSource.initialize();
        }
        console.log("Database connected successfully.");
        const firstName = "GoogleDoko";
        const lastName = "Admin";
        const email = "admin@googledoko.com";
        const password = "Admin@12345";
        const existingUser = await repository_1.userRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            if (existingUser.role === user_entity_1.UserRole.ADMIN) {
                console.log("----------------------------------------");
                console.log("Admin account already exists.");
                console.log("----------------------------------------");
                console.log(`Admin ID: ${existingUser.id}`);
                console.log(`Admin Email: ${existingUser.email}`);
                console.log(`Admin Role: ${existingUser.role}`);
                console.log(`Admin Verified: ${existingUser.isVerified}`);
                console.log("----------------------------------------");
                return;
            }
            console.error("----------------------------------------");
            console.error("Unable to create admin account.");
            console.error("----------------------------------------");
            console.error(`The email ${email} is already registered as a ${existingUser.role}.`);
            console.error("Please use a different email address.");
            return;
        }
        console.log("Hashing admin password...");
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const admin = repository_1.userRepository.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: user_entity_1.UserRole.ADMIN,
            isVerified: true,
            rewardPoints: 0,
        });
        const savedAdmin = await repository_1.userRepository.save(admin);
        console.log("----------------------------------------");
        console.log("Admin account created successfully.");
        console.log("----------------------------------------");
        console.log(`Admin ID: ${savedAdmin.id}`);
        console.log(`Admin Name: ${savedAdmin.firstName} ${savedAdmin.lastName}`);
        console.log(`Admin Email: ${savedAdmin.email}`);
        console.log(`Admin Role: ${savedAdmin.role}`);
        console.log(`Admin Verified: ${savedAdmin.isVerified}`);
        console.log("----------------------------------------");
        console.log("Admin Login Credentials");
        console.log("----------------------------------------");
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log("----------------------------------------");
        console.log("IMPORTANT: Change this password before production.");
        console.log("----------------------------------------");
    }
    catch (error) {
        console.error("----------------------------------------");
        console.error("Unable to create admin account.");
        console.error("----------------------------------------");
        console.error(error);
        process.exitCode = 1;
    }
    finally {
        if (database_1.appDataSource.isInitialized) {
            await database_1.appDataSource.destroy();
            console.log("Database connection closed.");
        }
    }
};
createAdmin();
