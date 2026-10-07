import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./user.entity";

@Entity("vendors")
export class Vendor {
  @PrimaryColumn({
    name: "user_id",
    type: "int",
  })
  userId!: number;

  @OneToOne(() => User, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "user_id",
  })
  user!: User;

  @Column({
    name: "business_name",
    type: "varchar",
    length: 255,
  })
  businessName!: string;

  @Column({
    name: "vendor_type",
    type: "varchar",
    length: 100,
    default: "Local Farm",
  })
  vendorType!: string;

  @Column({
    type: "varchar",
    length: 255,
    default: "",
  })
  location!: string;

  @Column({
    type: "varchar",
    length: 100,
    default: "",
  })
  district!: string;

  @Column({
    type: "text",
  })
  address!: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  category!: string;

  @Column({
    name: "main_products",
    type: "text",
    nullable: true,
  })
  mainProducts?: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description?: string;

  @Column({
    type: "varchar",
    length: 500,
    nullable: true,
  })
  photo?: string;

  @Column({
    name: "document_name",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  documentName?: string;

  @Column({
    type: "varchar",
    length: 50,
    default: "under_review",
  })
  status!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  settings?: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt!: Date;
}
