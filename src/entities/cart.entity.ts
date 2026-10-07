import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity("carts")
export class Cart {
  @PrimaryColumn({
    name: "user_id",
    type: "int",
  })
  userId!: number;

  @PrimaryColumn({
    name: "product_id",
    type: "varchar",
    length: 100,
  })
  productId!: string;

  @Column({
    type: "int",
    default: 1,
  })
  quantity!: number;

  @CreateDateColumn({
    name: "added_at",
  })
  addedAt!: Date;
}
