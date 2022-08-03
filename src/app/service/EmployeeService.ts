import { plainToClass } from "class-transformer";
import { EntityNotFoundError } from "typeorm";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRepository } from "../repository/employeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import jsonwebtoken from "jsonwebtoken"

export class EmployeeService{
    constructor(private employeeRepo:EmployeeRepository){
    }
    async getAllEmployees(){
        return await this.employeeRepo.getAllEmployees()
    }

    async getEmployeeById(id: string) {
        const employee= await this.employeeRepo.getEmployeeById(id);

        if(!employee){
          throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_NOT_FOUND)
        }

        return employee
      }

    public employeeLogin = async (
        name: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepo.getEmployeeByName(
          name
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "role":employeeDetails.role
          };
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException(ErrorCodes.INCORRECT_PASSWORD);
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        })}

    public async createEmployee(employeeDetails: any) {
        try {
          
          const newAddress = plainToClass(Employee, {
            line1:employeeDetails.address.line1,
            line2:employeeDetails.address.line2,
            city:employeeDetails.address.city,
            state:employeeDetails.address.state,
            zipcode:employeeDetails.address.zipcode

        });
          const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                joining_date: employeeDetails.joining_date,                                                                       //Second name should be that of the json key,first name is the column name
                role: employeeDetails.role,
                departmentId: employeeDetails.departmentId,
                status:employeeDetails.status,
                experience:employeeDetails.experience,
                address:newAddress,
                username:employeeDetails.username,
                password:employeeDetails.password ? await bcrypt.hash(employeeDetails.password,10):''
          });
          const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
          return save;
        } 
        catch (err) {
           // throw new HttpException(400, "Failed to create employee");
           throw err;
        }
    }
   
    public async updateEmployeeById(id: string, employeeDetails: any) {
        const employee= await this.employeeRepo.getEmployeeById(id);
        if(!employee){
          throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_NOT_FOUND)
        }
        try {
          const updatedEmployee = plainToClass(Employee, {
            name: employeeDetails.name ? employeeDetails.name:employee.name,
            joining_date: employeeDetails.joining_date? employeeDetails.joining_date:employee.joining_date,       //Second name should be that of the json key,first name is the column name
            role: employeeDetails.role?employeeDetails.role:employee.role,
            departmentId: employeeDetails.department_id?employeeDetails.department_id:employee.departmentId,
            status:employeeDetails.status ? employeeDetails.status:employee.status,
            experience:employeeDetails.experience?employeeDetails.experience:employee.experience,
            address:employeeDetails.address?employeeDetails.address:employee.address,
            username:employeeDetails.username?employeeDetails.username:employee.username,
            password:employeeDetails.password?employeeDetails.password:employee.password
            
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
        const employee = await this.employeeRepo.getEmployeeById(id);
        if(!employee){
          throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_NOT_FOUND)
        }
        return await this.employeeRepo.softDeleteEmployeeById(employee);
      }
    
    }