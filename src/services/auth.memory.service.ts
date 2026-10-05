import crypto from "crypto";
import bcrypt from "bcryptjs";

import {
  LoginUserData,
  RegisterUserData,
  SafeUser,
} from "../types/auth.types";

import { generateToken } from "../utils/jwt";



interface MemoryUser extends SafeUser {
  password: string;
}

class AuthMemoryService {
  private users: MemoryUser[] = [];

  async register(
    data: RegisterUserData
  ): Promise<{
    user: SafeUser;
    token: string;
  }> {
    const existingUser = this.users.find(
      (user) => user.email === data.email
    );

    if (existingUser) {
      throw new Error(
        "An account with this email already exists"
      );
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      10
    );

    const user: MemoryUser = {
      id: crypto.randomUUID(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      role: "customer",
      isVerified: false,
      rewardPoints: 0,

      ...(data.phone !== undefined && {
        phone: data.phone,
      }),

      ...(data.location !== undefined && {
        location: data.location,
      }),
    };

    this.users.push(user);

    const token = generateToken({
      userId: user.id,
      role: user.role,
    });

    return {
      user: this.toSafeUser(user),
      token,
    };
  }

  async login(
    data: LoginUserData
  ): Promise<{
    user: SafeUser;
    token: string;
  }> {
    const user = this.users.find(
      (item) => item.email === data.email
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken({
      userId: user.id,
      role: user.role,
    });

    return {
      user: this.toSafeUser(user),
      token,
    };
  }

  async getCurrentUser(
    userId: string
  ): Promise<SafeUser> {
    const user = this.users.find(
      (item) => item.id === userId
    );

    if (!user) {
      throw new Error("User not found");
    }

    return this.toSafeUser(user);
  }

  private toSafeUser(
    user: MemoryUser
  ): SafeUser {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,

      ...(user.phone !== undefined && {
        phone: user.phone,
      }),

      ...(user.location !== undefined && {
        location: user.location,
      }),

      role: user.role,
      isVerified: user.isVerified,
      rewardPoints: user.rewardPoints,
    };
  }
}

export default new AuthMemoryService();