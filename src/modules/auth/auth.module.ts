import { Module } from '@nestjs/common';
import { AuthController } from './application/auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './application/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './application/token/jwt-access.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    UserModule,
  ],
  providers: [AuthService, JwtAccessStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
