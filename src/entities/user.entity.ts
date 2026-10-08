import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Address } from "./address.entity";

export enum UserRole {
  CUSTOMER = "customer",
  VENDOR = "vendor",
  ADMIN = "admin",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 100,
    name: "first_name",
    default: "",
  })
  firstName!: string;

  @Column({
    type: "varchar",
    length: 100,
    name: "last_name",
    default: "",
  })
  lastName!: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  email!: string;

  @Column({
    type: "varchar",
    length: 255,
    name: "password_hash",
  })
  password!: string;

  @Column({
    type: "varchar",
    length: 50,
    default: "",
    nullable: true,
  })
  phone!: string | null;

  @Column({
    type: "varchar",
    length: 255,
    default: "",
    nullable: true,
  })
  location!: string | null;

  @Column({
    type: "varchar",
    length: 50,
    default: UserRole.CUSTOMER,
  })
  role!: UserRole | string;

  @Column({
    type: "boolean",
    name: "verified",
    default: false,
  })
  isVerified!: boolean;

  @Column({
    type: "int",
    name: "reward_points",
    default: 0,
  })
  rewardPoints!: number;

  @Column({
    type: "varchar",
    length: 50,
    name: "referral_code",
    default: "",
    nullable: true,
  })
  referralCode!: string | null;

  @Column({
    type: "varchar",
    length: 500,
    default: "",
    nullable: true,
  })
  photo!: string | null;

  @Column({
    type: "text",
    name: "shop_json",
    nullable: true,
  })
  shopJson!: string | null;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;

  @OneToMany(() => Address, (address) => address.user)
  addresses!: Address[];
}
