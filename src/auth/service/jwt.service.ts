import { Injectable } from "@nestjs/common";
import { JwtService as Jwt } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class JwtService {

    constructor(private readonly jwt: Jwt) {
    }

    public async decode(token: string) {
        return this.jwt.decode(token, {});
    }

    public async verify(token: string): Promise<any> {
        try {
          return this.jwt.verify(token);
        } catch (err) {}
    }

    public generateToken(obj: Object): string {
        return this.jwt.sign(obj);
    }
}
