import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EXTEPTIONS } from 'src/common/constants';
import { CurrentUserFromToken } from 'src/common/current-user.decorator';
import { JwtAuthGuard } from 'src/modules/auth/application/token/jwt-auth.guard';
import { Payload } from 'src/modules/auth/application/token/payload.interfaces';
import { UserModel } from '../domain/models/user.model';
import { ROLE_ALIAS } from '../infrastructure/constants';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get users by current user permission' })
  @ApiOkResponse({
    type: UserModel,
    isArray: true,
  })
  async getUsers(@CurrentUserFromToken() user: Payload): Promise<UserModel[]> {
    try {
      if (user.role === ROLE_ALIAS.USER) {
        const model = new UserModel();
        model.id = user.userId;
        model.name = user.name;
        model.login = user.login;
        model.surname = user.surname;
        model.family = user.family;
        model.roleId = user.role;

        return [model];
      } else {
        const slaves = await this.userService.findUsersByAdminId(user.userId);
        return await this.userService.findUsers([
          user.userId,
          ...slaves.map((slave) => slave.userId),
        ]);
      }
    } catch (error) {
      throw new Error('users not found');
    }
  }

  // для создания тестовых пользователей c роью юзер, админ создается в миграции
  @Post()
  @ApiBody({
    type: CreateUserDto,
    isArray: false,
  })
  @ApiOperation({
    summary:
      'создания тестовых пользователей c роью юзер, админ создается в миграции',
  })
  @ApiOkResponse({
    type: UserModel,
    isArray: false,
  })
  async createUser(@Body() user: CreateUserDto): Promise<UserModel> {
    try {
      return await this.userService.createUser(user);
    } catch (error) {
      throw new HttpException(
        EXTEPTIONS.CREATE_USER_ERROR,
        HttpStatus.CONFLICT,
      );
    }
  }
}
