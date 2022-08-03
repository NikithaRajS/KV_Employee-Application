import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./createAddress";
import { UpdateAddressDto } from "./updateAdress";

export class UpdateEmployeeDto {
    @IsOptional()
    @IsString()
    public name: string;

    @IsString()
    @IsOptional()
    public joining_date:string;
    
    @IsString()
    @IsOptional()
    public role:string;

    @IsString()
    @IsOptional()
    public status:string;

   
    @IsString()
    @IsOptional()
    public username: string;

    @IsNumber()
    @IsOptional()
    public experience: number;

    @IsString()
    @IsOptional()
    public departmentId: string;

    @IsString()
    @IsOptional()
    public password:string;


    @IsOptional()
    @ValidateNested({each:true})
    @Type(()=>UpdateAddressDto)
    public address:UpdateAddressDto


}