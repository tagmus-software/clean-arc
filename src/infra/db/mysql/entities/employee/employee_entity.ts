import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { EmployeeType } from "./employee_type_entity";
import { Shop } from "../shop/shop_entity";

@Entity({ name: "Employee" })
export class Employee {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column("varchar")
  Name: string;

  @Column("varchar")
  Telephone: string;

  @Column("varchar")
  Address: string;

  @Column("date", { default: "now()" })
  EmploymentDate: Date;

  @Column("bigint")
  EmployeeTypeId: number;

  @Column("bigint")
  ShopId: number;

  @ManyToOne(() => Shop, (user) => user.Employees)
  Shop: Shop;

  @OneToOne(() => EmployeeType)
  @JoinColumn({ name: "EmployeeTypeId", referencedColumnName: "ID" })
  EmployeeType?: EmployeeType;
}
