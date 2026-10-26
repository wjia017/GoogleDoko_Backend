import bcrypt from "bcryptjs";
import { appDataSource } from "./config/database";
import { UserRole } from "./entities/user.entity";
import { userRepository } from "./repository";

async function resetAdminPassword() {
  try {
    if (!appDataSource.isInitialized) {
      await appDataSource.initialize();
    }

    const email = "admin@googledoko.com";
    const newPassword = "Admin@12345";

    const admin = await userRepository.findOne({
      where: { email },
    });

    if (!admin || admin.role !== UserRole.ADMIN) {
      console.log("Admin account not found.");
      return;
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    admin.isVerified = true;

    await userRepository.save(admin);

    console.log("Admin password reset successfully.");
    console.log("Email: admin@googledoko.com");
  } catch (error) {
    console.error("Password reset failed:", error);
    process.exitCode = 1;
  } finally {
    if (appDataSource.isInitialized) {
      await appDataSource.destroy();
    }
  }
}

resetAdminPassword();
