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
  })
  fullName!: string;

  @Column({
    type: "varchar",
    length: 20,
  })
  phone!: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  addressLine!: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  city!: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: true,
  })
  district?: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: true,
  })
  province?: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: true,
  })
  postalCode?: string;

  @Column({
    type: "boolean",
    default: false,
  })
  isDefault!: boolean;

  @ManyToOne(
    () => User,
    (user) => user.addresses,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({
    name: "userId",
  })
  user!: User;

  @Column()
  userId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

