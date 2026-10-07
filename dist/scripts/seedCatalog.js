"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const repository_1 = require("../repository");
const catalog_data_1 = require("../data/catalog.data");
/*
|--------------------------------------------------------------------------
| Seed Catalog Script
|--------------------------------------------------------------------------
*/
const seedCatalog = async () => {
    try {
        console.log("----------------------------------------");
        console.log("GoogleDoko Product Catalog Seeder");
        console.log("----------------------------------------");
        console.log("Connecting to database...");
        if (!database_1.appDataSource.isInitialized) {
            await database_1.appDataSource.initialize();
        }
        console.log("Database connected successfully.");
        let insertedCount = 0;
        let skippedCount = 0;
        for (const item of catalog_data_1.initialCatalog) {
            const existing = await repository_1.productRepository.findOne({
                where: { id: item.id },
            });
            if (existing) {
                skippedCount++;
                continue;
            }
            const product = repository_1.productRepository.create({
                id: item.id,
                name: item.name,
                category: item.category,
                weight: item.weight,
                price: item.price,
                rating: item.rating,
                sold: item.sold,
                origin: item.origin,
                seller: item.seller,
                image: item.image,
                stock: item.stock ?? 100,
                active: item.active ?? 1,
                description: item.description ?? null,
            });
            await repository_1.productRepository.save(product);
            insertedCount++;
        }
        console.log("----------------------------------------");
        console.log(`Seeding completed. Inserted: ${insertedCount}, Skipped: ${skippedCount}`);
        console.log("----------------------------------------");
    }
    catch (error) {
        console.error("----------------------------------------");
        console.error("Failed to seed catalog.");
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
seedCatalog();
