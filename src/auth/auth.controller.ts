import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, ValidateResponse } from './auth.pb';
import { ValidateRequestDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService) {}

    @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
    validate(validate: ValidateRequestDto): Promise<ValidateResponse> {
        return this.authService.validate(validate);
    }
}
