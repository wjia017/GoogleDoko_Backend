import bcrypt from "bcryptjs";
import { appDataSource } from "../config/database";
import { UserRole } from "../entities/user.entity";
import { userRepository } from "../repository";

/*
|--------------------------------------------------------------------------
| Create Admin Account
|--------------------------------------------------------------------------
*/

const createAdmin = async (): Promise<void> => {
  try {
    console.log("----------------------------------------");
    console.log("GoogleDoko Admin Setup");
    console.log("----------------------------------------");

    console.log("Connecting to database...");
    if (!appDataSource.isInitialized) {
      await appDataSource.initialize();
    }
    console.log("Database connected successfully.");

    const firstName = "GoogleDoko";
    const lastName = "Admin";
    const email = "admin@googledoko.com";
    const password = "Admin@12345";

    const existingUser = await userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.role === UserRole.ADMIN) {
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
      console.error(
        `The email ${email} is already registered as a ${existingUser.role}.`
      );
      console.error("Please use a different email address.");
      return;
    }

    console.log("Hashing admin password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: UserRole.ADMIN,
      isVerified: true,
      rewardPoints: 0,
    });

    const savedAdmin = await userRepository.save(admin);

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
  } catch (error) {
    console.error("----------------------------------------");
    console.error("Unable to create admin account.");
    console.error("----------------------------------------");
    console.error(error);
    process.exitCode = 1;
  } finally {
    if (appDataSource.isInitialized) {
      await appDataSource.destroy();
      console.log("Database connection closed.");
    }
  }
};

createAdmin();
