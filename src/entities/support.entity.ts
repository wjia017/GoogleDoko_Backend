import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("support_messages")
export class SupportMessage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 100,
    name: "name",
    default: "",
  })
  fullName!: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  email!: string;

  @Column({
    type: "varchar",
    length: 255,
    default: "Customer Inquiry",
    nullable: true,
  })
  subject!: string;

  @Column({
    type: "text",
    name: "message",
  })
  inquiry!: string;

  @Column({
    type: "varchar",
    length: 50,
    default: "Open",
  })
  status!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;
}

@Entity("subscribers")
export class Subscriber {
  @PrimaryColumn({
    type: "varchar",
    length: 255,
  })
  email!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;
}
