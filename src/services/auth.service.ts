import bcrypt from "bcryptjs";

import {
  RegisterUserData,
  LoginUserData,
  SafeUser,
} from "../types/auth.types";

import {
  User,
  UserRole,
} from "../entities/user.entity";

import {
  Address,
} from "../entities/address.entity";

import {
  appDataSource,
} from "../config/database";

import {
  userRepository,
} from "../repository";

import {
  generateToken,
} from "../utils/jwt";

export class AuthService {

  /*
  |--------------------------------------------------------------------------
  | Customer Registration
  |--------------------------------------------------------------------------
  |
  | Customer registration creates:
  |
  | 1. User account
  | 2. Signup address
  |
  | Both operations are performed inside
  | one database transaction.
  |
  */

  async register(
    data: RegisterUserData
  ): Promise<SafeUser> {

    const existingUser =
      await userRepository.findOne({
        where: {
          email: data.email,
        },
      });

    if (existingUser) {
      throw new Error(
        "ACCOUNT_ALREADY_EXISTS"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10
      );

    /*
     * Start TypeORM transaction.
     *
     * Anything inside this transaction
     * will either completely succeed or
     * completely rollback.
     */
    const savedUser =
      await appDataSource.transaction(
        async (transactionManager) => {

          /*
           * Use the transaction manager's
           * repository inside the transaction.
           */
          const transactionUserRepository =
            transactionManager.getRepository(
              User
            );

          const transactionAddressRepository =
            transactionManager.getRepository(
              Address
            );

          /*
           * Create customer user.
           */
          const user =
            transactionUserRepository.create({
              firstName:
                data.firstName,

              lastName:
                data.lastName,

              email:
                data.email,

              password:
                hashedPassword,

              /*
               * Normal registration is always
               * a CUSTOMER registration.
               *
               * User cannot register as admin
               * through this endpoint.
               */
              role:
                UserRole.CUSTOMER,

              ...(data.phone !== undefined
                ? {
                    phone:
                      data.phone,
                  }
                : {}),

              ...(data.location !== undefined
                ? {
                    location:
                      data.location,
                  }
                : {}),
            });

          /*
           * Save user first so that we get
           * the generated user ID.
           */
          const createdUser =
            await transactionUserRepository.save(
              user
            );

          /*
           * Create the signup address.
           *
           * This address automatically becomes
           * the customer's default address.
           */
          const address =
            transactionAddressRepository.create({
              fullName:
                data.address.fullName,

              phone:
                data.address.phone,

              addressLine:
                data.address.addressLine,

              city:
                data.address.city,

              ...(data.address.district !== undefined
                ? {
                    district:
                      data.address.district,
                  }
                : {}),

              ...(data.address.province !== undefined
                ? {
                    province:
                      data.address.province,
                  }
                : {}),

              ...(data.address.postalCode !== undefined
                ? {
                    postalCode:
                      data.address.postalCode,
                  }
                : {}),

              /*
               * IMPORTANT:
               *
               * The address supplied during
               * registration is the first/default
               * address.
               */
              isDefault:
                true,

              /*
               * Connect address to the newly
               * created customer.
               */
              userId:
                createdUser.id,
            });

          /*
           * Save address.
           */
          await transactionAddressRepository.save(
            address
          );

          /*
           * Return the created user.
           *
           * If anything above throws an error,
           * TypeORM automatically rolls back
           * both user and address creation.
           */
          return createdUser;
        }
      );

    /*
     * Return only safe user information.
     *
     * Password is never returned.
     */
    return this.toSafeUser(
      savedUser
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Vendor Registration
  |--------------------------------------------------------------------------
  */

  async registerVendor(
    data: RegisterUserData
  ): Promise<SafeUser> {

    const existingUser =
      await userRepository.findOne({
        where: {
          email: data.email,
        },
      });

    if (existingUser) {
      throw new Error(
        "ACCOUNT_ALREADY_EXISTS"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10
      );

    const vendor =
      userRepository.create({
        firstName:
          data.firstName,

        lastName:
          data.lastName,

        email:
          data.email,

        password:
          hashedPassword,

        /*
         * Vendor registration explicitly
         * creates a VENDOR account.
         */
        role:
          UserRole.VENDOR,

        ...(data.phone !== undefined
          ? {
              phone:
                data.phone,
            }
          : {}),

        ...(data.location !== undefined
          ? {
              location:
                data.location,
            }
          : {}),
      });

    const savedVendor =
      await userRepository.save(
        vendor
      );

    return this.toSafeUser(
      savedVendor
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Login
  |--------------------------------------------------------------------------
  */

  async login(
    data: LoginUserData
  ): Promise<{
    user: SafeUser;
    token: string;
  }> {

    const user =
      await userRepository
        .createQueryBuilder("user")
        .addSelect("user.password")
        .where(
          "user.email = :email",
          {
            email:
              data.email,
          }
        )
        .getOne();

    if (!user) {
      throw new Error(
        "INVALID_CREDENTIALS"
      );
    }

    const passwordMatches =
      await bcrypt.compare(
        data.password,
        user.password
      );

    if (!passwordMatches) {
      throw new Error(
        "INVALID_CREDENTIALS"
      );
    }

    const token =
      generateToken({
        userId:
          user.id,

        role:
          user.role,
      });

    return {
      user:
        this.toSafeUser(
          user
        ),

      token,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Get Current User
  |--------------------------------------------------------------------------
  */

  async getCurrentUser(
    userId: number
  ): Promise<SafeUser> {

    const user =
      await userRepository.findOne({
        where: {
          id:
            userId,
        },
      });

    if (!user) {
      throw new Error(
        "USER_NOT_FOUND"
      );
    }

    return this.toSafeUser(
      user
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Convert User To Safe User
  |--------------------------------------------------------------------------
  */

  private toSafeUser(
    user: User
  ): SafeUser {

    return {
      id:
        user.id,

      firstName:
        user.firstName,

      lastName:
        user.lastName,

      email:
        user.email,

      ...(user.phone !== undefined
        ? {
            phone:
              user.phone,
          }
        : {}),

      ...(user.location !== undefined
        ? {
            location:
              user.location,
          }
        : {}),

      role:
        user.role,

      isVerified:
        user.isVerified,

      rewardPoints:
        user.rewardPoints,
    };
  }
}

export default new AuthService();