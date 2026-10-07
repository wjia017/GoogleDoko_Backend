import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./user.entity";

export enum VendorStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  SUSPENDED = "suspended",
}

@Entity("vendor_profiles")
export class VendorProfile {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "userId",
  })
  user!: User;

  @Column()
  userId!: number;

  @Column({
    type: "varchar",
    length: 150,
  })
  businessName!: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  businessEmail!: string;

  @Column({
    type: "varchar",
    length: 20,
  })
  businessPhone!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description?: string;

  @Column({
    type: "enum",
    enum: VendorStatus,
    default: VendorStatus.PENDING,
  })
  status!: VendorStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
