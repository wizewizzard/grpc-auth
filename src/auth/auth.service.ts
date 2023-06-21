import { ConflictException, ForbiddenException, HttpStatus, Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto, RegisterRequestDto, ValidateRequestDto } from './auth.dto';
import { UserAuthenticationRepository } from './auth.repository';
import { UserAuthentication } from './user-authentication.entity';
import { JwtService } from './service/jwt.service';
import { AuthValidationResult, LoginResult } from './auth.interface';
import { InvalidTokenException, NotUniqueException, UserNotFoundException, WrongCredentialsException } from './exception/auth.exception';

@Injectable()
export class AuthService {
    constructor(private readonly userAuthenticationRepository: UserAuthenticationRepository,
        private readonly jwtService: JwtService) { }

    public async create({ email, password }: RegisterRequestDto): Promise<UserAuthentication> {
        const auth = new UserAuthentication();
        auth.password = password;
        auth.email = email;
        auth.id = 20;
        const alreadyExists = await this.userAuthenticationRepository.exist({ where: { email: auth.email }});
        if (alreadyExists) {
            throw new NotUniqueException(['email']);
        }
        await this.userAuthenticationRepository.save(auth);
        return auth;
    }

    public async validate({ token }: ValidateRequestDto): Promise<AuthValidationResult> {
        const decoded = await this.jwtService.decode(token);
        if (!decoded) {
            throw new InvalidTokenException();
        }
        if (typeof decoded === 'string') {
            throw new InvalidTokenException();
        }

        const auth = await this.userAuthenticationRepository.findOneBy({ id: decoded.userId });
        if (auth) {
            return {
                userId: auth.id,
                email: auth.email
            };
        } else {
            throw new UserNotFoundException(decoded.userId);
        }
    }

    public async login(login: LoginRequestDto): Promise<LoginResult> | never {
        const auth = await this.userAuthenticationRepository.findOneBy({
            email: login.email
        });
        if (!auth) throw new UserNotFoundException(login.email);
        if (auth.password !== login.password) {
            throw new WrongCredentialsException();
        }
        return {
            token: this.jwtService.generateToken({ userId: auth.id, email: auth.email })
        };
    }
}
