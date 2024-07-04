import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/modules/user/application/user.service';
import { comparePassword } from 'src/modules/user/domain/utils';
import { LoginUserDto } from './dtos/login-user.dto';
import { TokensDto } from './dtos/tokens.dto';
import { AuthService } from './auth.service';
import { EXTEPTIONS } from 'src/common/constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOkResponse({
    description: 'Login user',
    type: TokensDto,
    isArray: false,
  })
  @ApiBody({
    required: true,
    isArray: false,
    type: LoginUserDto,
  })
  @Post()
  @ApiOperation({ summary: 'Auth user' })
  public async login(@Body() account: LoginUserDto): Promise<TokensDto> {
    try {
      const user = await this.userService.findUserByLogin(account.login);

      if (!user) {
        throw new NotFoundException(EXTEPTIONS.USER_NOT_FOUND);
      }

      if (!(await comparePassword(account.password, user.password))) {
        throw new UnauthorizedException(EXTEPTIONS.WRONG_PASSWORD);
      }

      const accessToken = await this.authService.getAccessToken({
        userId: user.id,
        login: user.login,
        name: user.name,
        surname: user.surname,
        family: user.family,
        role: user.roleId,
      });

      return { accessToken };
    } catch (error) {
      Logger.error(error);
      throw new HttpException(EXTEPTIONS.AUTH_ERROR, HttpStatus.UNAUTHORIZED);
    }
  }
}
