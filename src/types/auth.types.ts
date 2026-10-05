import {
  UserRole,
} from "../entities/user.entity";

export interface RegisterAddressData {

  fullName: string;

  phone: string;

  addressLine: string;

  city: string;

  district?: string;

  province?: string;

  postalCode?: string;
}

export interface RegisterUserData {

  firstName: string;

  lastName: string;

  email: string;

  password: string;

  phone?: string;

  location?: string;

  address: RegisterAddressData;

  role?: UserRole;
}

export interface LoginUserData {

  email: string;

  password: string;
}

export interface SafeUser {

  id: number;

  firstName: string;

  lastName: string;

  email: string;

  phone?: string | null;

  location?: string | null;

  role: UserRole;

  isVerified: boolean;

  rewardPoints: number;
}

export interface AuthResponse {

  user: SafeUser;

  token: string;
}