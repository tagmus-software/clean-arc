import { CreateEmployeeDto } from "./dto/create_employee_dto";
import { EmployeeService } from "./employee_service";
import HttpStatus from "../infra/common/http/status";
import { Injectable } from "../infra/core/decorators";
import { RequestData } from "../infra/common/http/request";
import { Status } from "../infra/common/http/decorators";

@Injectable()
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Status(HttpStatus.OK)
  getAllEmployee() {
    return this.employeeService.getAllEmployees();
  }

  @Status(HttpStatus.CREATED)
  createEmployee({ body }: RequestData) {
    const dto = new CreateEmployeeDto(body);
    return this.employeeService.createEmployee(dto);
  }

  updateEmployee() {}

  @Status(HttpStatus.OK)
  findEmployee({ params }) {
    return this.employeeService.getEmployee(params.id);
  }

  @Status(HttpStatus.OK)
  removeEmployee({ params }) {
    return this.employeeService.removeEmployee(params.id);
  }
}
