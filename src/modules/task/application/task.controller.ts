import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { EXTEPTIONS } from 'src/common/constants';
import { CurrentUserFromToken } from 'src/common/current-user.decorator';
import { JwtAuthGuard } from 'src/modules/auth/application/token/jwt-auth.guard';
import { Payload } from 'src/modules/auth/application/token/payload.interfaces';
import { UserService } from 'src/modules/user/application/user.service';
import { ROLE_ALIAS } from 'src/modules/user/infrastructure/constants';
import { TaskModel } from '../domain/models/task.model';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskService } from './task.service';

@ApiTags('task')
@Controller('task')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @ApiOkResponse({
    type: TaskModel,
    isArray: true,
  })
  @ApiOperation({ summary: 'Get tasks for current user' })
  async getTasks(@CurrentUserFromToken() user: Payload): Promise<TaskModel[]> {
    try {
      // если не админ, то только свои задачи
      if (user.role === ROLE_ALIAS.USER) {
        return await this.taskService.findTasks([user.userId]);
      } else {
        // если админ, то свои задачи и задачи подчиненных
        const slaves = await this.userService.findUsersByAdminId(user.userId);
        return await this.taskService.findTasks([
          user.userId,
          ...slaves.map((slave) => slave.userId),
        ]);
      }
    } catch (error) {
      throw new HttpException(EXTEPTIONS.TASKS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  @ApiParam({
    required: true,
    type: String,
    name: 'id',
  })
  @ApiOkResponse({
    type: TaskModel,
    isArray: false,
  })
  @ApiOperation({ summary: 'Get task by id' })
  async getTaskById(@Param('id') id: string): Promise<TaskModel> {
    try {
      return await this.taskService.findTaskById(id);
    } catch (error) {
      throw new Error('Could not find tasks');
    }
  }

  @Patch(':id')
  @ApiBody({
    required: true,
    isArray: false,
    type: UpdateTaskDto,
  })
  @ApiOperation({ summary: 'Update exists task' })
  @ApiParam({
    required: true,
    type: String,
    name: 'id',
  })
  @ApiOkResponse({
    description: 'Task updated',
  })
  async updateTask(
    @Param('id') id: string,
    @Body() task: UpdateTaskDto,
    @CurrentUserFromToken() user: Payload,
  ): Promise<void> {
    try {
      await this.userService.checkRights(
        user.userId,
        user.role,
        task.assignedToId,
      );

      await this.taskService.updateTask(id, task);
    } catch (error) {
      throw new HttpException(EXTEPTIONS.TASKS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new task' })
  @ApiBody({
    required: true,
    isArray: false,
    type: CreateTaskDto,
  })
  @ApiOkResponse({
    description: 'Task created',
    type: TaskModel,
    isArray: false,
  })
  async createTask(
    @Body() task: CreateTaskDto,
    @CurrentUserFromToken() user: Payload,
  ): Promise<TaskModel> {
    try {
      await this.userService.checkRights(
        user.userId,
        user.role,
        task.assignedToId,
      );

      return await this.taskService.createTask({
        ...task,
        authorId: user.userId,
      });
    } catch (error) {
      throw new HttpException(
        EXTEPTIONS.CREATE_TASK_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
