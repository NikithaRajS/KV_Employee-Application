import { DeepPartial, getConnection } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRepository{
    async getAllDepartments(){
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find();
    }

    async getDepartmentById(id: string): Promise<Department> {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.findOne(id);
      }

    public async saveDepartmentDetails(departmentDetails: Department): Promise<Department> {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }

    public async updateDepartmentDetails(departmentId: string, departmentDetails: DeepPartial<Department>) {
        const departmentRepo = getConnection().getRepository(Department);
        const updateEmployeeDetails = await departmentRepo.update(
          { id: departmentId, deletedAt: null },
          {
            name: departmentDetails.name ? departmentDetails.name : undefined,
            
          }
        );
        return updateEmployeeDetails;
      }
      public async softDeleteDepartmentById(id: string) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.softDelete({
            id
        });
    } 

    public async hardDeleteDepartmentById(id: string) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.delete({
            id
        });
    }

    }
