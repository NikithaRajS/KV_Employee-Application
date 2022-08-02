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

    async getEmployeeById(id: string) {
        return await this.employeeRepo.getEmployeeById(id);
      }



    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                joining_date: employeeDetails.joining_date,        //Second name should be that of the json key,first name is the column name
                role: employeeDetails.role,
                departmentId: employeeDetails.department_id,
                status:employeeDetails.status,
                experience:employeeDetails.experience,
                address:employeeDetails.address,
                username:employeeDetails.username,
                password:employeeDetails.password
            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
           // throw new HttpException(400, "Failed to create employee");
           throw err;
        }
    }
   
    public async updateEmployeeById(id: string, employeeDetails: any) {
        try {
          const updatedEmployee = plainToClass(Employee, {
            name: employeeDetails.name,
            joining_date: employeeDetails.joining_date,        //Second name should be that of the json key,first name is the column name
            role: employeeDetails.role,
            //departmentId: employeeDetails.department_id,
            status:employeeDetails.status,
            experience:employeeDetails.experience,
            address:employeeDetails.address
            
          });
          const save = await this.employeeRepo.updateEmployeeDetails(
            id,
            updatedEmployee
          );
          return save;
        } catch (err) {
          throw new HttpException(400, "Failed to create employee", "code-400");
        }
      }

      async deleteEmployeeById (id: string) {
        return await this.employeeRepo.softDeleteEmployeeById(id);
      }
    
    }