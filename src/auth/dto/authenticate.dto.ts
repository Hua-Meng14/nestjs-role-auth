import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class AuthenticationDto {
    @IsNotEmpty()
    @IsString()
    readonly userName: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}