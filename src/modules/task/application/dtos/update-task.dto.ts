import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { PriorityType, StatusType } from '../../infrastructure/types';
import { PRIORITY_NAMES, STATUS_NAMES } from '../../infrastructure/constants';

export class UpdateTaskDto {
  @ApiProperty({
    type: Date,
    required: false,
  })
  @IsDateString()
  @IsOptional()
  expiredAt?: Date;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: String,
    required: false,
    enum: PRIORITY_NAMES,
  })
  @IsOptional()
  @IsString()
  priority?: PriorityType;

  @ApiProperty({
    type: String,
    required: false,
    enum: STATUS_NAMES,
  })
  @IsOptional()
  @IsString()
  status?: StatusType;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  assignedToId?: string;
}
