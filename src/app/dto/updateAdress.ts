import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
    @IsString()
    @IsOptional()
    public line1: string;

    @IsString()
    @IsOptional()
    public line2:string;
    
    @IsString()
    @IsOptional()
    public city:string;

    @IsString()
    @IsOptional()
    public state:string;

    @IsNumber()
    @IsOptional()
    public zipcode:string;

}