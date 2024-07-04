import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MIN_LENGTH_PASSWORD } from 'src/common/constants';

export class LoginUserDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public login!: string;

  @ApiProperty({
    minLength: MIN_LENGTH_PASSWORD,
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_LENGTH_PASSWORD)
  @IsStrongPassword({ minLength: MIN_LENGTH_PASSWORD })
  public password!: string;
}
