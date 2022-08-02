import { IsUUID } from "class-validator";

export class IsUUIDDto {
    @IsUUID()
    public id: string;
}