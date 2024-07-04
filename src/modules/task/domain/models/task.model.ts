import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from 'src/modules/user/domain/models/user.model';
import { PriorityType, StatusType } from '../../infrastructure/types';
import { PRIORITY_NAMES, STATUS_NAMES } from '../../infrastructure/constants';

export class TaskModel {
  @ApiProperty({
    type: String,
    required: true,
  })
  id: string;

  @ApiProperty({
    type: Date,
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    required: true,
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    required: true,
  })
  deletedAt: Date;

  @ApiProperty({
    type: Date,
    required: true,
  })
  expiredAt: Date;

  @ApiProperty({
    type: String,
    required: true,
  })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  description: string;

  @ApiProperty({
    type: String,
    required: false,
    enum: PRIORITY_NAMES,
  })
  priority: PriorityType;

  @ApiProperty({
    type: String,
    required: false,
    enum: STATUS_NAMES,
  })
  status: StatusType;

  @ApiProperty({
    type: String,
    required: true,
  })
  authorId: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  assignedToId: string;

  @ApiProperty({
    type: UserModel,
    required: true,
  })
  author: UserModel;

  @ApiProperty({
    type: UserModel,
    required: true,
  })
  assignedTo: UserModel;
}
