import {
  appDataSource,
} from "../config/database";

import {
  User,
} from "../entities/user.entity";

import {
  Address,
} from "../entities/address.entity";

import {
  VendorProfile,
} from "../entities/vendor-profile.entity";

export const userRepository =
  appDataSource.getRepository(User);

export const addressRepository =
  appDataSource.getRepository(Address);


export const vendorProfileRepository =
  appDataSource.getRepository(
    VendorProfile
  );