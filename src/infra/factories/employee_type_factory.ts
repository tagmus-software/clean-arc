import { EmployeeType } from "../db/mysql/entities/employee/employee_type_entity";

export class EmployeeTypeFactory {
  static build(data: Partial<EmployeeType>) {
    const employeeType = new EmployeeType();
    return Object.assign(employeeType, data);
  }

  static buildList(dataList: Partial<EmployeeType>[]) {
    return [...dataList].map((data) => this.build(data));
  }
}
