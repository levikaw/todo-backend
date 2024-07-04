import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PRIORITY_NAMES, STATUS_NAMES } from '../../infrastructure/constants';
import { PriorityType, StatusType } from '../../infrastructure/types';

export class CreateTaskDto {
  @ApiProperty({
    type: Date,
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  expiredAt!: Date;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty({
    type: String,
    required: true,
    enum: PRIORITY_NAMES,
  })
  @IsNotEmpty()
  @IsString()
  priority!: PriorityType;

  @ApiProperty({
    type: String,
    required: true,
    enum: STATUS_NAMES,
  })
  @IsNotEmpty()
  @IsString()
  status!: StatusType;

  @ApiProperty({
    type: String,
    required: false,
  })
  @ApiHideProperty()
  @IsOptional()
  authorId?: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  assignedToId!: string;
}
