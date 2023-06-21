import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserAuthenticationRepository } from './auth.repository';
import { UserAuthentication } from './user-authentication.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from './service/jwt.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([UserAuthentication]),
  JwtModule.register({
    secret: 'dev',
    signOptions: { expiresIn: '365d', issuer: 'wuz1mu' },
  })],
  providers: [AuthService, UserAuthenticationRepository, JwtService],
  controllers: [AuthController]
})
export class AuthModule {}
