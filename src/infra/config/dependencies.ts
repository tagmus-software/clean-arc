import { EmployeeController } from "../../employee/employee_controller";
import { EmployeeRepository } from "../../employee/repositories/employee_repository";
import { EmployeeService } from "../../employee/employee_service";
import { EmployeeTypeRepository } from "../../employee/repositories/employee_type_repository";

export default [
  EmployeeController,
  EmployeeService,
  EmployeeRepository,
  EmployeeTypeRepository,
];
