import { BadRequestException } from "../../infra/common/http";
import { EmployeeTypeEnum } from "../../infra/common/enums";

export class CreateEmployeeDto {
  Name: string;
  Address: string;
  EmploymentDate: Date;
  ShopId: number;
  Type: {
    Name: EmployeeTypeEnum;
    Salary: number;
  };

  constructor(data: any) {
    Object.assign(this, data);

    if (!this.Type) {
      throw new BadRequestException("EmployeeType cannot be empty");
    }

    try {
      this.parseFields();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private parseFields() {
    if (this.EmploymentDate) {
      this.EmploymentDate = new Date(this.EmploymentDate);
    }
  }
}
