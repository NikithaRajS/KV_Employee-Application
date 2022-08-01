import { EmployeeRespository } from "../repository/employeeRepository";

export class EmployeeService{
    constructor(private employeeRepo:EmployeeRespository){
    }
    async getAllEmployees(){
        return await this.employeeRepo.getAllEmployees()
    }
    }