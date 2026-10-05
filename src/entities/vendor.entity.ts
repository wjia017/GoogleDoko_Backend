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

@Entity("vendors")
export class Vendor {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(
    () => User,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({
    name: "userId",
  })
  user!: User;

  @Column({
    unique: true,
  })
  userId!: number;

  @Column({
    type: "varchar",
    length: 150,
  })
  businessName!: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  businessDescription?: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  businessAddress!: string;

  @Column({
    type: "varchar",
    length: 20,
  })
  businessPhone!: string;

  @Column({
    type: "boolean",
    default: false,
  })
  isApproved!: boolean;

  @Column({
    type: "boolean",
    default: true,
  })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

