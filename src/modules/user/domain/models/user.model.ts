import { ApiProperty } from '@nestjs/swagger';
import { UserRolesModel } from './user-roles.model';

export class UserModel {
  @ApiProperty({
    type: String,
    required: true,
  })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  surname: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  family: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  login: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  password: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  roleId: string;

  @ApiProperty({
    type: UserRolesModel,
    required: true,
  })
  role: UserRolesModel;
}
