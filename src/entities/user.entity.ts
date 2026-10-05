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
  })
  firstName!: string;

  @Column({
    type: "varchar",
    length: 100,
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
  })
  password!: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: true,
  })
  phone!: string | null;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  location!: string | null;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role!: UserRole;

  @Column({
    type: "boolean",
    default: false,
  })
  isVerified!: boolean;

  @Column({
    type: "int",
    default: 0,
  })
  rewardPoints!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(
    () => Address,
    (address) => address.user
  )
  addresses!: Address[];
}