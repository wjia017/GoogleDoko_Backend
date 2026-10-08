import { appDataSource } from "../config/database";

import {
  User,
  Address,
  Vendor,
  Product,
  Order,
  Cart,
  Wishlist,
  Review,
  Coupon,
  SupportMessage,
  Subscriber,
  PlatformSetting,
  RewardLog,
  PasswordReset,
} from "../entities";

export const userRepository = appDataSource.getRepository(User);

export const addressRepository = appDataSource.getRepository(Address);

export const vendorRepository = appDataSource.getRepository(Vendor);

export const productRepository = appDataSource.getRepository(Product);

export const orderRepository = appDataSource.getRepository(Order);

export const cartRepository = appDataSource.getRepository(Cart);

export const wishlistRepository = appDataSource.getRepository(Wishlist);

export const reviewRepository = appDataSource.getRepository(Review);

export const couponRepository = appDataSource.getRepository(Coupon);

export const supportMessageRepository = appDataSource.getRepository(SupportMessage);

export const subscriberRepository = appDataSource.getRepository(Subscriber);

export const settingRepository = appDataSource.getRepository(PlatformSetting);

export const rewardLogRepository = appDataSource.getRepository(RewardLog);

export const passwordResetRepository = appDataSource.getRepository(PasswordReset);
