import { Inject, Injectable } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { EXTEPTIONS } from 'src/common/constants';
import { TaskModel } from '../domain/models/task.model';
import {
  ITaskRepository,
  TASK_REPOSITORY_SYMBOL,
} from '../domain/task.repository.interface';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY_SYMBOL)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async createTask(task: CreateTaskDto): Promise<TaskModel> {
    return this.taskRepository.createTask(task);
  }

  async findTasks(usersIds: string[]): Promise<TaskModel[]> {
    return this.taskRepository.findTasks(usersIds);
  }

  async findTaskById(id: string): Promise<TaskModel> {
    return this.taskRepository.findTaskById(id);
  }

  async updateTask(id: string, task: UpdateTaskDto): Promise<void> {
    const existsTask = await this.taskRepository.findTaskById(id);

    if (!isNotEmpty(existsTask)) {
      throw new Error(EXTEPTIONS.TASKS_NOT_FOUND);
    }

    return this.taskRepository.updateTask(id, task);
  }
}
