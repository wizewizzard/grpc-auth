import { Injectable } from '@nestjs/common';
import { ValidateRequestDto } from './auth.dto';
import { ValidateResponse } from './auth.pb';

@Injectable()
export class AuthService {
    public async validate({ token }: ValidateRequestDto): Promise<ValidateResponse> {
        return {
            status: 200,
            error: null,
            userId: 90
        };
    }
}
