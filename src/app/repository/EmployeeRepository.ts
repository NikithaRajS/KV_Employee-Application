import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRepository {
  async getAllEmployees() {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.find({ relations: ["department"] });
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.findOne({ where: { id }, relations: ["address"] });
  }

  public async getEmployeeByName(userName: string) {
    const employeeRepo = getConnection().getRepository(Employee);
    const employeeDetail = await employeeRepo.findOne({
      where: { username: userName },
    });
    return employeeDetail;
  }

  public async saveEmployeeDetails(employeeDetails: Employee) {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.save(employeeDetails);
  }

  public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
    const employeeRepo = getConnection().getRepository(Employee);
    employeeDetails.id = employeeId;
    console.log(employeeDetails);
    const updateEmployeeDetails = await employeeRepo.save(employeeDetails);
    return updateEmployeeDetails;
  }
  public async softDeleteEmployeeById(employee: Employee) {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.softRemove(employee);
  }

  public async hardDeleteEmployeeById(id: string) {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.delete({
      id,
    });
  }
}
