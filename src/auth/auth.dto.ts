import { IsEmail, IsString, MinLength } from "class-validator";
import { LoginRequest, LoginResponse, RegisterRequest, ValidateRequest } from "./auth.pb";

export class ValidateRequestDto implements ValidateRequest {
    @IsString()
    public readonly token: string;
}

export class RegisterRequestDto implements RegisterRequest {
    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(8)
    password: string;
}

export class LoginRequestDto implements LoginRequest {
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(8)
    password: string;
}
