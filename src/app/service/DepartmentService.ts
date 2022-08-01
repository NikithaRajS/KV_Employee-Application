import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRepository } from "../repository/departmentRepository";

export class DepartmentService{
    constructor(private departmentRepo:DepartmentRepository){
    }
    async getAllDepartments(){
        return await this.departmentRepo.getAllDepartments()
    }

    async getDepartmentById(id: string) {
        return await this.departmentRepo.getDepartmentById(id);
      }



    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
                
            });
            const save = await this.departmentRepo.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
           // throw new HttpException(400, "Failed to create employee");
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
          throw new HttpException(400, "Failed to create employee", "code-400");
        }
      }

      async deleteDepartmentById (id: string) {
        return await this.departmentRepo.softDeleteDepartmentById(id);
      }
    
    }