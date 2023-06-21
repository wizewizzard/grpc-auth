import { Test } from "@nestjs/testing";
import { JwtService } from "./jwt.service";
import { JwtModule } from "@nestjs/jwt";
import assert, { fail } from "assert";

describe('JwtService', () => {
    let jwtService: JwtService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: 'dev',
                    signOptions: { expiresIn: '365d' },
                })
            ],
            providers: [JwtService],
          }).compile();

          jwtService = moduleRef.get<JwtService>(JwtService);
    });

    describe('Encode and decode', () => {
        it('Should encode and decode', async () => {
            const token = jwtService.generateToken({ userId: 99 });
            
            const decoded = await jwtService.decode(token);
            if (typeof decoded === 'string') fail('Wtong return type');
            expect(decoded.userId).toBe(99);
        });
    });
});