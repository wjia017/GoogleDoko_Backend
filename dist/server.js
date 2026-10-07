"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const PORT = Number(process.env.PORT) || 5000;
const startServer = async () => {
    try {
        await database_1.appDataSource.initialize();
        console.log("Database connected successfully.");
        app_1.default.listen(PORT, () => {
            console.log(`GoogleDoko API running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start the application.");
        console.error(error);
        process.exit(1);
    }
};
startServer();
