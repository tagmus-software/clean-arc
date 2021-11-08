import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { EmployeeTypeEnum } from "../../../../common/enums";

@Entity({ name: "EmployeeType" })
export class EmployeeType {
  @PrimaryGeneratedColumn()
  ID?: number;

  @Column({
    type: "enum",
    enum: EmployeeTypeEnum,
  })
  Name?: EmployeeTypeEnum;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  Salary: number;
}
