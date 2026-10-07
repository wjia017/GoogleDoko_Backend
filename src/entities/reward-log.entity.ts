import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("rewards_log")
export class RewardLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "user_id",
    type: "int",
  })
  userId!: number;

  @Column({
    type: "varchar",
    length: 255,
    default: "",
  })
  label!: string;

  @Column({
    type: "int",
    default: 0,
  })
  points!: number;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;
}
