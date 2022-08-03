import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { AbstractEntity } from "./Abstract";
import { Department } from "./Department";

@Entity("address")
export class Address extends AbstractEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
  @Column({ nullable: false })
  public line1: string;
  @Column({ nullable: false })
  public line2: string;
  @Column({ nullable: false })
  public city: string;
  @Column({ nullable: false })
  public state: string;
  @Column({ nullable: false })
  public zipcode: number;
}
