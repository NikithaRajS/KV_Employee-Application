import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateDepartmentDto } from "../dto/createDepartment";
import { IsUUIDDto } from "../dto/idCheckDto";
import authorize from "../middleware/authorization";
import { UpdateDepartmentDto } from "../dto/updateDepartment";
import { Department } from "../entities/Department";

class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getAlldepartments);
    this.router.get(
      `${this.path}/:id`,
      validationMiddleware(IsUUIDDto, APP_CONSTANTS.params),
      this.getDepartmentById
    );
    this.router.post(
      `${this.path}`,
      authorize(["admin", "superadmin"]),
      validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),
      this.createDepartment
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(IsUUIDDto, APP_CONSTANTS.params),
      validationMiddleware(UpdateDepartmentDto, APP_CONSTANTS.body),
      authorize(["admin", "superadmin"]),
      this.updateDepartmentById
    );
    this.router.delete(
      `${this.path}/:id`,
      validationMiddleware(IsUUIDDto, APP_CONSTANTS.params),
      authorize(["admin", "superadmin"]),
      this.deleteDepartmentById
    );
  }
  private getAlldepartments = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: Department[] = await this.departmentService.getAllDepartments();
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private getDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.getDepartmentById(
        request.params.id
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private createDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.departmentService.createDepartment(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  };

  private updateDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.updateDepartmentById(
        request.params.id,
        request.body
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private deleteDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.deleteDepartmentById(
        request.params.id
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };
}

export default DepartmentController;
