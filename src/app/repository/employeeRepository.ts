import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRepository{
    async getAllEmployees(){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({ relations: ['department']});
    }

    async getEmployeeById(id: string): Promise<Employee> {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne(id);
      }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.update(
          { id: employeeId, deletedAt: null },
          {
            name: employeeDetails.name ? employeeDetails.name : undefined,
            joining_date:employeeDetails.joining_date?employeeDetails.joining_date:undefined,
            role: employeeDetails.role ? employeeDetails.role:undefined,
            //departmentId: employeeDetails.department_id? employeeDetails.department_id:undefined,
            status:employeeDetails.status?employeeDetails.status:undefined,
            experience:employeeDetails.experience?employeeDetails.experience:undefined,
            address:employeeDetails.address?employeeDetails.address:undefined
          }
        );
        return updateEmployeeDetails;
      }
      public async softDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softDelete({
            id
        });
    } 

    public async hardDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.delete({
            id
        });
    }

    }
