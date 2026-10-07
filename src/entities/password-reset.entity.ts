import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity("password_resets")
export class PasswordReset {
  @PrimaryColumn({
    type: "varchar",
    length: 255,
  })
  token!: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  email!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;
}
