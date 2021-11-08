import { CreateEmployeeDto } from "./dto/create_employee_dto";
import { EmployeeFactory } from "../infra/factories/employee_factory";
import { EmployeeRepository } from "./employee_repository";
import { EmployeeTypeRepository } from "./repositories/employee_type_repository";
import { Injectable } from "../infra/core/decorators";

@Injectable()
export class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private employeeTypeRepository: EmployeeTypeRepository
  ) {}
  async getAllEmployees() {
    return this.employeeRepository.getAllEmployees();
  }

  async createEmployee(dto: CreateEmployeeDto) {
    const type = await this.employeeTypeRepository.create(dto.Type);

    const employee = EmployeeFactory.build({
      ...dto,
      EmployeeTypeId: type.ID,
    });

    return this.employeeRepository.createEmployee(employee);
  }

  async getEmployee(id: number) {
    const employee = await this.employeeRepository.findEmployeeWithRelations(
      id
    );

    return employee;
  }

  async removeEmployee(id: number) {
    return;
  }
}
