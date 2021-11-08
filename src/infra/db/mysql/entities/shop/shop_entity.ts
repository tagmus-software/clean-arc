import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Employee } from "../employee/employee_entity";

@Entity({ name: "Shop" })
export class Shop {
  @PrimaryGeneratedColumn()
  readonly ID: number;

  @Column({
    type: "varchar",
  })
  Name: string;

  @Column("varchar")
  Address: string;

  @Column("varchar")
  Telephone: string;

  @OneToMany(() => Employee, (employee) => employee.Shop)
  Employees: Employee[];
}
