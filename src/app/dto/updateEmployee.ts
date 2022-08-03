import { IsNumber, IsOptional, IsString } from "class-validator";

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
    public address:string;

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


}