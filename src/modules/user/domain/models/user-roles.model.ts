import { ApiProperty } from '@nestjs/swagger';

export class UserRolesModel {
  @ApiProperty({
    type: String,
    required: true,
  })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  alias: string;
}
