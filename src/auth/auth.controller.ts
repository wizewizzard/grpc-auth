import { Controller, HttpStatus } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, LoginResponse, RegisterRequest, RegisterResponse, ValidateResponse } from './auth.pb';
import { LoginRequestDto, RegisterRequestDto, ValidateRequestDto } from './auth.dto';
import { AuthService } from './auth.service';
import { plainToClass } from 'class-transformer';
import { join } from 'path';

import { InvalidTokenException, NotUniqueException, UserNotFoundException, WrongCredentialsException } from './exception/auth.exception';

@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService) {}

    @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
    async validate(validate: ValidateRequestDto): Promise<ValidateResponse> {
        try {
        const validationResult = await this.authService.validate(validate);
        return {
            status: HttpStatus.OK,
            userId: validationResult.userId,
            error: null
        };
        } catch(e) {
            if (e instanceof InvalidTokenException) {
                return {
                    error: ['Invalid token'],
                    status: HttpStatus.UNAUTHORIZED,
                    userId: 0
                };
            } else if (e instanceof UserNotFoundException) {
                const exc = e as UserNotFoundException;
                return {
                    error: [`User with id ${exc.field} was not found`],
                    status: HttpStatus.NOT_FOUND,
                    userId: 0
                };
            } else {
                throw e;
            }
        }        
    }

    @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
    async register(register: RegisterRequest): Promise<RegisterResponse> {
        try {
            const userAuthentication = await this.authService.create(plainToClass(RegisterRequestDto, register));
            return {
                status: HttpStatus.CREATED,
                error: null
            }
        } catch(e) {
            if (e instanceof NotUniqueException) {
                const notUnique = e as NotUniqueException;
                return {
                    status: HttpStatus.CREATED,
                    error: [`User ${notUnique.fields.map(f => `Not unique value for ${f}`,join(', '))}`]
                }
            } else {
                throw e;
            }
        }
    }

    @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
    async login(login: LoginRequestDto): Promise<LoginResponse> {
        try {
            const loginResult = await this.authService.login(login);
            return {
                status: HttpStatus.OK,
                token: loginResult.token,
                error: null
            }
        } catch(e) {
            if (e instanceof WrongCredentialsException) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    error: ['Wrong credentials provided'],
                    token: null
                }
            } else if( e instanceof UserNotFoundException) {
                const notFound = e as UserNotFoundException;
                return {
                    status: HttpStatus.NOT_FOUND,
                    error: [`User was not found ${notFound.field}`],
                    token: null
                }
            } else throw e;
        }
    }
}
