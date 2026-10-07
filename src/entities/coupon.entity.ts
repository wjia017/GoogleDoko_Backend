import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("coupons")
export class Coupon {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 50,
    unique: true,
  })
  code!: string;

  @Column({
    name: "discount_type",
    type: "varchar",
    length: 20,
    default: "percentage",
  })
  discountType!: "percentage" | "fixed";

  @Column({
    name: "discount_value",
    type: "double",
  })
  discountValue!: number;

  @Column({
    name: "min_order",
    type: "double",
    default: 0,
  })
  minOrder!: number;

  @Column({
    name: "max_uses",
    type: "int",
    default: 100,
  })
  maxUses!: number;

  @Column({
    name: "times_used",
    type: "int",
    default: 0,
  })
  timesUsed!: number;

  @Column({
    name: "expiry_date",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  expiryDate!: string | null;

  @Column({
    type: "int",
    default: 1,
  })
  active!: number;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt!: Date;
}
