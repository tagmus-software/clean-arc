import { Employee } from "../db/mysql/entities/employee/employee_entity";

export class EmployeeFactory {
  static build(data: Partial<Employee>) {
    const employee = new Employee();
    return Object.assign(employee, data);
  }
}
