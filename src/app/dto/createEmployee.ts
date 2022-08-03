import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./createAddress";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public joining_date:string;
    
    @IsString()
    public role:string;

    @IsString()
    public status:string;


    @IsString()
    public username: string;

    @IsNumber()
    public experience: number;

    @IsString()
    public departmentId: string;

    @IsString()
    public password:string;

    @ValidateNested({each:true})
    @Type(()=>CreateAddressDto)
    public address:CreateAddressDto


}