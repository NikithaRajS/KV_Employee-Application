import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDepartmentDto {
    @IsString()
    @IsOptional()
    public name: string;
    
}