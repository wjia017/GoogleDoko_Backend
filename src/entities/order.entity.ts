import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./user.entity";

@Entity("orders")
export class Order {
  @PrimaryColumn({
    type: "varchar",
    length: 100,
  })
  id!: string;

  @Column({
    name: "user_id",
    type: "int",
  })
  userId!: number;

  @ManyToOne(() => User, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "user_id",
  })
  user!: User;

  @Column({
    type: "varchar",
    length: 100,
  })
  date!: string;

  @Column({
    type: "varchar",
    length: 50,
    default: "Pending",
  })
  status!: string;

  @Column({
    type: "double",
  })
  subtotal!: number;

  @Column({
    name: "delivery_fee",
    type: "double",
    default: 0,
  })
  deliveryFee!: number;

  @Column({
    type: "double",
    default: 0,
  })
  discount!: number;

  @Column({
    type: "double",
  })
  total!: number;

  @Column({
    name: "payment_method",
    type: "varchar",
    length: 50,
    default: "Cash on Delivery",
  })
  paymentMethod!: string;

  @Column({
    name: "payment_status",
    type: "varchar",
    length: 50,
    default: "Pending",
  })
  paymentStatus!: string;

  @Column({
    name: "delivery_address",
    type: "text",
  })
  deliveryAddress!: string;

  @Column({
    name: "recipient_name",
    type: "varchar",
    length: 100,
  })
  recipientName!: string;

  @Column({
    name: "recipient_phone",
    type: "varchar",
    length: 50,
  })
  recipientPhone!: string;

  @Column({
    name: "items_json",
    type: "text",
  })
  itemsJson!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;
}
