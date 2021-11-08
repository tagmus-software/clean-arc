import { EmployeeFactory } from "../../../factories/employee_factory";

export const employeeSeed = EmployeeFactory.build({
  Name: "João",
  Address: "1571 Sussex Court, COALMONT - Indiana, 47845",
  Telephone: "254-562-5713",
  EmploymentDate: new Date(),
});
