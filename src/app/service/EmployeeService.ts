import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import { EmployeeRepository } from "../repository/employeeRepository";

export class EmployeeService{
    constructor(private employeeRepo:EmployeeRepository){
    }
    async getAllEmployees(){
        return await this.employeeRepo.getAllEmployees()
    }

    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                //username: employeeDetails.username,
                //age: employeeDetails.age,
                departmentId: employeeDetails.departmentId,
                //isActive: true,
            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
           // throw new HttpException(400, "Failed to create employee");
        }
    }
   

    
    }