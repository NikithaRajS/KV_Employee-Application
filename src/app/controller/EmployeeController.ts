import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/createEmployee";
import { IsUUIDDto } from "../dto/idCheckDto";

class EmployeeController extends AbstractController {
  constructor(private employeeService:EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.employeeResponse);
    this.router.get(`${this.path}/:id`, this.getEmployeeById);
    this.router.post(
        `${this.path}`,
        validationMiddleware(CreateEmployeeDto,APP_CONSTANTS.body),
        // this.asyncRouteHandler(this.createEmployee)
        this.createEmployee
      );
      this.router.put(`${this.path}/:id`, 
      validationMiddleware(IsUUIDDto, APP_CONSTANTS.params),
      validationMiddleware(CreateEmployeeDto,APP_CONSTANTS.body),
      this.updateEmployeeById);
      
      this.router.delete(`${this.path}/:id`,this.deleteEmployeeById)
    
  }
  private employeeResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.getAllEmployees()
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private getEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.getEmployeeById(
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

  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      //console.log(request.body)
      const data = await this.employeeService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private updateEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.updateEmployeeById(
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

  private deleteEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.deleteEmployeeById(
        request.params.id
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default EmployeeController;
