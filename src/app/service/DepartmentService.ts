import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { DepartmentRepository } from "../repository/DepartmentRepository";
import { ErrorCodes } from "../util/errorCode";

export class DepartmentService {
  constructor(private departmentRepo: DepartmentRepository) {}
  async getAllDepartments() {
    return await this.departmentRepo.getAllDepartments();
  }

  async getDepartmentById(id: string) {
    const department = await this.departmentRepo.getDepartmentById(id);
    if (!department) {
      throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_NOT_FOUND);
    }
    return department;
  }

  public async createDepartment(departmentDetails: any) {
    try {
      const newDepartment = plainToClass(Department, {
        name: departmentDetails.name,
      });
      const save = await this.departmentRepo.saveDepartmentDetails(
        newDepartment
      );
      return save;
    } catch (err) {
      throw new HttpException(400, "Failed to create department", "Code-400");
    }
  }

  public async updateDepartmentById(id: string, departmentDetails: any) {
    try {
      const updatedDepartment = plainToClass(Department, {
        name: departmentDetails.name,
      });
      const save = await this.departmentRepo.updateDepartmentDetails(
        id,
        updatedDepartment
      );
      return save;
    } catch (err) {
      throw new HttpException(400, "Failed to update department", "code-400");
    }
  }

  async deleteDepartmentById(id: string) {
    const department = await this.departmentRepo.getDepartmentById(id);
    if (!department) {
      throw new EntityNotFoundException(ErrorCodes.DEPARTMENT_NOT_FOUND);
    }
    return await this.departmentRepo.softDeleteDepartmentById(id);
  }
}
