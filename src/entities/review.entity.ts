import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "product_id",
    type: "varchar",
    length: 100,
  })
  productId!: string;

  @Column({
    name: "user_id",
    type: "int",
  })
  userId!: number;

  @Column({
    type: "int",
  })
  rating!: number;

  @Column({
    type: "varchar",
    length: 255,
    default: "",
  })
  title!: string;

  @Column({
    type: "text",
  })
  body!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;
}
