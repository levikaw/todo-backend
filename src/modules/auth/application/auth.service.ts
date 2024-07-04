import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Payload } from './token/payload.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async getAccessToken(payload: Payload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(`JWT_ACCESS_SECRET`),
      expiresIn: this.configService.get<string>(`EXPIRES_ACCESS_TOKEN_IN`),
    });
  }
}
