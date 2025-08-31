import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5, { message: 'Password must be of minimum length 5' })
    @MaxLength(20, { message: 'Password must be of maximum length 20' })
    password: string;
}