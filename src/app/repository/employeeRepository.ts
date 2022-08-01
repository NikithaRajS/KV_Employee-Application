import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRepository{
    async getAllEmployees(){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }
    
    async getEmployeeById(id: string): Promise<Employee> {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne(id);
      }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    }
