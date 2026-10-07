import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./user.entity";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 100,
    name: "full_name",
    default: "",
  })
  fullName!: string;

  @Column({
    type: "varchar",
    length: 50,
    default: "",
  })
  phone!: string;

  @Column({
    type: "varchar",
    length: 100,
    default: "Home",
  })
  label!: string;

  @Column({
    type: "varchar",
    length: 255,
    name: "street",
    default: "",
  })
  addressLine!: string;

  @Column({
    type: "varchar",
    length: 100,
    default: "",
  })
  city!: string;

  @Column({
    type: "varchar",
    length: 100,
    name: "area",
    nullable: true,
    default: "",
  })
  district?: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: true,
    default: "",
  })
  province?: string;

  @Column({
    type: "varchar",
    length: 50,
    name: "postal_code",
    nullable: true,
    default: "",
  })
  postalCode?: string;

  @Column({
    type: "boolean",
    name: "is_default",
    default: false,
  })
  isDefault!: boolean;

  @ManyToOne(() => User, (user) => user.addresses, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "user_id",
  })
  user!: User;

  @Column({
    name: "user_id",
  })
  userId!: number;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt!: Date;
}
