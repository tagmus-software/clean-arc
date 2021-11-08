import { EmployeeTypeEnum } from "../../../common/enums";
import { EmployeeTypeFactory } from "../../../factories/employee_type_factory";

export const employeeTypesSeed = EmployeeTypeFactory.buildList([
  {
    Name: EmployeeTypeEnum.ACCOUNTANT,
    Salary: 1200,
  },
]);
