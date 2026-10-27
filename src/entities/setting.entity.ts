import {
  Column,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("platform_settings")
export class PlatformSetting {
  @PrimaryColumn({
    type: "varchar",
    length: 100,
  })
  key!: string;

  @Column({
    type: "text",
  })
  value!: string;
}
