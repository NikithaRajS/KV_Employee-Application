import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request } from "express";
import * as express from "express";
import HttpException from "../exception/HttpException";
import APP_CONSTANTS from "../constants";
import { ErrorCodes } from "../util/errorCode";
import { request } from "http";


/**
 * Middleware to validate the request.
 * Validations are performed using class validator
 */
function validationMiddleware<T>(type: any, parameter: string, skipMissingProperties = false): express.RequestHandler {
  return (req, res, next) => {
    let validatedData:any;
    if(parameter === 'body'){
      validatedData=plainToClass(type,req.body)
    }
    else if(parameter === 'params'){
      validatedData=plainToClass(type,req.params)
    }
    // const requestBody = plainToClass(type, req.body);
    validate(
      validatedData, { skipMissingProperties, forbidUnknownValues: true, whitelist: true })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const errorDetail = ErrorCodes.VALIDATION_ERROR;
          next(new HttpException(400,errorDetail.MESSAGE,errorDetail.CODE,errors));
          //next(errors)- // Will call error middleware
        } else {
            if (parameter === 'body')
              req.body=validatedData
          next();
        }
      });
  };
}
export default validationMiddleware;