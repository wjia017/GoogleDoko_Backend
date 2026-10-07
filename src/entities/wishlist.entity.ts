import {
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity("wishlists")
export class Wishlist {
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

  @CreateDateColumn({
    name: "added_at",
  })
  addedAt!: Date;
}
